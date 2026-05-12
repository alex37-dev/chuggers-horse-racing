"use client";

import { useMemo, useState } from "react";
import SiteShell from "../../components/SiteShell";

const LADDER = [
  "2/7","3/10","1/3","4/11","2/5","4/9","1/2","8/15","4/7","8/13","2/3","8/11","4/5","5/6","9/10","10/11","1/1","21/20","11/10","10/9","6/5","5/4","13/10","27/20","11/8","7/5","3/2","8/5","13/8","17/10","7/4","9/5","15/8","19/10","2/1","21/10","11/5","9/4","23/10","12/5","5/2","13/5","27/10","11/4","14/5","3/1","10/3","7/2","4/1","9/2","5/1","11/2","6/1","13/2","7/1","15/2","8/1","17/2","9/1","10/1","11/1","12/1","14/1","15/1","16/1","18/1","20/1","22/1","25/1","28/1","33/1","40/1","50/1","66/1","80/1","100/1"
];

const DEC: Record<string, number> = {
  "2/7":0.29,"3/10":0.3,"1/3":0.33,"4/11":0.36,"2/5":0.4,"4/9":0.44,"1/2":0.5,"8/15":0.53,"4/7":0.57,"8/13":0.62,"2/3":0.67,"8/11":0.73,"4/5":0.8,"5/6":0.83,"9/10":0.9,"10/11":0.91,"1/1":1,"21/20":1.05,"11/10":1.1,"10/9":1.11,"6/5":1.2,"5/4":1.25,"13/10":1.3,"27/20":1.35,"11/8":1.38,"7/5":1.4,"3/2":1.5,"8/5":1.6,"13/8":1.63,"17/10":1.7,"7/4":1.75,"9/5":1.8,"15/8":1.88,"19/10":1.9,"2/1":2,"21/10":2.1,"11/5":2.2,"9/4":2.25,"23/10":2.3,"12/5":2.4,"5/2":2.5,"13/5":2.6,"27/10":2.7,"11/4":2.75,"14/5":2.8,"3/1":3,"10/3":3.33,"7/2":3.5,"4/1":4,"9/2":4.5,"5/1":5,"11/2":5.5,"6/1":6,"13/2":6.5,"7/1":7,"15/2":7.5,"8/1":8,"17/2":8.5,"9/1":9,"10/1":10,"11/1":11,"12/1":12,"14/1":14,"15/1":15,"16/1":16,"18/1":18,"20/1":20,"22/1":22,"25/1":25,"28/1":28,"33/1":33,"40/1":40,"50/1":50,"66/1":66,"80/1":80,"100/1":100
};

const CENTRAL: Record<number, Record<number, string>> = {
  1:{1:"1/1",2:"2/1",3:"3/1",4:"4/1",5:"5/1",6:"6/1",7:"5/2",8:"7/2",9:"9/2",10:"11/2",11:"7/1",12:"8/1"},
  2:{1:"2/1",2:"4/1",3:"6/1",4:"8/1",5:"10/1",6:"12/1",7:"5/1",8:"7/1",9:"9/1",10:"11/1",11:"14/1",12:"16/1"},
  3:{1:"3/1",2:"6/1",3:"9/1",4:"12/1",5:"15/1",6:"18/1",7:"8/1",8:"10/1",9:"14/1",10:"16/1",11:"22/1",12:"25/1"},
  4:{1:"4/1",2:"8/1",3:"12/1",4:"16/1",5:"20/1",6:"25/1",7:"10/1",8:"14/1",9:"18/1",10:"22/1",11:"33/1",12:"40/1"},
  5:{1:"5/1",2:"10/1",3:"15/1",4:"20/1",5:"25/1",6:"33/1",7:"12/1",8:"16/1",9:"22/1",10:"28/1",11:"40/1",12:"50/1"},
  6:{1:"6/1",2:"12/1",3:"18/1",4:"25/1",5:"33/1",6:"50/1",7:"14/1",8:"20/1",9:"28/1",10:"40/1",11:"66/1",12:"80/1"}
};

function trio(grade: number, lane: number) {
  const central = CENTRAL[grade]?.[lane];
  if (!central) return ["—", "—", "—"];
  const d = DEC[central];
  const low = LADDER.filter((x) => DEC[x] < d).slice(-1)[0] || central;
  const high = LADDER.find((x) => DEC[x] > d) || central;
  return [low, central, high];
}

function eachWayOdds(win: string) {
  const target = DEC[win] / 4;
  return LADDER.filter((x) => DEC[x] <= target).slice(-1)[0] || "1/4";
}

function placeOdds(win: string) {
  const target = Math.max(1, DEC[win] * 0.85);
  return LADDER.reduce((best, x) =>
    Math.abs(DEC[x] - target) < Math.abs(DEC[best] - target) ? x : best
  , LADDER[0]);
}

function forecastOdds(a: string, b: string) {
  return `${(a.length + b.length) % 25 + 12}/1`;
}

function tricastOdds(a: string, b: string, c: string) {
  return `${(a.length * 3 + b.length * 2 + c.length) % 140 + 45}/1`;
}

const historicFestivals = [
  {
    id: "maze",
    name: "The Maze",
    date: "21/03/2026",
    races: [
      {
        order: 1,
        name: "King's Cup",
        ground: "Good to Soft",
        runners: [
          { horse:"Alex Rides Her", stable:"Red Stable", grade:2, lane:6, jockey:"Alex Ryder", finish:"DNF" },
          { horse:"Weight Watchers", stable:"Blue Stable", grade:6, lane:4, jockey:"Dickie Rogers", finish:"1st" },
          { horse:"Hung Like a Jockey", stable:"Green Stable", grade:5, lane:1, jockey:"Kira McKinstry", finish:"DNF" },
          { horse:"Zebra", stable:"Pink Stable", grade:2, lane:5, jockey:"Stanley Addis", finish:"2nd" }
        ],
        summary: "Weight Watchers travelled powerfully throughout and put the race to bed with a sharp move after the last. Zebra stuck on gamely for second once the rest of the field began to crack under pressure."
      }
    ]
  },
  {
    id: "charleston",
    name: "Charleston Park",
    date: "11/04/2026",
    races: [
      {
        order: 1,
        name: "Lady's Plate",
        ground: "Good to Soft",
        runners: [
          { horse:"Sugar Cube", stable:"Yellow Stable", grade:6, lane:4, jockey:"Goose", finish:"3rd" },
          { horse:"10 Pints Deep", stable:"Red Stable", grade:6, lane:3, jockey:"Big P", finish:"1st" },
          { horse:"Lady Tottingham", stable:"Blue Stable", grade:4, lane:2, jockey:"Dickie Rogers", finish:"2nd" },
          { horse:"Pegasus", stable:"Green Stable", grade:3, lane:6, jockey:"Willy Flanagan", finish:"DNF" },
          { horse:"George Gallopway", stable:"Purple Stable", grade:5, lane:1, jockey:"Prince Andrew", finish:"4th" },
          { horse:"Drunk Before Dinner", stable:"White Stable", grade:4, lane:5, jockey:"Aamilah Aswat", finish:"DNF" }
        ],
        summary: "10 Pints Deep wins by a nose in a rapid sprint finish after trailing the experienced Lady Tottingham for much of the race. Favourite Pegasus falls at the first."
      }
    ]
  }
];

const newRaceTemplate = {
  name: "Belland Meadows New Race",
  date: "15/05/2026",
  ground: "Good to Soft",
  runners: [
    { horse:"Red Runner", stable:"Red Stable", grade:2, lane:4, jockey:"TBC" },
    { horse:"Yellow Runner", stable:"Yellow Stable", grade:3, lane:5, jockey:"TBC" },
    { horse:"Purple Runner", stable:"Purple Stable", grade:2, lane:2, jockey:"TBC" },
    { horse:"White Runner", stable:"White Stable", grade:1, lane:6, jockey:"TBC" },
    { horse:"Green Runner", stable:"Green Stable", grade:3, lane:1, jockey:"TBC" },
    { horse:"Blue Runner", stable:"Blue Stable", grade:4, lane:3, jockey:"TBC" }
  ]
};

function getChosenWin(grade: number, lane: number, seed: number) {
  const [low, mid, high] = trio(grade, lane);
  return [low, mid, high][seed % 3];
}

export default function RaceCardsPage() {
  const [mode, setMode] = useState<"historic" | "new">("historic");
  const [festivalId, setFestivalId] = useState("charleston");
  const [raceOrder, setRaceOrder] = useState(1);
  const [selectedHorse, setSelectedHorse] = useState("");

  const historicFestival =
    historicFestivals.find((f) => f.id === festivalId) || historicFestivals[0];

  const historicRace =
    historicFestival.races.find((r) => r.order === raceOrder) || historicFestival.races[0];

  const historicRunners = useMemo(() => {
    return historicRace.runners.map((r, i) => ({
      ...r,
      win: getChosenWin(r.grade, r.lane, i + historicRace.order)
    }));
  }, [historicRace]);

  const newRaceRunners = useMemo(() => {
    return newRaceTemplate.runners.map((r, i) => ({
      ...r,
      win: getChosenWin(r.grade, r.lane, i + 1)
    }));
  }, []);

  const activeRunners = mode === "historic" ? historicRunners : newRaceRunners;
  const selected =
    activeRunners.find((r) => r.horse === selectedHorse) || activeRunners[0];

  const sortedByPrice = [...activeRunners].sort((a, b) => DEC[a.win] - DEC[b.win]);
  const fav = sortedByPrice[0]?.horse;
  const secondFav = sortedByPrice[1]?.horse;

  const winner =
    mode === "historic"
      ? historicRunners.find((r) => r.finish === "1st")
      : null;

  const others = activeRunners.filter((r) => r.horse !== selected.horse);

  return (
    <SiteShell currentPage="Race Cards">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
            value={mode}
            onChange={(e) => setMode(e.target.value as "historic" | "new")}
          >
            <option value="historic">Historic race</option>
            <option value="new">New race</option>
          </select>

          {mode === "historic" ? (
            <>
              <select
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                value={festivalId}
                onChange={(e) => {
                  setFestivalId(e.target.value);
                  setRaceOrder(1);
                  setSelectedHorse("");
                }}
              >
                {historicFestivals.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} — {f.date}
                  </option>
                ))}
              </select>

              <select
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                value={raceOrder}
                onChange={(e) => {
                  setRaceOrder(Number(e.target.value));
                  setSelectedHorse("");
                }}
              >
                {historicFestival.races.map((r) => (
                  <option key={r.order} value={r.order}>
                    {r.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                Belland Meadows
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                New race card
              </div>
            </>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="bg-gradient-to-br from-rose-200 via-rose-100 to-pink-200 px-8 py-6">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-600">
              {mode === "historic" ? "Historic race card" : "New race card"}
            </div>
            <div className="mt-1 font-serif text-5xl font-bold text-slate-800">
              {mode === "historic" ? historicRace.name : newRaceTemplate.name}
            </div>
            <div className="mt-3 text-lg font-semibold text-slate-700">
              {mode === "historic"
                ? `${historicFestival.name}, ${historicFestival.date} · ${historicRace.ground} · ${historicRunners.length} runners`
                : `${newRaceTemplate.date} · ${newRaceTemplate.ground} · ${newRaceRunners.length} runners`}
            </div>
          </div>

          {mode === "historic" && winner ? (
            <div className="grid gap-4 border-b bg-amber-50 px-6 py-5 md:grid-cols-[180px_1fr_220px]">
              <div className="flex h-36 items-center justify-center rounded-2xl bg-white text-6xl">
                🐎
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Race summary
                </div>
                <div className="mt-1 text-4xl font-bold">Winner: {winner.horse}</div>
                <p className="mt-3 max-w-4xl text-slate-700">{historicRace.summary}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm text-slate-500">Winning odds</div>
                <div className="mt-2 text-4xl font-black">{winner.win}</div>
              </div>
            </div>
          ) : null}

          <div className="divide-y">
            {activeRunners.map((r) => (
              <button
                key={r.horse}
                type="button"
                onClick={() => setSelectedHorse(r.horse)}
                className={`grid w-full gap-4 px-6 py-5 text-left transition hover:bg-emerald-50 lg:grid-cols-[80px_1.2fr_220px_150px] ${
                  selected.horse === r.horse ? "bg-emerald-50" : "bg-white"
                }`}
              >
                <div className="text-5xl font-black text-slate-500">{r.grade}</div>

                <div>
                  <div className="font-serif text-3xl font-bold text-slate-800">{r.horse}</div>
                  <div className="mt-2 text-slate-600">
                    {r.stable} · Lane {r.lane} · J: {r.jockey}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {fav === r.horse ? (
                      <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-900">
                        FAV
                      </span>
                    ) : null}
                    {secondFav === r.horse ? (
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-900">
                        2FAV
                      </span>
                    ) : null}
                    {mode === "historic" && "finish" in r ? (
                      <span className="rounded-full border px-3 py-1 text-xs font-semibold">
                        {r.finish}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="lg:pt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Win odds
                  </div>
                  <div className="text-4xl font-black text-emerald-800">{r.win}</div>
                </div>

                <div className="lg:pt-3 text-sm text-slate-600">
                  <div>E/W: {eachWayOdds(r.win)}</div>
                  <div>Place: {placeOdds(r.win)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">Selected horse markets</h2>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="text-slate-500">Horse</div>
              <div className="mt-2 text-3xl font-bold">
                {selected.horse}
                <span className="ml-2 rounded-full bg-amber-100 px-3 py-1 text-base align-middle">
                  Win {selected.win}
                </span>
              </div>
              <div className="mt-2 text-slate-600">
                {selected.stable} · Grade {selected.grade} · Lane {selected.lane}
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Each Way
                </div>
                <div className="mt-2 text-4xl font-black">{eachWayOdds(selected.win)}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Place
                </div>
                <div className="mt-2 text-4xl font-black">{placeOdds(selected.win)}</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Forecast
                </div>
                <div className="mt-2 text-4xl font-black">
                  {others[0] ? forecastOdds(selected.horse, others[0].horse) : "—"}
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  1st {selected.horse} · 2nd {others[0]?.horse || "—"}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tricast
                </div>
                <div className="mt-2 text-4xl font-black">
                  {others[1] ? tricastOdds(selected.horse, others[0].horse, others[1].horse) : "—"}
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  1st {selected.horse} · 2nd {others[0]?.horse || "—"} · 3rd {others[1]?.horse || "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">What this restores</h2>
            <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
              Historic race cards now show real stored runners and summaries. New race cards now generate odds automatically from grade + lane.
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
