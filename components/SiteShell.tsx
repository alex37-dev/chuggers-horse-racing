"use client";

import Link from "next/link";
import React from "react";

type SiteShellProps = {
  currentPage: string;
  children?: React.ReactNode;
};

export default function SiteShell({ currentPage, children }: SiteShellProps) {
  const nav = [
    ["Home", "/"],
    ["Upcoming Festival", "/upcoming-festival"],
    ["Championship Standings", "/championship-standings"],
    ["Festivals", "/festivals"],
    ["Race Cards", "/race-cards"],
    ["Odds Grid", "/odds-grid"],
    ["Horse Index", "/horse-index"],
    ["Stables", "/stables"],
    ["Photo Gallery", "/photo-gallery"],
    ["Hall of Fame", "/hall-of-fame"],
    ["My Stable", "/my-stable"],
    ["Raw Data", "/raw-data"],
    ["Admin", "/admin"],
    ["Login", "/login"],
  ] as const;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
              Chuggers Racing League
            </div>
            <h1 className="text-4xl font-bold">Real Site V1</h1>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
            Step 1: parity before auth
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl xl:sticky xl:top-24 xl:h-fit">
          <div className="border-b border-white/10 pb-4">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
              League Hub
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              This live build is catching back up with the stronger V1 feature
              set before we add real user accounts.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  currentPage === label
                    ? "bg-emerald-400 text-slate-950"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <span>{label}</span>
                <span>›</span>
              </Link>
            ))}
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
