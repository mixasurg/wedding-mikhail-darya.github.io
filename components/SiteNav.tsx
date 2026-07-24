"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Код", short: "01" },
  { href: "/details", label: "День", short: "02" },
  { href: "/style", label: "Стиль", short: "03" },
  { href: "/rsvp", label: "RSVP", short: "04" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <>
      <header className="site-header">
        <Link className="site-mark" href="/" aria-label="На главную">
          <span>[</span>M×D<span>]</span>
        </Link>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                href={link.href}
                className={active ? "is-active" : ""}
                aria-current={active ? "page" : undefined}
                key={link.href}
              >
                <span>{link.short}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <p className="system-status">
          <span aria-hidden="true" />
          17.10.2026
        </p>
      </header>

      <nav className="mobile-nav" aria-label="Мобильная навигация">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              href={link.href}
              className={active ? "is-active" : ""}
              aria-current={active ? "page" : undefined}
              key={link.href}
            >
              <span>{link.short}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
