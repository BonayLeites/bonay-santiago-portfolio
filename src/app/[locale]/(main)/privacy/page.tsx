"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = [
    { title: t("introTitle"), content: t("intro") },
    {
      title: t("collectionTitle"),
      content: t("collectionDesc"),
      subsections: [
        { title: t("analyticsTitle"), content: t("analyticsDesc") },
        { title: t("speedTitle"), content: t("speedDesc") },
      ],
    },
    { title: t("noCookiesTitle"), content: t("noCookies") },
    { title: t("thirdPartyTitle"), content: t("thirdParty") },
    {
      title: t("rightsTitle"),
      content: t("rights"),
      contact: "bonay.santiago@gmail.com",
    },
    { title: t("hostingTitle"), content: t("hosting") },
    { title: t("changesTitle"), content: t("changes") },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-accent-500 tracking-widest uppercase block mb-3">
            {t("subtitle")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900">
            {t("title")}
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 text-sm text-stone-400">{t("lastUpdated")}</p>
        </motion.div>

        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
            >
              <h2 className="font-display text-xl font-semibold text-stone-900 mb-3">
                {section.title}
              </h2>
              <p className="text-stone-600 leading-relaxed">
                {section.content}
              </p>

              {section.subsections?.map((sub) => (
                <div key={sub.title} className="mt-4 ml-4 pl-4 border-l-2 border-stone-200">
                  <h3 className="font-medium text-stone-800 mb-1">
                    {sub.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {sub.content}
                  </p>
                </div>
              ))}

              {section.contact && (
                <a
                  href={`mailto:${section.contact}`}
                  className="inline-block mt-3 text-accent-600 hover:text-accent-700 font-medium transition-colors"
                >
                  {section.contact}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
