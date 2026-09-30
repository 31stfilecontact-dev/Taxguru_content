import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const complianceOverrides = pgTable("compliance_overrides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  originalDate: text("original_date"), // nullable; when null, treated as standalone manual entry
  newDate: text("new_date").notNull(), // format YYYY-MM-DD
  note: text("note"),
  sourceUrl: text("source_url"), // internal only, never displayed in output/exports
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertComplianceOverrideSchema = createInsertSchema(complianceOverrides).omit({
  id: true,
  createdAt: true,
});

export type ComplianceOverride = typeof complianceOverrides.$inferSelect;
export type InsertComplianceOverride = z.infer<typeof insertComplianceOverrideSchema>;
