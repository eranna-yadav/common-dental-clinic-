import { defaultLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { hi } from "./dictionaries/hi";

// TODO: add `kn` (Kannada) dictionary — falls back to English until then.
const dictionaries: Partial<Record<Locale, Dictionary>> = { en, hi };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? en;
}

/** Current-locale dictionary. Swap for a per-request locale when routing by `[locale]`. */
export const t = getDictionary(defaultLocale);

export * from "./config";
export type { Dictionary };
