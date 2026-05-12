import Layout from '@/components/Layout';
import { festivals, standings } from '@/lib/data';

export default function HomePage() {
  return (
    <Layout>
      <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-700 p-10 text-white shadow-xl">
        <div className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Real website base</div>
        <h1 className="mt-4 text-6xl font-bold leading-tight">Chuggers Racing League</h1>
        <p className="mt-4 max-w-4xl text-xl text-emerald-50/90">This is the deployable website base for the league. It is ready to go into GitHub, connect to Vercel, and later connect fully to Supabase for real users and data.</p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold">2026 Championship Standings</h2>
          <table className="mt-4 w-full text-left">
            <thead><tr className="border-b text-sm uppercase tracking-wider text-slate-500"><th className="py-3">Stable</th><th>Owner</th><th>Pts</th><th>Festival wins</th><th>Race wins</th></tr></thead>
            <tbody>
              {standings.map((s) => (
                <tr key={s.stable} className="border-b last:border-b-0"><td className="py-3 font-semibold">{s.stable}</td><td>{s.owner}</td><td>{s.points}</td><td>{s.festivalWins}</td><td>{s.raceWins}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold">Festivals</h2>
          <div className="mt-4 space-y-4">
            {festivals.map((f) => (
              <div key={f.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xl font-bold">{f.name}</div>
                <div className="text-slate-600">{f.date} · {f.races} races · {f.stables} stables</div>
                <div className="mt-2 font-semibold">{f.winner === 'Upcoming' ? 'Upcoming' : `Winner: ${f.winner}`}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
