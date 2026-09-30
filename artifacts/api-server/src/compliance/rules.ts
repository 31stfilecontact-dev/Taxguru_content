/**
 * Recurring Indian Statutory Compliance Deadlines
 * All dates are marked provisional and subject to government notifications/clarifications.
 */

export type ComplianceCategory =
  | "GST"
  | "TDS"
  | "Income Tax"
  | "Advance Tax"
  | "ROC"
  | "LLP"
  | "FEMA"
  | "PF-ESI";

export type RecurrencePattern =
  | { type: "monthly"; dayOfMonth: number; monthOffset?: number }
  | { type: "quarterly"; months: number[]; dayOfMonth: number }
  | { type: "half_yearly"; dates: Array<{ month: number; dayOfMonth: number }> }
  | { type: "fixed_annual"; month: number; dayOfMonth: number };

export interface StatutoryRule {
  id: string;
  title: string;
  category: ComplianceCategory;
  recurrence: RecurrencePattern;
  provisional: boolean;
  conditional: boolean;
  conditionNote: string;
  description?: string;
}

export interface ConcreteDeadline {
  id: string;
  ruleId: string;
  title: string;
  category: ComplianceCategory;
  date: string; // YYYY-MM-DD
  provisional: boolean;
  conditional: boolean;
  conditionNote: string;
  isOverride?: boolean;
  overrideNote?: string;
}

export const STATUTORY_RULES: StatutoryRule[] = [
  // ─── GST ───
  {
    id: "gst-gstr1-monthly",
    title: "GSTR-1 (Monthly)",
    category: "GST",
    recurrence: { type: "monthly", dayOfMonth: 11 },
    provisional: true,
    conditional: false,
    conditionNote: "",
    description: "Monthly details of outward supplies for turnover above ₹5 cr or non-QRMP taxpayers",
  },
  {
    id: "gst-gstr1-qrmp",
    title: "GSTR-1 (QRMP Quarterly)",
    category: "GST",
    recurrence: { type: "quarterly", months: [1, 4, 7, 10], dayOfMonth: 13 },
    provisional: true,
    conditional: true,
    conditionNote: "QRMP quarterly scheme filers only",
    description: "Quarterly statement of outward supplies for taxpayers under QRMP scheme",
  },
  {
    id: "gst-gstr3b-monthly",
    title: "GSTR-3B (Monthly > ₹5 Cr)",
    category: "GST",
    recurrence: { type: "monthly", dayOfMonth: 20 },
    provisional: true,
    conditional: false,
    conditionNote: "",
    description: "Monthly summary return and tax payment for regular taxpayers (turnover > ₹5 Cr)",
  },
  {
    id: "gst-gstr3b-qrmp-grp1",
    title: "GSTR-3B (QRMP Group 1)",
    category: "GST",
    recurrence: { type: "quarterly", months: [1, 4, 7, 10], dayOfMonth: 22 },
    provisional: true,
    conditional: true,
    conditionNote: "QRMP scheme: Group 1 states (South/West/Central) only",
    description: "Quarterly return for QRMP filers in South/West/Central states (MH, GJ, KA, TN, etc.)",
  },
  {
    id: "gst-gstr3b-qrmp-grp2",
    title: "GSTR-3B (QRMP Group 2)",
    category: "GST",
    recurrence: { type: "quarterly", months: [1, 4, 7, 10], dayOfMonth: 24 },
    provisional: true,
    conditional: true,
    conditionNote: "QRMP scheme: Group 2 states (North/East/NE) only",
    description: "Quarterly return for QRMP filers in North/East/NE states (DL, HR, RJ, UP, WB, etc.)",
  },
  {
    id: "gst-gstr9-annual",
    title: "GSTR-9 (Annual Return)",
    category: "GST",
    recurrence: { type: "fixed_annual", month: 12, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Mandatory for turnover > ₹2 crore; optional below",
    description: "Consolidated annual return for regular taxpayers",
  },
  {
    id: "gst-gstr9c-reconciliation",
    title: "GSTR-9C (Reconciliation)",
    category: "GST",
    recurrence: { type: "fixed_annual", month: 12, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Turnover exceeding ₹5 crore only",
    description: "Self-certified reconciliation statement for aggregate turnover > ₹5 crore",
  },
  {
    id: "gst-cmp08-quarterly",
    title: "CMP-08 (Composition)",
    category: "GST",
    recurrence: { type: "quarterly", months: [1, 4, 7, 10], dayOfMonth: 18 },
    provisional: true,
    conditional: true,
    conditionNote: "Composition scheme taxpayers only",
    description: "Quarterly challan-cum-statement of payment for composition dealers",
  },
  {
    id: "gst-gstr4-annual",
    title: "GSTR-4 (Composition Annual)",
    category: "GST",
    recurrence: { type: "fixed_annual", month: 6, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Composition scheme taxpayers only",
    description: "Annual return for taxpayers opted into composition scheme under Section 10",
  },
  {
    id: "gst-lut-renewal",
    title: "LUT Renewal (Exporters)",
    category: "GST",
    recurrence: { type: "fixed_annual", month: 3, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Zero-rated GST exporters exporting without IGST payment only",
    description: "Annual renewal of Letter of Undertaking for zero-rated export supplies without IGST",
  },
  {
    id: "gst-gstr7-tds",
    title: "GSTR-7 (GST TDS Return)",
    category: "GST",
    recurrence: { type: "monthly", dayOfMonth: 10 },
    provisional: true,
    conditional: true,
    conditionNote: "Government deductors only.",
    description: "Monthly return for tax deductors required to deduct TDS under GST Section 51",
  },
  {
    id: "gst-gstr8-tcs",
    title: "GSTR-8 (GST TCS Return)",
    category: "GST",
    recurrence: { type: "monthly", dayOfMonth: 10 },
    provisional: true,
    conditional: true,
    conditionNote: "E-commerce operators only.",
    description: "Monthly return for electronic commerce operators collecting TCS under GST Section 52",
  },

  // ─── TDS / TCS ───
  {
    id: "tds-payment-monthly",
    title: "TDS Payment",
    category: "TDS",
    recurrence: { type: "monthly", dayOfMonth: 7 },
    provisional: true,
    conditional: false,
    conditionNote: "",
    description: "Deposit of tax deducted/collected at source for previous month (Challan ITNS 281)",
  },
  {
    id: "tds-return-quarterly",
    title: "TDS Return (24Q/26Q/27Q)",
    category: "TDS",
    recurrence: { type: "quarterly", months: [1, 5, 7, 10], dayOfMonth: 31 },
    provisional: true,
    conditional: false,
    conditionNote: "",
    description: "Quarterly TDS return statement for salary (24Q), non-salary (26Q), and non-residents (27Q)",
  },
  {
    id: "tcs-return-27eq",
    title: "TCS Return (27EQ)",
    category: "TDS",
    recurrence: { type: "quarterly", months: [1, 5, 7, 10], dayOfMonth: 15 },
    provisional: true,
    conditional: true,
    conditionNote: "TCS collectors only — different schedule from TDS returns, don't conflate the two.",
    description: "Quarterly statement of tax collected at source under Section 206C",
  },
  {
    id: "income-tax-form-61a",
    title: "Form 61A (SFT Statement)",
    category: "TDS",
    recurrence: { type: "fixed_annual", month: 5, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Specified reporting persons only (banks, registrars, certain companies).",
    description: "Statement of Financial Transactions under Section 285BA and Rule 114E",
  },

  // ─── Income Tax / Transfer Pricing ───
  {
    id: "it-itr-non-audit",
    title: "ITR Filing (Non-Audit)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 7, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Non-audit individual/HUF/firm assessees only",
    description: "Annual Income Tax Return for individuals, HUFs, and non-audit business entities",
  },
  {
    id: "it-tar-audit",
    title: "Tax Audit Report (3CA/3CD)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 9, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Assessees exceeding statutory business/profession turnover audit thresholds only",
    description: "Tax audit report submission under Section 44AB of the Income Tax Act",
  },
  {
    id: "it-itr-audit",
    title: "ITR Filing (Audit Cases)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 10, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Tax audit corporate and non-corporate assessees only",
    description: "Annual ITR for corporate assessees and individuals/firms subject to tax audit",
  },
  {
    id: "it-form-3ceb-tp",
    title: "Form 3CEB (Transfer Pricing)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 10, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Assessees entering into international/specified domestic transactions under Section 92E only",
    description: "Accountant report on international and specified domestic transactions under Section 92E",
  },
  {
    id: "it-form-3ceab-intimation",
    title: "Form 3CEAB (Master File Intimation)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 10, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Only where more than one Indian constituent entity of the group exists.",
    description: "Intimation by designated constituent entity of an international group under Section 92D",
  },
  {
    id: "it-itr-tp-cases",
    title: "ITR Filing (TP Cases)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 11, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Assessees required to furnish Form 3CEB report only",
    description: "Annual ITR filing for assessees having international/specified domestic transactions",
  },
  {
    id: "it-form-3ceaa-master-file",
    title: "Form 3CEAA (Master File)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 11, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Only if international-transaction value exceeds ₹50 crore and group turnover exceeds ₹500 crore.",
    description: "Master File reporting under Section 92D and Rule 10DA",
  },
  {
    id: "it-advance-tax",
    title: "Advance Tax Instalment",
    category: "Advance Tax",
    recurrence: { type: "quarterly", months: [3, 6, 9, 12], dayOfMonth: 15 },
    provisional: true,
    conditional: false,
    conditionNote: "",
    description: "Statutory advance tax payment instalments (15% Jun, 45% Sep, 75% Dec, 100% Mar)",
  },
  {
    id: "it-equalisation-levy-q123",
    title: "Equalisation Levy",
    category: "Income Tax",
    recurrence: { type: "quarterly", months: [1, 7, 10], dayOfMonth: 7 },
    provisional: true,
    conditional: true,
    conditionNote: "Specified e-commerce operators and digital advertisement deductors only",
    description: "Quarterly equalisation levy payment for specified services under Finance Act",
  },
  {
    id: "it-equalisation-levy-q4",
    title: "Equalisation Levy (Q4)",
    category: "Income Tax",
    recurrence: { type: "fixed_annual", month: 3, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Specified e-commerce operators and digital advertisement deductors only",
    description: "Q4 equalisation levy payment due by 31st March of financial year",
  },

  // ─── Company Law (ROC) ───
  {
    id: "roc-msme1-apr",
    title: "MSME Form-1 (Oct-Mar)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 4, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Companies with outstanding MSME supplier payments exceeding 45 days",
    description: "Half-yearly return of outstanding payments to MSME suppliers for Oct-Mar",
  },
  {
    id: "roc-pas6-may",
    title: "PAS-6 (Oct-Mar Half)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 5, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Unlisted public companies and non-small private companies with demat shares only.",
    description: "Reconciliation of Share Capital Audit Report (half-year ended 31 March)",
  },
  {
    id: "roc-dpt3-annual",
    title: "DPT-3 (Return of Deposits)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 6, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Companies having outstanding deposits or non-deposit loans/advances",
    description: "Annual return of deposits or transactions not considered as deposits",
  },
  {
    id: "roc-dir3-kyc",
    title: "DIR-3 KYC",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 9, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Every individual holding an active Director Identification Number (DIN)",
    description: "Annual KYC verification for every person holding an approved DIN",
  },
  {
    id: "roc-adt1-agm",
    title: "ADT-1 (Auditor Appt)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 10, dayOfMonth: 15 },
    provisional: true,
    conditional: true,
    conditionNote: "Only when statutory auditor is appointed/reappointed at AGM",
    description: "Notice to ROC for auditor appointment (15 days after assumed 30-Sept AGM)",
  },
  {
    id: "roc-aoc4-annual",
    title: "AOC-4 (Financials)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 10, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Companies filing audited financial statements after AGM",
    description: "Filing financial statements with ROC (30 days after assumed 30-Sept AGM)",
  },
  {
    id: "roc-msme1-oct",
    title: "MSME Form-1 (Apr-Sep)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 10, dayOfMonth: 31 },
    provisional: true,
    conditional: true,
    conditionNote: "Companies with outstanding MSME supplier payments exceeding 45 days",
    description: "Half-yearly return of outstanding payments to MSME suppliers for Apr-Sep",
  },
  {
    id: "roc-mgt7-annual",
    title: "MGT-7 (Annual Return)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 11, dayOfMonth: 29 },
    provisional: true,
    conditional: true,
    conditionNote: "Companies filing annual return after AGM",
    description: "Filing annual return with ROC (60 days after assumed 30-Sept AGM)",
  },
  {
    id: "roc-pas6-nov",
    title: "PAS-6 (Apr-Sep Half)",
    category: "ROC",
    recurrence: { type: "fixed_annual", month: 11, dayOfMonth: 29 },
    provisional: true,
    conditional: true,
    conditionNote: "Unlisted public companies and non-small private companies with demat shares only.",
    description: "Reconciliation of Share Capital Audit Report (half-year ended 30 September)",
  },

  // ─── LLP ───
  {
    id: "llp-form11-annual",
    title: "LLP Form 11 (Annual Return)",
    category: "LLP",
    recurrence: { type: "fixed_annual", month: 5, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Limited Liability Partnerships only",
    description: "Annual return of Limited Liability Partnership (within 60 days of FY closure)",
  },
  {
    id: "llp-form8-solvency",
    title: "LLP Form 8 (Accounts & Solvency)",
    category: "LLP",
    recurrence: { type: "fixed_annual", month: 10, dayOfMonth: 30 },
    provisional: true,
    conditional: true,
    conditionNote: "Limited Liability Partnerships only",
    description: "Statement of Account & Solvency for LLPs (within 30 days of end of 6 months)",
  },

  // ─── FEMA / RBI ───
  {
    id: "fema-ecb2-monthly",
    title: "ECB-2 Return",
    category: "FEMA",
    recurrence: { type: "monthly", dayOfMonth: 7 },
    provisional: true,
    conditional: true,
    conditionNote: "Borrowers with active External Commercial Borrowings only",
    description: "Monthly reporting of actual ECB transactions through AD Category-I bank",
  },
  {
    id: "fema-fla-annual",
    title: "FLA Return (FEMA/RBI)",
    category: "FEMA",
    recurrence: { type: "fixed_annual", month: 7, dayOfMonth: 15 },
    provisional: true,
    conditional: true,
    conditionNote: "Companies/LLPs that received FDI or made ODI only",
    description: "Annual return on Foreign Liabilities and Assets filed via RBI FLAIR portal",
  },

  // ─── PF / ESI ───
  {
    id: "pf-esi-monthly",
    title: "PF / ESI Deposit",
    category: "PF-ESI",
    recurrence: { type: "monthly", dayOfMonth: 15 },
    provisional: true,
    conditional: false,
    conditionNote: "",
    description: "Monthly deposit of Provident Fund and Employee State Insurance contributions",
  },
];

/**
 * Pure function: Expands statutory rules into concrete dates for a given month and year.
 * @param year e.g. 2026
 * @param month 1 to 12
 */
export function getDeadlinesForMonth(year: number, month: number): ConcreteDeadline[] {
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Expected 1-12.`);
  }

  const results: ConcreteDeadline[] = [];

  // Helper to format YYYY-MM-DD
  const formatDate = (y: number, m: number, d: number): string => {
    const mm = m.toString().padStart(2, "0");
    const dd = d.toString().padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  for (const rule of STATUTORY_RULES) {
    const { recurrence } = rule;

    if (recurrence.type === "monthly") {
      // Occurs every month on dayOfMonth
      // Validate day does not exceed days in month
      const daysInMonth = new Date(year, month, 0).getDate();
      const day = Math.min(recurrence.dayOfMonth, daysInMonth);
      results.push({
        id: `${rule.id}-${year}-${month.toString().padStart(2, "0")}`,
        ruleId: rule.id,
        title: rule.title,
        category: rule.category,
        date: formatDate(year, month, day),
        provisional: rule.provisional,
        conditional: rule.conditional,
        conditionNote: rule.conditionNote,
      });
    } else if (recurrence.type === "quarterly") {
      if (recurrence.months.includes(month)) {
        const daysInMonth = new Date(year, month, 0).getDate();
        const day = Math.min(recurrence.dayOfMonth, daysInMonth);
        results.push({
          id: `${rule.id}-${year}-${month.toString().padStart(2, "0")}`,
          ruleId: rule.id,
          title: rule.title,
          category: rule.category,
          date: formatDate(year, month, day),
          provisional: rule.provisional,
          conditional: rule.conditional,
          conditionNote: rule.conditionNote,
        });
      }
    } else if (recurrence.type === "fixed_annual") {
      if (recurrence.month === month) {
        const daysInMonth = new Date(year, month, 0).getDate();
        const day = Math.min(recurrence.dayOfMonth, daysInMonth);
        results.push({
          id: `${rule.id}-${year}-${month.toString().padStart(2, "0")}`,
          ruleId: rule.id,
          title: rule.title,
          category: rule.category,
          date: formatDate(year, month, day),
          provisional: rule.provisional,
          conditional: rule.conditional,
          conditionNote: rule.conditionNote,
        });
      }
    } else if (recurrence.type === "half_yearly") {
      for (const item of recurrence.dates) {
        if (item.month === month) {
          const daysInMonth = new Date(year, month, 0).getDate();
          const day = Math.min(item.dayOfMonth, daysInMonth);
          results.push({
            id: `${rule.id}-${year}-${month.toString().padStart(2, "0")}`,
            ruleId: rule.id,
            title: rule.title,
            category: rule.category,
            date: formatDate(year, month, day),
            provisional: rule.provisional,
            conditional: rule.conditional,
            conditionNote: rule.conditionNote,
          });
        }
      }
    }
  }

  // Sort by date ascending, then title
  return results.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}
