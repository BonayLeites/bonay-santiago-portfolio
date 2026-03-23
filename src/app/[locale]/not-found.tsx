import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("nav");

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-32">
      <div className="text-center">
        <div className="accent-line mx-auto mb-8" />
        <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-4">
          404
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          Page not found
        </h1>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-stone-900 text-stone-50 rounded-md hover:bg-stone-800 transition-colors"
        >
          {t("about")}
        </Link>
      </div>
    </section>
  );
}
