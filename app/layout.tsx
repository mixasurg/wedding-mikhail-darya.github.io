import type { Metadata } from "next";
import "./globals.css";
import MatrixBackdrop from "@/components/MatrixBackdrop";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: {
    default: "Михаил × Дарья — Любовь как код от реальности",
    template: "%s · Михаил × Дарья",
  },
  description:
    "Свадебное приглашение Михаила и Дарьи. Любовь как код от реальности.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${publicBasePath}/favicon.svg`,
    shortcut: `${publicBasePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <MatrixBackdrop />
        <div className="site-shell">
          <SiteNav />
          <main className="site-main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
