"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type Project = {
  titleKey?: string;
  title?: string;
  descriptionKey?: string;
  description?: string;
  highlightsKey?: string;
  highlights?: string;
  tags: string[];
  featured?: boolean;
  liveDemo?: boolean;
  githubUrl?: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    titleKey: "cpm.title",
    descriptionKey: "cpm.description",
    highlightsKey: "cpm.highlights",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Azure AI",
      "PostgreSQL",
      "Docker",
    ],
    featured: true,
    liveDemo: true,
    githubUrl: "https://github.com/BonayLeites/agentic-cpm",
  },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");

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
            03
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900">
            {t("title")}
          </h1>
          <div className="accent-line mt-4" />
          <p className="mt-4 text-stone-500 text-lg">{t("subtitle")}</p>
        </motion.div>

        {/* Grid de proyectos */}
        <div className="space-y-12">
          {projects.map((project, i) => {
            const title = project.titleKey
              ? t(project.titleKey)
              : project.title;
            const description = project.descriptionKey
              ? t(project.descriptionKey)
              : project.description;
            const highlights = project.highlightsKey
              ? t(project.highlightsKey)
              : project.highlights;

            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative group ${
                  project.featured ? "" : ""
                }`}
              >
                {project.featured && (
                  <div className="relative bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-stone-300 transition-colors">
                    {/* Header con badges */}
                    <div className="p-8 md:p-10">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {project.featured && (
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 bg-accent-50 text-accent-600 rounded-full border border-accent-200">
                            {t("featured")}
                          </span>
                        )}
                        {project.liveDemo && (
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 bg-ink-50 text-ink-600 rounded-full border border-ink-200 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-ink-500 animate-pulse" />
                            {t("liveDemo")}
                          </span>
                        )}
                      </div>

                      <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                        {title}
                      </h2>

                      <p className="text-stone-600 leading-relaxed max-w-2xl mb-4">
                        {description}
                      </p>

                      {highlights && (
                        <p className="text-sm text-stone-500 font-mono mb-6">
                          {highlights}
                        </p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-3 py-1.5 bg-stone-50 text-stone-600 rounded-md border border-stone-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Screenshot del CPM */}
                      <div className="relative rounded-xl overflow-hidden border border-stone-200 mb-8">
                        <Image
                          src="/images/cpm-workflow-run.png"
                          alt="CPM Agent Accelerator — Workflow Run showing 7 AI agents completing consolidation review"
                          width={1617}
                          height={760}
                          className="w-full h-auto"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                      </div>

                      {/* Diagrama de arquitectura visual */}
                      <div className="bg-stone-50 rounded-xl p-6 md:p-8 mb-8 border border-stone-100">
                        <p className="text-[10px] font-mono text-stone-400 tracking-widest uppercase mb-4">
                          Architecture
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 md:gap-3 text-center">
                          {[
                            {
                              label: "Data Loader",
                              step: "1",
                              color: "bg-ink-50 text-ink-700 border-ink-200",
                            },
                            {
                              label: "IC Check",
                              step: "2",
                              color:
                                "bg-accent-50 text-accent-700 border-accent-200",
                            },
                            {
                              label: "Anomaly",
                              step: "2",
                              color:
                                "bg-accent-50 text-accent-700 border-accent-200",
                            },
                            {
                              label: "Doc Search",
                              step: "3",
                              color: "bg-ink-50 text-ink-700 border-ink-200",
                            },
                            {
                              label: "Analysis",
                              step: "4",
                              color: "bg-ink-50 text-ink-700 border-ink-200",
                            },
                            {
                              label: "Narrative",
                              step: "5",
                              color: "bg-ink-50 text-ink-700 border-ink-200",
                            },
                            {
                              label: "Quality",
                              step: "6",
                              color:
                                "bg-ink-50 text-ink-700 border-ink-200",
                            },
                          ].map((agent) => (
                            <div
                              key={agent.label}
                              className={`rounded-lg border px-2 py-3 ${agent.color}`}
                            >
                              <span className="text-[11px] font-mono opacity-50 block">
                                Step {agent.step}
                              </span>
                              <span className="text-[11px] font-medium block mt-0.5">
                                {agent.label}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-3 text-stone-300">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <svg
                              key={i}
                              className="w-3 h-3"
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
                          ))}
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          {t("requestAccess")}
                        </Link>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-stone-700 text-sm font-medium rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            {t("viewCode")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
