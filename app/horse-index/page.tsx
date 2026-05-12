import Layout from '@/components/Layout';
import { horseIndex } from '@/lib/data';

export default function HorseIndexPage() {
  return (
    <Layout>
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-4xl font-bold">Horse Index</h1>
        <table className="mt-4 w-full text-left">
          <thead><tr className="border-b text-sm uppercase tracking-wider text-slate-500"><th className="py-3">Horse</th><th>Stable</th><th>Starts</th><th>Wins</th><th>2nds</th><th>3rds</th><th>Tags</th></tr></thead>
          <tbody>
            {horseIndex.map((h) => <tr key={h.horse} className="border-b last:border-b-0"><td className="py-3 font-semibold">{h.horse}</td><td>{h.stable}</td><td>{h.starts}</td><td>{h.wins}</td><td>{h.seconds}</td><td>{h.thirds}</td><td>{h.tags}</td></tr>)}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
