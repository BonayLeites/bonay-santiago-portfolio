"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const skills = [
  "LLMs & Multi-Agent Systems",
  "RAG Architecture",
  "Python & FastAPI",
  "React & TypeScript",
  "Azure AI & Oracle Cloud",
  "MLOps & CI/CD",
  "Deep Learning & NLP",
  "Fine-tuning & LoRA",
  "Computer Vision",
];

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Elemento decorativo lateral */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:block">
          <span className="vertical-text text-[10px] font-mono tracking-widest text-stone-300 uppercase">
            Software Engineer &mdash; AI Specialist
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm font-mono text-accent-500 tracking-widest uppercase mb-4"
            >
              {t("hero.greeting")}
            </motion.p>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 leading-[0.9] mb-6"
            >
              Santiago
              <br />
              <span className="text-stone-400">Bonay</span>
            </motion.h1>

            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="accent-line mb-6" />
            </motion.div>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-xl mb-8"
            >
              {t("hero.tagline")}
            </motion.p>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-accent-600 hover:text-accent-700 transition-colors group"
              >
                {t("hero.cta")}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Círculo decorativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-stone-200/60 hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-accent-200/30 hidden md:block"
        />
      </section>

      {/* About */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Título lateral */}
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-mono text-accent-500 tracking-widest uppercase block mb-3">
                  01
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                  {t("about.title")}
                </h2>
                <div className="accent-line mt-4" />
              </motion.div>
            </div>

            {/* Contenido */}
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-base md:text-lg text-stone-600 leading-relaxed">
                  {t("about.description")}
                </p>
                <p className="text-base md:text-lg text-stone-500 leading-relaxed italic">
                  {t("about.focus")}
                </p>

                {/* Skills grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm text-stone-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0" />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
