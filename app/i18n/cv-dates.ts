import type { DateRange } from "./dates";

/** Tarihleri tek yerden güncellemek için paylaşılan aralıklar. */
export const educationDates = {
  duzce: { start: { year: 2022 }, end: { year: 2026 } },
  dumlupinar: { start: { year: 2021 }, end: { year: 2022 } },
  karamursel: { start: { year: 2017 }, end: { year: 2021 } },
} as const satisfies Record<string, DateRange>;

export const experienceDates = {
  yukatech: { start: { month: 6, year: 2026 }, end: "present" },
  satailite: { start: { month: 5, year: 2025 }, end: { month: 6, year: 2025 } },
  gdg: { start: { month: 8, year: 2024 }, end: { month: 6, year: 2025 } },
  tersan: { start: { month: 6, year: 2024 }, end: { month: 8, year: 2024 } },
  tarlabot: { start: { year: 2024 } },
  tba: { start: { month: 5, year: 2024 }, end: { month: 6, year: 2024 } },
} as const satisfies Record<string, DateRange>;
