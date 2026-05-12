import Layout from '@/components/Layout';
import { festivals } from '@/lib/data';

export default function FestivalsPage() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold">Festivals</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {festivals.map((f) => (
          <div key={f.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="text-2xl font-bold">{f.name}</div>
            <div className="mt-1 text-slate-600">{f.date} · {f.races} races · {f.stables} stables</div>
            <div className="mt-3 font-semibold">{f.winner === 'Upcoming' ? 'Upcoming' : `Winner: ${f.winner}`}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {f.fanFavourites.map((x) => <span key={x} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{x}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
