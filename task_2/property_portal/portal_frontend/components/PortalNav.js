"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortalNav() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Portal"
    },
    {
      href: "/estimator",
      label: "Value Estimator"
    },
    {
      href: "/market-analysis",
      label: "Market Analysis"
    }
  ];

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-bold text-slate-900">
          Property Portal
        </Link>

        <div className="flex flex-wrap gap-2">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}