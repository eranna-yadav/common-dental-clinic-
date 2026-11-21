import { site } from "./site";
import { toMinutes } from "./utils";

/** All slot start times ("HH:MM") for a working day, excluding lunch. */
export function allSlots(): string[] {
  const out: string[] = [];
  const start = toMinutes(site.openingTime);
  const end = toMinutes(site.closingTime);
  const ls = toMinutes(site.lunchBreak.start);
  const le = toMinutes(site.lunchBreak.end);
  for (let m = start; m + site.slotMinutes <= end; m += site.slotMinutes) {
    if (m >= ls && m < le) continue;
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}

/** "YYYY-MM-DD" in local time */
export const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const parseISODate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export function isClinicOpenOn(date: Date) {
  return (site.openDays as readonly number[]).includes(date.getDay());
}

/** True if date is today or later (date-only comparison). */
export function isNotPast(date: Date, now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return date >= today;
}

/** Slots still bookable on a given date (filters out past times for today, with a 1h buffer). */
export function availableSlots(dateISO: string, now = new Date()) {
  const slots = allSlots();
  if (dateISO !== toISODate(now)) return slots;
  const cutoff = now.getHours() * 60 + now.getMinutes() + 60;
  return slots.filter((s) => toMinutes(s) >= cutoff);
}

export const MAX_BOOKING_DAYS_AHEAD = 90;
