import Layout from '@/components/Layout';
import { stableMeta } from '@/lib/data';

export default function StablesPage() {
  const stables = Object.entries(stableMeta);
  return (
    <Layout>
      <h1 className="text-4xl font-bold">Stables</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stables.map(([name, meta]) => (
          <div key={name} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="text-2xl font-bold">{name}</div>
            <div className="mt-1 text-slate-600">Owner: {meta.owner}</div>
            <div className="mt-2 text-slate-600">Jersey: {meta.jersey}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
