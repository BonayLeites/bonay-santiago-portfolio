"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "/", label: "about" },
  { href: "/experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-stone-50/80 border-b border-stone-200/50"
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo / Nombre */}
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-stone-900 hover:text-accent-600 transition-colors"
        >
          SB<span className="text-accent-500">.</span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors ${
                  isActive
                    ? "text-accent-600"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {t(link.label)}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <div className="ml-4 pl-4 border-l border-stone-200">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-stone-900"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[2px] bg-stone-900"
          />
          <motion.span
            animate={
              mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="block w-5 h-[2px] bg-stone-900"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          mobileOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-t border-stone-200/50"
      >
        <div className="px-6 py-6 flex flex-col gap-4 bg-stone-50/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-stone-700 hover:text-accent-600 transition-colors"
            >
              {t(link.label)}
            </Link>
          ))}
          <div className="pt-2 border-t border-stone-200">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
