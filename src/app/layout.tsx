import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Santiago Bonay",
  description: "Software Engineer — AI & Enterprise Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
