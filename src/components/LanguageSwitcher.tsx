"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const locales = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "ja", label: "JA" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => handleChange(l.code)}
            className={`text-xs font-mono tracking-wider transition-colors ${
              locale === l.code
                ? "text-accent-600 font-semibold"
                : "text-stone-400 hover:text-stone-700"
            }`}
          >
            {l.label}
          </button>
          {i < locales.length - 1 && (
            <span className="text-stone-300 mx-1 text-xs">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
