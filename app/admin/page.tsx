import Layout from '@/components/Layout';

export default function AdminPage() {
  const actions = [
    ['Create festival', 'Set race count, stables, date, and name.'],
    ['Enter horse data', 'Description, colour, type, age, nationality, jockey.'],
    ['Input lanes', 'Field size is fixed once per festival, lanes go in race by race.'],
    ['Enter results', 'Record finishing order and final stable balances.'],
  ];

  return (
    <Layout>
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-4xl font-bold">Admin Control</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {actions.map(([title, text]) => <div key={title} className="rounded-2xl bg-slate-50 p-4"><div className="text-lg font-bold">{title}</div><div className="mt-2 text-slate-600">{text}</div></div>)}
        </div>
      </section>
    </Layout>
  );
}
