/**
 * Multilingual-ready structure.
 * English is the default. To add a language:
 *   1. Add its code to `locales`.
 *   2. Create `lib/i18n/dictionaries/<code>.ts` exporting a `Dictionary`.
 *   3. Register it in `lib/i18n/index.ts`.
 *   4. (Optional) move pages under `app/[locale]/` and use `getDictionary(locale)`.
 * See README → "Adding a language".
 */
export const locales = ["en", "hi", "kn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeNames: Record<Locale, string> = { en: "English", hi: "हिन्दी", kn: "ಕನ್ನಡ" };
