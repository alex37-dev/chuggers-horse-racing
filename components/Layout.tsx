import Link from 'next/link';
import { ReactNode } from 'react';

const nav = [
  ['/', 'Home'],
  ['/festivals', 'Festivals'],
  ['/race-cards', 'Race Cards'],
  ['/horse-index', 'Horse Index'],
  ['/hall-of-fame', 'Hall of Fame'],
  ['/stables', 'Stables'],
  ['/admin', 'Admin'],
  ['/login', 'Login'],
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Chuggers Racing League</div>
            <div className="text-3xl font-bold">Real Site V1</div>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">Deployable starter</div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[250px_1fr]">
        <aside className="rounded-3xl bg-slate-950 p-5 text-white xl:h-fit">
          <div className="mb-4 border-b border-white/10 pb-4 text-sm text-slate-300">This is the real project base for GitHub, Vercel, and Supabase.</div>
          <nav className="space-y-2">
            {nav.map(([href, label]) => (
              <Link key={href} href={href} className="block rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium hover:bg-white/10">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
