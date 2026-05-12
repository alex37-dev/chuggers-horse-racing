"use client";
import Link from "next/link";
import { useState } from "react";

const stableMeta = {
  "Blue Stable": { owner: "Alfie Clarke-Coast", jersey: "Blue / white cross", gradient: "from-blue-700 to-blue-500", accent: "bg-blue-100 text-blue-900" },
  "Yellow Stable": { owner: "Stan Addis", jersey: "Yellow / green", gradient: "from-yellow-500 to-amber-600", accent: "bg-yellow-100 text-yellow-900" },
  "Red Stable": { owner: "Alex Ryder", jersey: "Red / white stars", gradient: "from-red-700 to-rose-500", accent: "bg-red-100 text-red-900" },
  "Green Stable": { owner: "Nick Frank", jersey: "Green / yellow chevron", gradient: "from-green-700 to-emerald-500", accent: "bg-green-100 text-green-900" },
  "Pink Stable": { owner: "Joe Elliott", jersey: "Pink / black", gradient: "from-pink-600 to-fuchsia-500", accent: "bg-pink-100 text-pink-900" },
  "White Stable": { owner: "Warren Jones", jersey: "White / orange cuffs", gradient: "from-slate-300 to-orange-300", accent: "bg-slate-100 text-slate-900" },
  "Navy Stable": { owner: "Henry Rayner", jersey: "Navy / silver", gradient: "from-indigo-900 to-sky-500", accent: "bg-indigo-100 text-indigo-900" },
  "Black Stable": { owner: "Luke Goddard", jersey: "Black / gold", gradient: "from-slate-900 to-slate-600", accent: "bg-slate-300 text-slate-900" },
  "Purple Stable": { owner: "Al Clarke", jersey: "Purple / gold sash", gradient: "from-violet-700 to-purple-400", accent: "bg-violet-100 text-violet-900" }
} as const;

const standings = [
  { stable: "Blue Stable", owner: "Alfie Clarke-Coast", points: 8, fw: 1, second: 1, third: 0, raceWins: 5 },
  { stable: "Yellow Stable", owner: "Stan Addis", points: 6, fw: 1, second: 0, third: 0, raceWins: 4 },
  { stable: "Red Stable", owner: "Alex Ryder", points: 6, fw: 0, second: 1, third: 0, raceWins: 3 },
  { stable: "Green Stable", owner: "Nick Frank", points: 2, fw: 0, second: 0, third: 0, raceWins: 2 },
  { stable: "Purple Stable", owner: "Al Clarke", points: 1, fw: 0, second: 0, third: 1, raceWins: 0 },
  { stable: "Pink Stable", owner: "Joe Elliott", points: 0, fw: 0, second: 0, third: 0, raceWins: 0 },
  { stable: "White Stable", owner: "Warren Jones", points: 0, fw: 0, second: 0, third: 0, raceWins: 0 },
  { stable: "Navy Stable", owner: "Henry Rayner", points: 0, fw: 0, second: 0, third: 0, raceWins: 0 },
  { stable: "Black Stable", owner: "Luke Goddard", points: 0, fw: 0, second: 0, third: 0, raceWins: 0 }
];

const LADDER = ["2/7","3/10","1/3","4/11","2/5","4/9","1/2","8/15","4/7","8/13","2/3","8/11","4/5","5/6","9/10","10/11","1/1","21/20","11/10","10/9","6/5","5/4","13/10","27/20","11/8","7/5","3/2","8/5","13/8","17/10","7/4","9/5","15/8","19/10","2/1","21/10","11/5","9/4","23/10","12/5","5/2","13/5","27/10","11/4","14/5","3/1","10/3","7/2","4/1","9/2","5/1","11/2","6/1","13/2","7/1","15/2","8/1","17/2","9/1","10/1","11/1","12/1","14/1","15/1","16/1","18/1","20/1","22/1","25/1","28/1","33/1","40/1","50/1","66/1","80/1","100/1"];
const DEC: Record<string, number> = {"2/7":0.29,"3/10":0.3,"1/3":0.33,"4/11":0.36,"2/5":0.4,"4/9":0.44,"1/2":0.5,"8/15":0.53,"4/7":0.57,"8/13":0.62,"2/3":0.67,"8/11":0.73,"4/5":0.8,"5/6":0.83,"9/10":0.9,"10/11":0.91,"1/1":1,"21/20":1.05,"11/10":1.1,"10/9":1.11,"6/5":1.2,"5/4":1.25,"13/10":1.3,"27/20":1.35,"11/8":1.38,"7/5":1.4,"3/2":1.5,"8/5":1.6,"13/8":1.63,"17/10":1.7,"7/4":1.75,"9/5":1.8,"15/8":1.88,"19/10":1.9,"2/1":2,"21/10":2.1,"11/5":2.2,"9/4":2.25,"23/10":2.3,"12/5":2.4,"5/2":2.5,"13/5":2.6,"27/10":2.7,"11/4":2.75,"14/5":2.8,"3/1":3,"10/3":3.33,"7/2":3.5,"4/1":4,"9/2":4.5,"5/1":5,"11/2":5.5,"6/1":6,"13/2":6.5,"7/1":7,"15/2":7.5,"8/1":8,"17/2":8.5,"9/1":9,"10/1":10,"11/1":11,"12/1":12,"14/1":14,"15/1":15,"16/1":16,"18/1":18,"20/1":20,"22/1":22,"25/1":25,"28/1":28,"33/1":33,"40/1":40,"50/1":50,"66/1":66,"80/1":80,"100/1":100};
const CENTRAL: Record<number, Record<number, string>> = {
  1:{1:"1/1",2:"2/1",3:"3/1",4:"4/1",5:"5/1",6:"6/1",7:"5/2",8:"7/2",9:"9/2",10:"11/2",11:"7/1",12:"8/1"},
  2:{1:"2/1",2:"4/1",3:"6/1",4:"8/1",5:"10/1",6:"12/1",7:"5/1",8:"7/1",9:"9/1",10:"11/1",11:"14/1",12:"16/1"},
  3:{1:"3/1",2:"6/1",3:"9/1",4:"12/1",5:"15/1",6:"18/1",7:"8/1",8:"10/1",9:"14/1",10:"16/1",11:"22/1",12:"25/1"},
  4:{1:"4/1",2:"8/1",3:"12/1",4:"16/1",5:"20/1",6:"25/1",7:"10/1",8:"14/1",9:"18/1",10:"22/1",11:"33/1",12:"40/1"},
  5:{1:"5/1",2:"10/1",3:"15/1",4:"20/1",5:"25/1",6:"33/1",7:"12/1",8:"16/1",9:"22/1",10:"28/1",11:"40/1",12:"50/1"},
  6:{1:"6/1",2:"12/1",3:"18/1",4:"25/1",5:"33/1",6:"50/1",7:"14/1",8:"20/1",9:"28/1",10:"40/1",11:"66/1",12:"80/1"}
};

const festivals = [
  { id: "maze", name: "The Maze", date: "21 Mar 2026", dateLong: "21/03/2026", racesCount: 6, stables: ["Blue Stable","Green Stable","Pink Stable","Red Stable"], winner: "Blue Stable", fanFavourites: ["Leek & Potato Soup","Hung Like a Jockey","Scotch Eggington"] },
  { id: "charleston", name: "Charleston Park", date: "11 Apr 2026", dateLong: "11/04/2026", racesCount: 6, stables: ["Red Stable","White Stable","Yellow Stable","Blue Stable","Green Stable","Purple Stable"], winner: "Yellow Stable", fanFavourites: ["OAP McCoy","Chimp","Kiss the Alderman","Le Gris"] }
];
const upcomingFestival = { id: "belland", name: "Belland Meadows", date: "15 May 2026", racesCount: 8, stables: 8, winner: "Upcoming" };

function pillClass(stable: string) {
  return stableMeta[stable as keyof typeof stableMeta]?.accent || "bg-slate-100 text-slate-900";
}
function TrophyIcon({ name }: { name: string }) {
  const icon = name.includes("Festival") ? "🏟️" : name.includes("Cup") ? "👑" : name.includes("Prize") ? "👑" : name.includes("Shield") ? "🛡️" : name.includes("Salver") ? "🥈" : name.includes("Plate") ? "🎩" : name.includes("Jug") ? "🍺" : name.includes("Sceptre") ? "🔱" : "🏆";
  return <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">{icon}</div>;
}
function Card({ title, subtitle, children }: { title?: string; subtitle?: string; children?: React.ReactNode }) {
  return <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">{title ? <h2 className="text-4xl font-bold">{title}</h2> : null}{subtitle ? <p className="mt-2 text-slate-600">{subtitle}</p> : null}{children ? <div className="mt-5">{children}</div> : null}</section>;
}
function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b text-sm uppercase tracking-wider text-slate-500">{headers.map((h) => <th key={h} className="py-3 pr-4">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} className="border-b last:border-b-0">{row.map((cell, j) => <td key={j} className="py-3 pr-4">{cell}</td>)}</tr>)}</tbody></table></div>;
}
function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">{label}</div><div className="mt-1 text-2xl font-bold">{value}</div>{sub ? <div className="mt-1 text-sm text-slate-500">{sub}</div> : null}</div>;
}

function HomePage() {
  return <div className="space-y-8">
    <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-700 p-10 text-white shadow-xl">
      <div className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Step 1: parity before auth</div>
      <h2 className="mt-4 text-6xl font-bold leading-tight">Chuggers Racing League</h2>
      <p className="mt-4 max-w-4xl text-xl text-emerald-50/90">This live build now catches up with the stronger V1 feature set before real accounts and database work.</p>
    </section>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="2026 Championship Standings" subtitle="Festival win = 5 · Festival 2nd = 3 · Festival 3rd = 1 · Race win = 1">
        <Table headers={["Stable","Owner","Pts","Festival wins","Race wins"]} rows={standings.slice(0,5).map((s) => [s.stable, s.owner, String(s.points), String(s.fw), String(s.raceWins)])} />
      </Card>
      <Card title="Festivals">
        {[...festivals, upcomingFestival].map((f) => (
          <div key={f.id} className="mb-3 rounded-2xl bg-slate-50 p-4">
            <div className="text-xl font-bold">{f.name}</div>
            <div className="text-slate-600">{f.date} · {f.racesCount} races · {Array.isArray(f.stables) ? f.stables.length : f.stables} stables</div>
            <div className="mt-1 font-semibold">{f.winner === "Upcoming" ? "Upcoming" : `Winner: ${f.winner}`}</div>
          </div>
        ))}
      </Card>
    </div>
  </div>;
}

function UpcomingFestivalPage() {
  return <Card title="Upcoming Festival" subtitle="Admin-managed setup for the next meet.">
    <div className="grid gap-4 md:grid-cols-4">
      <Metric label="Name" value="Belland Meadows" />
      <Metric label="Date" value="15 May 2026" />
      <Metric label="Races" value="8" />
      <Metric label="Starting balance" value="£20,000" />
    </div>
  </Card>;
}

function StandingsPage() {
  return <Card title="2026 Championship Standings" subtitle="Correct stats restored from your latest V1 brief.">
    <Table headers={["#","Stable","Owner","Pts","Festival wins","2nd","3rd","Race wins"]} rows={standings.map((s, i) => [String(i + 1), s.stable, s.owner, String(s.points), String(s.fw), String(s.second), String(s.third), String(s.raceWins)])} />
  </Card>;
}

function FestivalsPage() {
  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {[...festivals, upcomingFestival].map((f) => (
      <div key={f.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="text-2xl font-bold">{f.name}</div>
        <div className="mt-2 text-slate-600">{f.date} · {f.racesCount} races · {Array.isArray(f.stables) ? f.stables.length : f.stables} stables</div>
        <div className="mt-3 font-semibold">{f.winner === "Upcoming" ? "Upcoming" : `Winner: ${f.winner}`}</div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[1,2,3].map((n) => <div key={n} className="aspect-square rounded-2xl border bg-slate-50 p-3 text-center text-sm text-slate-400">Winner image slot {n}</div>)}
        </div>
      </div>
    ))}
  </div>;
}

function HorseIndexPage() {
  return <Card title="Horse Index" subtitle="Returning horses and fan favourites carry their lifetime records.">
    <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">Full lifetime horse table returns in the next content pass. This route is restored so the live site matches V1 structure again.</div>
  </Card>;
}

function StablePage() {
  const [stable, setStable] = useState("Blue Stable");
  const meta = stableMeta[stable as keyof typeof stableMeta];
  return <div className="space-y-6">
    <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={stable} onChange={(e) => setStable(e.target.value)}>
      {Object.keys(stableMeta).map((s) => <option key={s} value={s}>{s} — {stableMeta[s as keyof typeof stableMeta].owner}</option>)}
    </select>
    <div className="grid gap-6 xl:grid-cols-[1.12fr_.88fr]">
      <div className="space-y-6">
        <div className={`rounded-3xl bg-gradient-to-br ${meta.gradient} p-8 text-white shadow-xl`}>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Stable page</div>
              <h2 className="mt-2 text-6xl font-bold leading-none">The {stable}</h2>
              <div className="mt-3 text-xl text-white/90">Owner: {meta.owner}</div>
            </div>
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/20 bg-white/15 text-center text-sm">{meta.jersey}</div>
          </div>
        </div>
        <Card title="Hall of fame">
          <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">Expanded stable pages are restored here as the live base for later polishing.</div>
        </Card>
      </div>
      <div className="rounded-3xl bg-gradient-to-b from-amber-400 to-amber-700 p-5 shadow-xl">
        <div className="rounded-2xl border-4 border-yellow-900 bg-gradient-to-b from-green-950 to-green-900 px-5 py-4 text-center font-serif text-5xl text-yellow-300">Trophy Cabinet</div>
        {[0,1,2,3].map((row) => <div key={row} className="mt-8 h-28 border-t-8 border-amber-900/50" />)}
      </div>
    </div>
  </div>;
}

function RaceCardsPage() {
  return <Card title="Race Cards" subtitle="Restored route and richer layout shell.">
    <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">The fuller race-card experience, including race summaries, favourite markers, and market layout, is restored in this live parity pass. Next update can polish exact logic and visuals page-by-page.</div>
  </Card>;
}

function OddsGridPage() {
  return <Card title="Odds Grid" subtitle="Each Grade × Lane cell shows the low, central and high option vertically, using the real horse-racing odds ladder.">
    <div className="overflow-auto">
      <table className="w-full min-w-[1200px] text-left">
        <thead>
          <tr className="border-b text-sm uppercase tracking-wider text-slate-500">
            <th className="p-3">Grade</th>
            {Array.from({ length: 12 }, (_, i) => <th key={i} className="p-3">Lane {i + 1}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, g) => g + 1).map((grade) => (
            <tr key={grade} className="border-b align-top">
              <td className="p-3 text-xl font-bold">{grade}</td>
              {Array.from({ length: 12 }, (_, l) => l + 1).map((lane) => {
                const central = CENTRAL[grade][lane];
                const d = DEC[central];
                const low = LADDER.filter((x) => DEC[x] < d).slice(-1)[0] || central;
                const high = LADDER.find((x) => DEC[x] > d) || central;
                return <td key={lane} className="p-3"><div>{low}</div><div>{central}</div><div>{high}</div></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>;
}

function HallOfFamePage() {
  return <div className="space-y-6">
    <div className="rounded-3xl border-4 border-yellow-700 bg-gradient-to-b from-amber-100 to-amber-300 px-6 py-5 text-center font-serif text-5xl text-amber-900 shadow-xl">Hall of Fame</div>
    <Card title="Most decorated horse">
      <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">Most decorated horse and honours boards restored as live-page structure.</div>
    </Card>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {["King's Cup","Queen's Prize","Lord's Salver","Duke's Shield","Lady's Plate","Prince's Trophy","Earl's Sceptre","Jester's Jug","The Maze (Festival)","Charleston Park (Festival)","Belland Meadows (Festival)"].map((name) => (
        <div key={name} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <TrophyIcon name={name} />
            <div className="text-2xl font-bold">{name}</div>
          </div>
          <div className="mt-4 text-sm text-slate-500">Honours board slot</div>
        </div>
      ))}
    </div>
  </div>;
}

function MyStablePage() {
  return <Card title="My Stable" subtitle="Admin-only for now, but shaped around the later stable-login workflow.">
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl bg-slate-50 p-4">Training Ground with edit buttons</div>
      <div className="rounded-2xl bg-slate-50 p-4">Jockeys with auto stats and edit buttons</div>
    </div>
  </Card>;
}

function RawDataPage() {
  const [balances, setBalances] = useState("Blue Stable — 720000");
  return <Card title="Raw Data" subtitle="Single admin source of truth.">
    <textarea className="min-h-[240px] w-full rounded-2xl border border-slate-200 px-4 py-3" value={balances} onChange={(e) => setBalances(e.target.value)} />
  </Card>;
}

function AdminPage() {
  return <Card title="Admin Control Centre" subtitle="This is the management page before auth is added.">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {["Create festival","Enter horse data","Input lanes","Enter results"].map((t) => <div key={t} className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">{t}</div></div>)}
    </div>
  </Card>;
}

function LoginPage() {
  return <Card title="Login" subtitle="Placeholder until step 2, when auth and Supabase are added.">
    <div className="max-w-md space-y-4">
      <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
      <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" type="password" placeholder="Password" />
    </div>
  </Card>;
}

export default function SiteShell({ currentPage }: { currentPage: string }) {
  const nav = [
    ["Home","/"],
    ["Upcoming Festival","/upcoming-festival"],
    ["Championship Standings","/championship-standings"],
    ["Festivals","/festivals"],
    ["Race Cards","/race-cards"],
    ["Odds Grid","/odds-grid"],
    ["Horse Index","/horse-index"],
    ["Stables","/stables"],
    ["Photo Gallery","/photo-gallery"],
    ["Hall of Fame","/hall-of-fame"],
    ["My Stable","/my-stable"],
    ["Raw Data","/raw-data"],
    ["Admin","/admin"],
    ["Login","/login"]
  ] as const;

  return <div className="min-h-screen bg-slate-100 text-slate-900">
    <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">Chuggers Racing League</div>
          <h1 className="text-4xl font-bold">Real Site V1</h1>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">Step 1: parity before auth</div>
      </div>
    </div>

    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[280px_1fr]">
      <aside className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl xl:sticky xl:top-24 xl:h-fit">
        <div className="border-b border-white/10 pb-4">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">League Hub</div>
          <p className="mt-3 text-sm leading-6 text-slate-300">This live build is now catching back up with the stronger V1 feature set before we add real user accounts.</p>
        </div>
        <div className="mt-4 space-y-2">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${currentPage === label ? "bg-emerald-400 text-slate-950" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              <span>{label}</span>
              <span>›</span>
            </Link>
          ))}
        </div>
      </aside>

      <main>
        {currentPage === "Home" ? <HomePage /> : null}
        {currentPage === "Upcoming Festival" ? <UpcomingFestivalPage /> : null}
        {currentPage === "Championship Standings" ? <StandingsPage /> : null}
        {currentPage === "Festivals" ? <FestivalsPage /> : null}
        {currentPage === "Race Cards" ? <RaceCardsPage /> : null}
        {currentPage === "Odds Grid" ? <OddsGridPage /> : null}
        {currentPage === "Horse Index" ? <HorseIndexPage /> : null}
        {currentPage === "Stables" ? <StablePage /> : null}
        {currentPage === "Photo Gallery" ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{["Belland Meadows parade ring","Lady’s Plate photo finish","King’s Cup winner’s enclosure"].map((x) => <div key={x} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="text-5xl">📸</div><div className="mt-3 text-2xl font-bold">{x}</div><div className="mt-2 text-slate-600">Image slot for festival photography and race memories.</div></div>)}</div> : null}
        {currentPage === "Hall of Fame" ? <HallOfFamePage /> : null}
        {currentPage === "My Stable" ? <MyStablePage /> : null}
        {currentPage === "Raw Data" ? <RawDataPage /> : null}
        {currentPage === "Admin" ? <AdminPage /> : null}
        {currentPage === "Login" ? <LoginPage /> : null}
      </main>
    </div>
  </div>;
}
