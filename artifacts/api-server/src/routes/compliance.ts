import { Router, Request, Response } from "express";
import {
  GetComplianceCalendarQueryParams,
  CreateComplianceOverrideBody,
  DeleteComplianceOverrideParams,
} from "@workspace/api-zod";
import { isDbAvailable, db, complianceOverrides } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { getDeadlinesForMonth, STATUTORY_RULES, ComplianceCategory } from "../compliance/rules";
import { logger } from "../lib/logger";

const router = Router();

// In-memory fallback for zero-config mode / when Postgres is unavailable
interface InMemOverride {
  id: number;
  title: string;
  category: string;
  originalDate: string | null;
  newDate: string;
  note: string | null;
  sourceUrl: string | null;
  createdAt: Date;
}

let inMemoryOverrides: InMemOverride[] = [];
let nextInMemId = 1;

async function getAllOverrides(): Promise<InMemOverride[]> {
  if (isDbAvailable && db) {
    try {
      const records = await db
        .select()
        .from(complianceOverrides)
        .orderBy(desc(complianceOverrides.createdAt));
      return records.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        originalDate: r.originalDate,
        newDate: r.newDate,
        note: r.note,
        sourceUrl: r.sourceUrl,
        createdAt: r.createdAt,
      }));
    } catch (err) {
      logger.warn({ err }, "Failed to fetch overrides from DB, using in-memory store");
    }
  }
  return inMemoryOverrides;
}

/**
 * GET /compliance/calendar
 * Returns merged list of statutory deadlines and active manual overrides for the specified month
 */
router.get("/compliance/calendar", async (req: Request, res: Response) => {
  try {
    const query = GetComplianceCalendarQueryParams.safeParse(req.query);
    const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const year = query.success && query.data.year ? query.data.year : nowIST.getFullYear();
    const month = query.success && query.data.month ? query.data.month : nowIST.getMonth() + 1;

    const monthStr = month.toString().padStart(2, "0");
    const monthPrefix = `${year}-${monthStr}`;

    // 1. Get statutory recurring rules for this month
    const statutoryDeadlines = getDeadlinesForMonth(year, month);

    // 2. Fetch overrides
    const overrides = await getAllOverrides();

    // Map statutory deadlines to compliance items
    const items = statutoryDeadlines.map((dl) => ({
      id: dl.id,
      title: dl.title,
      category: dl.category,
      dueDate: dl.date,
      originalDate: null as string | null,
      isExtended: false,
      isCustom: false,
      conditional: dl.conditional,
      conditionNote: dl.conditionNote || null,
      provisional: dl.provisional,
      note: null as string | null,
      sourceUrl: null as string | null,
      overrideId: null as number | null,
    }));

    // Apply overrides
    const matchedOverrideIds = new Set<number>();

    for (const override of overrides) {
      if (override.originalDate) {
        // Try to match statutory item in this month by originalDate and title/category
        const matchedItem = items.find(
          (item) =>
            item.dueDate === override.originalDate &&
            (item.title.toLowerCase().includes(override.title.toLowerCase()) ||
              override.title.toLowerCase().includes(item.title.toLowerCase()) ||
              item.category.toLowerCase() === override.category.toLowerCase()),
        );

        if (matchedItem) {
          matchedOverrideIds.add(override.id);
          matchedItem.originalDate = override.originalDate;
          matchedItem.isExtended = true;
          matchedItem.dueDate = override.newDate;
          matchedItem.note = override.note || null;
          matchedItem.sourceUrl = override.sourceUrl || null;
          matchedItem.overrideId = override.id;
        } else if (override.newDate.startsWith(monthPrefix)) {
          // If the override moved an item from another month INTO this month
          matchedOverrideIds.add(override.id);
          const relatedRule = STATUTORY_RULES.find(
            (r) =>
              r.title.toLowerCase().includes(override.title.toLowerCase()) ||
              override.title.toLowerCase().includes(r.title.toLowerCase()),
          );

          items.push({
            id: `override-${override.id}`,
            title: override.title,
            category: override.category as ComplianceCategory,
            dueDate: override.newDate,
            originalDate: override.originalDate,
            isExtended: true,
            isCustom: false,
            conditional: relatedRule?.conditional ?? false,
            conditionNote: relatedRule?.conditionNote ?? null,
            provisional: true,
            note: override.note || null,
            sourceUrl: override.sourceUrl || null,
            overrideId: override.id,
          });
        }
      } else {
        // Standalone manual compliance entry (originalDate is null)
        if (override.newDate.startsWith(monthPrefix)) {
          matchedOverrideIds.add(override.id);
          items.push({
            id: `custom-${override.id}`,
            title: override.title,
            category: override.category as ComplianceCategory,
            dueDate: override.newDate,
            originalDate: null,
            isExtended: false,
            isCustom: true,
            conditional: false,
            conditionNote: null,
            provisional: true,
            note: override.note || null,
            sourceUrl: override.sourceUrl || null,
            overrideId: override.id,
          });
        }
      }
    }

    // Sort by dueDate ascending, then title
    items.sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.title.localeCompare(b.title));

    res.json(items);
  } catch (error) {
    logger.error({ error }, "Error compiling compliance calendar");
    res.status(500).json({ error: "Failed to generate compliance calendar" });
  }
});

/**
 * GET /compliance/overrides
 * Returns all compliance date overrides / standalone entries
 */
router.get("/compliance/overrides", async (_req: Request, res: Response) => {
  try {
    const list = await getAllOverrides();
    const result = list.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      originalDate: item.originalDate,
      newDate: item.newDate,
      note: item.note,
      sourceUrl: item.sourceUrl,
      createdAt: item.createdAt.toISOString(),
    }));
    res.json(result);
  } catch (error) {
    logger.error({ error }, "Error fetching compliance overrides");
    res.status(500).json({ error: "Failed to fetch overrides" });
  }
});

/**
 * POST /compliance/overrides
 * Create or set a date override / standalone compliance entry
 */
router.post("/compliance/overrides", async (req: Request, res: Response) => {
  try {
    const parsed = CreateComplianceOverrideBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
      return;
    }

    const { title, category, originalDate, newDate, note, sourceUrl } = parsed.data;

    if (isDbAvailable && db) {
      try {
        const [inserted] = await db
          .insert(complianceOverrides)
          .values({
            title,
            category,
            originalDate: originalDate || null,
            newDate,
            note: note || null,
            sourceUrl: sourceUrl || null,
          })
          .returning();

        if (inserted) {
          res.status(201).json({
            id: inserted.id,
            title: inserted.title,
            category: inserted.category,
            originalDate: inserted.originalDate,
            newDate: inserted.newDate,
            note: inserted.note,
            sourceUrl: inserted.sourceUrl,
            createdAt: inserted.createdAt.toISOString(),
          });
          return;
        }
      } catch (err) {
        logger.warn({ err }, "DB insert failed, storing in memory");
      }
    }

    // In-memory fallback
    const newItem: InMemOverride = {
      id: nextInMemId++,
      title,
      category,
      originalDate: originalDate || null,
      newDate,
      note: note || null,
      sourceUrl: sourceUrl || null,
      createdAt: new Date(),
    };
    inMemoryOverrides.unshift(newItem);

    res.status(201).json({
      id: newItem.id,
      title: newItem.title,
      category: newItem.category,
      originalDate: newItem.originalDate,
      newDate: newItem.newDate,
      note: newItem.note,
      sourceUrl: newItem.sourceUrl,
      createdAt: newItem.createdAt.toISOString(),
    });
  } catch (error) {
    logger.error({ error }, "Error creating compliance override");
    res.status(500).json({ error: "Failed to create override" });
  }
});

/**
 * DELETE /compliance/overrides/:id
 * Delete an override or standalone compliance item
 */
router.delete("/compliance/overrides/:id", async (req: Request, res: Response) => {
  try {
    const parsed = DeleteComplianceOverrideParams.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    const overrideId = parsed.data.id;

    if (isDbAvailable && db) {
      try {
        await db.delete(complianceOverrides).where(eq(complianceOverrides.id, overrideId));
      } catch (err) {
        logger.warn({ err }, "DB delete failed, updating in-memory store");
      }
    }

    inMemoryOverrides = inMemoryOverrides.filter((item) => item.id !== overrideId);

    res.json({ success: true });
  } catch (error) {
    logger.error({ error }, "Error deleting compliance override");
    res.status(500).json({ error: "Failed to delete override" });
  }
});

export default router;
