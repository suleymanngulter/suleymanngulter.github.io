import type { Locale } from "./translations";

/** Ay opsiyonel — yalnızca yıl verilirse "2022 – 2026" gibi gösterilir. */
export type DateParts = {
  month?: number;
  year: number;
};

export type DateRange = {
  start: DateParts;
  end?: DateParts | "present";
};

const MONTHS: Record<Locale, readonly string[]> = {
  tr: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const PRESENT: Record<Locale, string> = {
  tr: "Günümüz",
  en: "Present",
};

function formatPart(locale: Locale, part: DateParts): string {
  if (part.month != null && part.month >= 1 && part.month <= 12) {
    return `${MONTHS[locale][part.month - 1]} ${part.year}`;
  }
  return String(part.year);
}

/** Eğitim ve deneyim tarihlerini locale'e göre biçimlendirir. */
export function formatDateRange(locale: Locale, range: DateRange): string {
  const start = formatPart(locale, range.start);

  if (range.end === "present") {
    return `${start} – ${PRESENT[locale]}`;
  }

  if (!range.end) {
    return start;
  }

  const end = formatPart(locale, range.end);

  if (
    range.start.month == null &&
    range.end.month == null &&
    range.start.year !== range.end.year
  ) {
    return `${range.start.year} – ${range.end.year}`;
  }

  return `${start} – ${end}`;
}
