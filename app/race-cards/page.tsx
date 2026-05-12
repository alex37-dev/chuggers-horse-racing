import Layout from '@/components/Layout';
import { raceCardSample, stableMeta } from '@/lib/data';

export default function RaceCardsPage() {
  return (
    <Layout>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="bg-gradient-to-br from-rose-200 via-rose-100 to-pink-200 px-8 py-6">
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-600">{raceCardSample.festival}</div>
          <div className="mt-1 font-serif text-6xl font-bold leading-none text-slate-800">{raceCardSample.race}</div>
          <div className="mt-3 text-lg font-semibold text-slate-700">Winner: 10 Pints Deep</div>
          <p className="mt-3 max-w-4xl text-slate-700">{raceCardSample.summary}</p>
        </div>
        <div className="divide-y">
          {raceCardSample.runners.map((r) => (
            <div key={r.horse} className="grid gap-4 px-6 py-5 bg-white lg:grid-cols-[80px_120px_1.3fr_220px_140px]">
              <div className="text-5xl font-black text-slate-500">{r.grade}</div>
              <div className="flex h-28 items-center justify-center rounded-3xl border bg-slate-50 px-3 text-center text-xs text-slate-500">{stableMeta[r.stable as keyof typeof stableMeta]?.jersey}</div>
              <div><div className="font-serif text-4xl font-bold leading-none text-slate-800">{r.horse}</div><div className="mt-2 text-slate-600">{r.stable}</div><div className="mt-3"><span className="rounded-full border px-3 py-1 text-sm font-semibold">Lane {r.lane}</span></div></div>
              <div className="text-slate-600 lg:pt-4">Finish: <b>{r.finish}</b></div>
              <div className="lg:pt-4 lg:text-right"><div className="text-xs font-bold uppercase tracking-wider text-slate-500">To win</div><div className="text-4xl font-black text-emerald-800">{r.winOdds}</div></div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
