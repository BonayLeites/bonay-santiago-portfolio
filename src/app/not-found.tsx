import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-900 font-sans">
        <div className="text-center px-6">
          <p className="text-accent-500 text-sm font-medium tracking-widest uppercase mb-4">
            404
          </p>
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-stone-500 mb-8 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/en"
            className="inline-block px-6 py-3 bg-stone-900 text-stone-50 rounded-md hover:bg-stone-800 transition-colors"
          >
            Go home
          </Link>
        </div>
      </body>
    </html>
  );
}
