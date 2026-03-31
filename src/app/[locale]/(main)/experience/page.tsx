"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type TimelineEntry = {
  roleKey: string;
  company: string;
  locationKey: string;
  period: string;
  descKeys: string[];
  technologies: string[];
};

const timeline: TimelineEntry[] = [
  {
    roleKey: "role1",
    company: "EDISA",
    locationKey: "location1",
    period: "2023",
    descKeys: [
      "role1_desc1",
      "role1_desc2",
      "role1_desc3",
      "role1_desc4",
      "role1_desc5",
    ],
    technologies: [
      "Python",
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "Azure AI",
      "Oracle Cloud",
      "PyTorch",
      "Docker",
      "Hugging Face",
    ],
  },
  {
    roleKey: "role2",
    company: "EDISA",
    locationKey: "location2",
    period: "2012 — 2022",
    descKeys: ["role2_desc1", "role2_desc2", "role2_desc3"],
    technologies: [
      "Oracle DB",
      "PL/SQL",
      "SQL",
      "ERP Systems",
      "Project Management",
    ],
  },
  {
    roleKey: "role3",
    company: "Fortek",
    locationKey: "location3",
    period: "2007",
    descKeys: ["role3_desc1"],
    technologies: ["Web Development", "e-Commerce", "SQL", "ETL"],
  },
];

type EducationEntry = {
  degreeKey: string;
  extraKey: string;
  school: string;
  period: string;
};

const education: EducationEntry[] = [
  {
    degreeKey: "degree1",
    extraKey: "degree1_extra",
    school: "Universidad Internacional de La Rioja",
    period: "2023 — 2024",
  },
  {
    degreeKey: "degree2",
    extraKey: "",
    school: "Universidad de Vigo",
    period: "2007 — 2011",
  },
];

const certifications = [
  "Claude 101 — Anthropic",
  "Claude Code in Action — Anthropic",
  "OCI Generative AI Professional",
  "OCI AI Foundations Associate",
  "OCI Data Science Professional",
  "OCI Digital Assistant Professional",
  "Google Data Analytics Professional",
  "Big Data Architecture — GDOCE",
];

export default function ExperiencePage() {
  const t = useTranslations("experience");

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-mono text-accent-500 tracking-widest uppercase block mb-3">
            02
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900">
            {t("title")}
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 text-stone-500 text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-0 md:left-[140px] top-0 bottom-0 w-[1px] bg-stone-200" />

          <div className="space-y-16">
            {timeline.map((entry, i) => {
              const period =
                entry.period === "2023"
                  ? `2023 — ${t("present")}`
                  : entry.period;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-12"
                >
                  {/* Período */}
                  <div className="hidden md:flex flex-col items-end pr-8">
                    <span className="text-sm font-mono text-stone-400 whitespace-nowrap">
                      {period}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-[140px] -translate-x-1/2 top-1 w-3 h-3 rounded-full border-2 border-accent-500 bg-stone-50 z-10" />

                  {/* Contenido */}
                  <div className="pl-6 md:pl-8">
                    <span className="md:hidden text-xs font-mono text-stone-400 mb-2 block">
                      {period}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-stone-900">
                      {t(entry.roleKey)}
                    </h3>
                    <p className="text-accent-600 font-medium mt-1">
                      {entry.company}{" "}
                      <span className="text-stone-400 font-normal">
                        &mdash; {t(entry.locationKey)}
                      </span>
                    </p>

                    <ul className="mt-4 space-y-2">
                      {entry.descKeys.map((key, j) => (
                        <li
                          key={j}
                          className="text-stone-600 text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-[1px] before:bg-stone-400"
                        >
                          {t(key)}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {entry.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 bg-stone-100 text-stone-600 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Educación */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 md:mt-32"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-8">
            {t("education")}
          </h2>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6 pb-6 border-b border-stone-100 last:border-0"
              >
                <span className="text-sm font-mono text-stone-400 md:w-32 flex-shrink-0">
                  {edu.period}
                </span>
                <div>
                  <h3 className="font-semibold text-stone-900">
                    {t(edu.degreeKey)}
                  </h3>
                  {edu.extraKey && (
                    <p className="text-sm text-stone-500">{t(edu.extraKey)}</p>
                  )}
                  <p className="text-sm text-accent-600">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certificaciones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-8">
            {t("certifications")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 text-sm text-stone-600 py-3 px-4 bg-white rounded-lg border border-stone-100"
              >
                <svg
                  className="w-4 h-4 text-accent-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {cert}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
