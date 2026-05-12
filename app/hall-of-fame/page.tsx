import Layout from '@/components/Layout';

export default function HallOfFamePage() {
  const boards = [
    ["King's Cup", 'Weight Watchers — Blue Stable — 21/03/2026', 'War Horse — Yellow Stable — 11/04/2026'],
    ["Queen's Prize", 'The Bishop of Norwich — Blue Stable — 21/03/2026', 'Blitzkrieg — Yellow Stable — 11/04/2026'],
    ["Lord's Salver", 'Long Face Larry — Red Stable — 21/03/2026', 'The Bishop of Norwich — Blue Stable — 11/04/2026'],
    ["Duke's Shield", 'B-I-N-G-O — Blue Stable — 21/03/2026', 'The GOAT is a Horse — Yellow Stable — 11/04/2026'],
    ["Lady's Plate", 'Five Legs — Red Stable — 21/03/2026', '10 Pints Deep — Red Stable — 11/04/2026'],
    ["Prince's Trophy", 'Squire — Blue Stable — 21/03/2026', 'Sturm und Drang — Green Stable — 11/04/2026'],
  ];
  return (
    <Layout>
      <div className="rounded-3xl border-4 border-yellow-700 bg-gradient-to-b from-amber-100 to-amber-300 px-6 py-5 text-center font-serif text-5xl text-amber-900 shadow-xl">Hall of Fame</div>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {boards.map(([title, one, two]) => (
          <div key={title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className="text-2xl font-bold">{title}</div><div className="mt-4 space-y-3 text-sm"><div>{one}</div><div>{two}</div></div></div>
        ))}
      </div>
    </Layout>
  );
}
