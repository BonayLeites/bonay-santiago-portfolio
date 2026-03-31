"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const contactLinks = [
  {
    labelKey: "emailLabel",
    value: "bonay.santiago@gmail.com",
    href: "mailto:bonay.santiago@gmail.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "santiago-bonay",
    href: "https://linkedin.com/in/santiago-bonay",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "BonayLeites",
    href: "https://github.com/BonayLeites",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <section className="py-24 md:py-32 min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Izquierda */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono text-accent-500 tracking-widest uppercase block mb-3">
                04
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900">
                {t("title")}
              </h1>
              <div className="accent-line mt-4" />
              <p className="mt-6 text-stone-600 leading-relaxed">
                {t("description")}
              </p>
              <p className="mt-4 text-sm text-stone-500 italic bg-stone-100 px-4 py-3 rounded-lg border border-stone-200">
                {t("demoAccess")}
              </p>
            </motion.div>
          </div>

          {/* Derecha — Links de contacto */}
          <div className="md:col-span-7 md:flex md:items-center">
            <div className="space-y-4 w-full">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="group flex items-center gap-6 p-6 bg-white rounded-xl border border-stone-100 hover:border-accent-200 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-accent-50 group-hover:text-accent-600 transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-mono text-stone-400 tracking-wider uppercase block">
                      {link.labelKey ? t(link.labelKey) : link.label}
                    </span>
                    <span className="text-stone-900 font-medium group-hover:text-accent-600 transition-colors truncate block">
                      {link.value}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-stone-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
