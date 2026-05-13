"use client";

import { useMemo, useState } from "react";
import SiteShell from "../../components/SiteShell";

type Finish = "1st" | "2nd" | "3rd" | "4th" | "5th" | "DNF";
type RaceName =
  | "Duke's Shield"
  | "Lady's Plate"
  | "King's Cup"
  | "Earl's Sceptre"
  | "Queen's Prize"
  | "Lord's Salver"
  | "Jester's Jug"
  | "Prince's Trophy";

type HorseType = "Horse" | "Mare" | "Colt" | "Filly" | "Gelding";
type Colour = "white" | "brown" | "black" | "grey" | "chestnut" | "roan";

type HistoricRunner = {
  horse: string;
  stable: string;
  owner: string;
  nationality: string;
  age: number;
  type: HorseType;
  colour: Colour;
  description: string;
  jockey: string;
  grade: number;
  lane: number;
  finish: Finish;
};

type UpcomingRunner = Omit<HistoricRunner, "finish">;

type DisplayRunner = UpcomingRunner & { win: string; finish?: Finish };

type HistoricRace = {
  order: number;
  name: RaceName;
  ground: string;
  length: string;
  classLabel: string;
  summary: string;
  runners: HistoricRunner[];
};

type HistoricFestival = {
  id: string;
  name: string;
  date: string;
  races: HistoricRace[];
};

type UpcomingRace = {
  order: number;
  name: RaceName;
  ground: string;
  length: string;
  classLabel: string;
  runners: UpcomingRunner[];
};

const LADDER = [
  "2/7","3/10","1/3","4/11","2/5","4/9","1/2","8/15","4/7","8/13","2/3","8/11","4/5","5/6","9/10","10/11","1/1","21/20","11/10","10/9","6/5","5/4","13/10","27/20","11/8","7/5","3/2","8/5","13/8","17/10","7/4","9/5","15/8","19/10","2/1","21/10","11/5","9/4","23/10","12/5","5/2","13/5","27/10","11/4","14/5","3/1","10/3","7/2","4/1","9/2","5/1","11/2","6/1","13/2","7/1","15/2","8/1","17/2","9/1","10/1","11/1","12/1","14/1","15/1","16/1","18/1","20/1","22/1","25/1","28/1","33/1","40/1","50/1","66/1","80/1","100/1",
] as const;

const DEC: Record<string, number> = {
  "2/7":0.29,"3/10":0.3,"1/3":0.33,"4/11":0.36,"2/5":0.4,"4/9":0.44,"1/2":0.5,"8/15":0.53,"4/7":0.57,"8/13":0.62,"2/3":0.67,"8/11":0.73,"4/5":0.8,"5/6":0.83,"9/10":0.9,"10/11":0.91,"1/1":1,"21/20":1.05,"11/10":1.1,"10/9":1.11,"6/5":1.2,"5/4":1.25,"13/10":1.3,"27/20":1.35,"11/8":1.38,"7/5":1.4,"3/2":1.5,"8/5":1.6,"13/8":1.63,"17/10":1.7,"7/4":1.75,"9/5":1.8,"15/8":1.88,"19/10":1.9,"2/1":2,"21/10":2.1,"11/5":2.2,"9/4":2.25,"23/10":2.3,"12/5":2.4,"5/2":2.5,"13/5":2.6,"27/10":2.7,"11/4":2.75,"14/5":2.8,"3/1":3,"10/3":3.33,"7/2":3.5,"4/1":4,"9/2":4.5,"5/1":5,"11/2":5.5,"6/1":6,"13/2":6.5,"7/1":7,"15/2":7.5,"8/1":8,"17/2":8.5,"9/1":9,"10/1":10,"11/1":11,"12/1":12,"14/1":14,"15/1":15,"16/1":16,"18/1":18,"20/1":20,"22/1":22,"25/1":25,"28/1":28,"33/1":33,"40/1":40,"50/1":50,"66/1":66,"80/1":80,"100/1":100,
};

const CENTRAL: Record<number, Record<number, string>> = {
  1:{1:"1/1",2:"2/1",3:"3/1",4:"4/1",5:"5/1",6:"6/1",7:"5/2",8:"7/2",9:"9/2",10:"11/2",11:"7/1",12:"8/1"},
  2:{1:"2/1",2:"4/1",3:"6/1",4:"8/1",5:"10/1",6:"12/1",7:"5/1",8:"7/1",9:"9/1",10:"11/1",11:"14/1",12:"16/1"},
  3:{1:"3/1",2:"6/1",3:"9/1",4:"12/1",5:"15/1",6:"18/1",7:"8/1",8:"10/1",9:"14/1",10:"16/1",11:"22/1",12:"25/1"},
  4:{1:"4/1",2:"8/1",3:"12/1",4:"16/1",5:"20/1",6:"25/1",7:"10/1",8:"14/1",9:"18/1",10:"22/1",11:"33/1",12:"40/1"},
  5:{1:"5/1",2:"10/1",3:"15/1",4:"20/1",5:"25/1",6:"33/1",7:"12/1",8:"16/1",9:"22/1",10:"28/1",11:"40/1",12:"50/1"},
  6:{1:"6/1",2:"12/1",3:"18/1",4:"25/1",5:"33/1",6:"50/1",7:"14/1",8:"20/1",9:"28/1",10:"40/1",11:"66/1",12:"80/1"},
};

const RACE_META: Record<RaceName, { prize: [string, string, string]; classLabel: string; length: string; header: string }> = {
  "King's Cup": { prize: ["£250,000", "£100,000", "£50,000"], classLabel: "Class 1", length: "3m2f", header: "from-blue-100 via-sky-100 to-indigo-100" },
  "Queen's Prize": { prize: ["£150,000", "£90,000", "£45,000"], classLabel: "Class 2", length: "2m6f", header: "from-rose-100 via-pink-100 to-fuchsia-100" },
  "Prince's Trophy": { prize: ["£125,000", "£75,000", "£40,000"], classLabel: "Class 3", length: "2m4f", header: "from-cyan-100 via-sky-100 to-blue-100" },
  "Earl's Sceptre": { prize: ["£100,000", "£60,000", "£25,000"], classLabel: "Class 4", length: "2m2f", header: "from-emerald-100 via-green-100 to-teal-100" },
  "Duke's Shield": { prize: ["£75,000", "£40,000", "£20,000"], classLabel: "Class 5", length: "2m", header: "from-amber-100 via-yellow-100 to-orange-100" },
  "Lord's Salver": { prize: ["£50,000", "£20,000", "£10,000"], classLabel: "Class 6", length: "1m7f", header: "from-slate-100 via-zinc-100 to-stone-100" },
  "Lady's Plate": { prize: ["£30,000", "£15,000", "£10,000"], classLabel: "Class 7", length: "1m3f", header: "from-purple-100 via-violet-100 to-fuchsia-100" },
  "Jester's Jug": { prize: ["£20,000", "£10,000", "£5,000"], classLabel: "Class 8", length: "1m2f", header: "from-orange-100 via-amber-100 to-rose-100" },
};

const OWNER_BY_STABLE: Record<string, string> = {
  "Yellow Stable": "Stan Addis",
  "Blue Stable": "Alfie Clarke-Coast",
  "Red Stable": "Alex Ryder",
  "Green Stable": "Nick Frank",
  "Pink Stable": "Joe Elliott",
  "White Stable": "Warren Jones",
  "Navy Stable": "Henry Rayner",
  "Black Stable": "Luke Goddard",
  "Purple Stable": "Al Clarke",
};

function trio(grade: number, lane: number): [string, string, string] {
  const central = CENTRAL[grade]?.[lane];
  if (!central) return ["—", "—", "—"];
  const d = DEC[central];
  const low = [...LADDER].filter((x) => DEC[x] < d).slice(-1)[0] || central;
  const high = [...LADDER].find((x) => DEC[x] > d) || central;
  return [low, central, high];
}

function chooseWin(grade: number, lane: number, seed: number): string {
  const options = trio(grade, lane);
  return options[seed % 3];
}

function eachWayOdds(win: string): string {
  const target = DEC[win] / 4;
  return [...LADDER].filter((x) => DEC[x] <= target).slice(-1)[0] || "1/4";
}

function placeOdds(win: string): string {
  const target = Math.max(1, DEC[win] * 0.85);
  return [...LADDER].reduce((best, x) => (Math.abs(DEC[x] - target) < Math.abs(DEC[best] - target) ? x : best), LADDER[0]);
}


function forecastOdds(a: string, b: string): string {
  return `${(a.length + b.length) % 25 + 12}/1`;
}

function tricastOdds(a: string, b: string, c: string): string {
  return `${(a.length * 3 + b.length * 2 + c.length) % 140 + 45}/1`;
}

function flagEmoji(nationality: string): string {
  const flags: Record<string, string> = {
    English: "🇬🇧", Irish: "🇮🇪", Scottish: "🏴", Welsh: "🏴", NorthernIrish: "🇬🇧", "Northern Irish": "🇬🇧",
    French: "🇫🇷", German: "🇩🇪", Greek: "🇬🇷", Spanish: "🇪🇸", Iranian: "🇮🇷", Australian: "🇦🇺",
    American: "🇺🇸", Belgian: "🇧🇪", Kenyan: "🇰🇪", SaudiArabian: "🇸🇦", "Saudi Arabian": "🇸🇦", SouthAfrican: "🇿🇦", "South African": "🇿🇦", Estonian: "🇪🇪", Indian: "🇮🇳"
  };
  return flags[nationality] || "🏳️";
}

function stableColourChip(stable: string): string {
  const chips: Record<string, string> = {
    "Yellow Stable": "bg-yellow-100 text-yellow-900",
    "Blue Stable": "bg-blue-100 text-blue-900",
    "Red Stable": "bg-red-100 text-red-900",
    "Green Stable": "bg-green-100 text-green-900",
    "Purple Stable": "bg-violet-100 text-violet-900",
    "Pink Stable": "bg-pink-100 text-pink-900",
    "White Stable": "bg-slate-100 text-slate-900",
  };
  return chips[stable] || "bg-slate-100 text-slate-900";
}

const HISTORIC_FESTIVALS: HistoricFestival[] = [
  {
    id: "maze",
    name: "The Maze",
    date: "21/03/2026",
    races: [
      {
        order: 1, name: "King's Cup", ground: "Good to Soft", length: RACE_META["King's Cup"].length, classLabel: RACE_META["King's Cup"].classLabel,
        summary: "Weight Watchers travelled powerfully throughout and put the race to bed with a sharp move after the last. Zebra stuck on gamely for second once the rest of the field began to crack under pressure.",
        runners: [
          { horse:"Alex Rides Her", stable:"Red Stable", owner:"Alex Ryder", nationality:"Estonian", age:7, type:"Mare", colour:"white", description:"Fragile mare with flashes of speed but not much appetite for a battle.", jockey:"Alex Ryder", grade:2, lane:6, finish:"DNF" },
          { horse:"Weight Watchers", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"English", age:9, type:"Mare", colour:"chestnut", description:"Strong finisher with a smart turn of foot in the staying races.", jockey:"Dickie Rogers", grade:6, lane:4, finish:"1st" },
          { horse:"Hung Like a Jockey", stable:"Green Stable", owner:"Nick Frank", nationality:"Irish", age:9, type:"Mare", colour:"brown", description:"Mercurial veteran who can look dangerous before finding trouble.", jockey:"Kira McKinstry", grade:5, lane:1, finish:"DNF" },
          { horse:"Zebra", stable:"Pink Stable", owner:"Joe Elliott", nationality:"Kenyan", age:6, type:"Mare", colour:"black", description:"Hard-knocking mare who usually keeps galloping when others have cried enough.", jockey:"Stanley Addis", grade:2, lane:5, finish:"2nd" },
        ],
      },
      {
        order: 2, name: "Duke's Shield", ground: "Good", length: RACE_META["Duke's Shield"].length, classLabel: RACE_META["Duke's Shield"].classLabel,
        summary: "B-I-N-G-O was always travelling like the likeliest winner and settled matters with a determined leap at the business end. Captain Crunch gave chase all the way and held on well to secure second from the staying-on Small P.",
        runners: [
          { horse:"Small P", stable:"Red Stable", owner:"Alex Ryder", nationality:"English", age:2, type:"Colt", colour:"brown", description:"Tiny colt with honest stamina and a habit of outrunning his frame.", jockey:"Big P", grade:6, lane:5, finish:"3rd" },
          { horse:"B-I-N-G-O", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"Irish", age:9, type:"Mare", colour:"brown", description:"Front-running specialist who loves a fight at the business end.", jockey:"Xherdan Shaqiri", grade:2, lane:3, finish:"1st" },
          { horse:"Little Saint James", stable:"Green Stable", owner:"Nick Frank", nationality:"American", age:3, type:"Filly", colour:"chestnut", description:"Raw but talented sort with pace if everything drops kindly.", jockey:"Alec Guinness", grade:1, lane:6, finish:"DNF" },
          { horse:"Captain Crunch", stable:"Pink Stable", owner:"Joe Elliott", nationality:"American", age:5, type:"Horse", colour:"brown", description:"Reliable pace angle who usually gives his supporters a run for their money.", jockey:"Stanley Addis", grade:4, lane:1, finish:"2nd" },
        ],
      },
      {
        order: 3, name: "Lady's Plate", ground: "Good", length: RACE_META["Lady's Plate"].length, classLabel: RACE_META["Lady's Plate"].classLabel,
        summary: "Five Legs showed a smart change of gear when the tempo lifted and stole first run on the field. Tiny Tim rallied bravely to take second, with Leek & Potato Soup keeping on for third after a prominent early showing.",
        runners: [
          { horse:"Five Legs", stable:"Red Stable", owner:"Alex Ryder", nationality:"English", age:8, type:"Horse", colour:"black", description:"Tough campaigner who finds plenty once pressure is applied.", jockey:"Matt Long", grade:5, lane:3, finish:"1st" },
          { horse:"Prince of Persia", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"Iranian", age:12, type:"Horse", colour:"brown", description:"Aging rogue with ability, provided the mind remains on the job.", jockey:"Dickie Rogers", grade:5, lane:1, finish:"DNF" },
          { horse:"Tiny Tim", stable:"Green Stable", owner:"Nick Frank", nationality:"American", age:3, type:"Colt", colour:"white", description:"Small colt who keeps responding when asked for extra.", jockey:"Willy Flanagan", grade:6, lane:2, finish:"2nd" },
          { horse:"Leek & Potato Soup", stable:"Pink Stable", owner:"Joe Elliott", nationality:"French", age:7, type:"Horse", colour:"roan", description:"Popular customer with enough speed to travel strongly for a long way.", jockey:"Stanley Addis", grade:6, lane:5, finish:"3rd" },
        ],
      },
      {
        order: 4, name: "Lord's Salver", ground: "Good", length: RACE_META["Lord's Salver"].length, classLabel: RACE_META["Lord's Salver"].classLabel,
        summary: "Long Face Larry found plenty when challenged and kept up a relentless rhythm to land the Salver. Sir Trotsalot gave honest chase throughout, while the two beaten outsiders folded tamely once the pressure came on.",
        runners: [
          { horse:"Long Face Larry", stable:"Red Stable", owner:"Alex Ryder", nationality:"Irish", age:7, type:"Horse", colour:"black", description:"Proper grinder who relishes attritional tests.", jockey:"Pat Noodle", grade:3, lane:2, finish:"1st" },
          { horse:"Sir Trotsalot", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"Irish", age:10, type:"Horse", colour:"black", description:"Very game type who often sticks around for the places.", jockey:"Henry Rayner", grade:4, lane:3, finish:"2nd" },
          { horse:"Moonraker", stable:"Green Stable", owner:"Nick Frank", nationality:"English", age:11, type:"Horse", colour:"brown", description:"Veteran with fading powers but the odd spark still in reserve.", jockey:"Michael O'Leary", grade:4, lane:6, finish:"DNF" },
          { horse:"Pibbles", stable:"Pink Stable", owner:"Joe Elliott", nationality:"South African", age:2, type:"Colt", colour:"grey", description:"Still learning the game and found this happening too quickly.", jockey:"Stanley Addis", grade:5, lane:5, finish:"DNF" },
        ],
      },
      {
        order: 5, name: "Queen's Prize", ground: "Soft", length: RACE_META["Queen's Prize"].length, classLabel: RACE_META["Queen's Prize"].classLabel,
        summary: "The Bishop of Norwich travelled strongly in behind before asserting at the perfect moment to take the Queen's Prize. Rochester's Monkey stayed on best of the rest, while King William Ride ran a solid race to nick third late on.",
        runners: [
          { horse:"King William Ride", stable:"Red Stable", owner:"Alex Ryder", nationality:"English", age:9, type:"Mare", colour:"brown", description:"Consistent mare who often finds one or two too sharp.", jockey:"Pat Noodle", grade:4, lane:5, finish:"3rd" },
          { horse:"The Bishop of Norwich", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"English", age:9, type:"Horse", colour:"brown", description:"High-class operator with tactical speed and a strong finish.", jockey:"Xherdan Shaqiri", grade:3, lane:3, finish:"1st" },
          { horse:"Rochester's Monkey", stable:"Green Stable", owner:"Nick Frank", nationality:"English", age:5, type:"Horse", colour:"chestnut", description:"Stayer who comes alive when the pace collapses.", jockey:"Alec Guinness", grade:3, lane:6, finish:"2nd" },
          { horse:"Professor EM Shmuck", stable:"Pink Stable", owner:"Joe Elliott", nationality:"English", age:2, type:"Colt", colour:"brown", description:"Immature sort who should improve for the experience.", jockey:"Stanley Addis", grade:3, lane:4, finish:"4th" },
        ],
      },
      {
        order: 6, name: "Prince's Trophy", ground: "Good to Soft", length: RACE_META["Prince's Trophy"].length, classLabel: RACE_META["Prince's Trophy"].classLabel,
        summary: "Squire looked a class act from flagfall and confirmed it with a polished winning effort in the feature. Scotch Eggington chased him home with real credit, while Randy Andy plugged on for a respectable third.",
        runners: [
          { horse:"Scotch Eggington", stable:"Red Stable", owner:"Alex Ryder", nationality:"English", age:6, type:"Horse", colour:"chestnut", description:"Well-liked horse who travels strongly and keeps finding.", jockey:"Warwick Davis", grade:1, lane:1, finish:"2nd" },
          { horse:"Squire", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"English", age:3, type:"Colt", colour:"black", description:"Classy colt with gears the others simply do not possess.", jockey:"Henry Rayner", grade:1, lane:2, finish:"1st" },
          { horse:"Randy Andy", stable:"Green Stable", owner:"Nick Frank", nationality:"Scottish", age:5, type:"Horse", colour:"roan", description:"Honest sort who rarely shirks the issue.", jockey:"Willy Flanagan", grade:2, lane:3, finish:"3rd" },
          { horse:"Blind Fury", stable:"Pink Stable", owner:"Joe Elliott", nationality:"German", age:6, type:"Horse", colour:"black", description:"Strong traveller whose finishing effort can ebb late on.", jockey:"Stanley Addis", grade:1, lane:5, finish:"4th" },
        ],
      },
    ],
  },
  {
    id: "charleston",
    name: "Charleston Park",
    date: "11/04/2026",
    races: [
      {
        order: 1, name: "Lady's Plate", ground: "Good to Soft", length: RACE_META["Lady's Plate"].length, classLabel: RACE_META["Lady's Plate"].classLabel,
        summary: "10 Pints Deep wins by a nose in a rapid sprint finish after trailing the experienced Lady Tottingham for much of the race. Favourite Pegasus falls at the first.",
        runners: [
          { horse:"Sugar Cube", stable:"Yellow Stable", owner:"Stan Addis", nationality:"Saudi Arabian", age:5, type:"Horse", colour:"white", description:"Sweetly named runner who might lure some optimistic punters. Travels well on his day but can melt when the heat is on.", jockey:"Goose", grade:6, lane:4, finish:"3rd" },
          { horse:"10 Pints Deep", stable:"Red Stable", owner:"Alex Ryder", nationality:"Irish", age:10, type:"Horse", colour:"black", description:"Out of practice horse that hasn't raced for over 3 years. Dangerous when in the mood.", jockey:"Big P", grade:6, lane:3, finish:"1st" },
          { horse:"Lady Tottingham", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"Scottish", age:9, type:"Mare", colour:"grey", description:"Experienced mare who knows her job and usually stays on well.", jockey:"Dickie Rogers", grade:4, lane:2, finish:"2nd" },
          { horse:"Pegasus", stable:"Green Stable", owner:"Nick Frank", nationality:"Greek", age:4, type:"Horse", colour:"white", description:"Volatile Greek thoroughbred who dominates on the flats but loses his head too often.", jockey:"Willy Flanagan", grade:3, lane:6, finish:"DNF" },
          { horse:"George Gallopway", stable:"Purple Stable", owner:"Al Clarke", nationality:"English", age:8, type:"Horse", colour:"brown", description:"Honest type who can handle the jumps and stay on when others have had enough.", jockey:"Prince Andrew", grade:5, lane:1, finish:"4th" },
          { horse:"Drunk Before Dinner", stable:"White Stable", owner:"Warren Jones", nationality:"English", age:10, type:"Horse", colour:"black", description:"Temperamental horse who only seems to find his best when properly motivated.", jockey:"Aamilah Aswat", grade:4, lane:5, finish:"DNF" },
        ],
      },
      {
        order: 2, name: "Queen's Prize", ground: "Good", length: RACE_META["Queen's Prize"].length, classLabel: RACE_META["Queen's Prize"].classLabel,
        summary: "Blitzkrieg lives up to hype from the stable. Storms out the block and never looks back to win by 8F. Rest of the field fall apart from the elderly OAP McCoy.",
        runners: [
          { horse:"Blitzkrieg", stable:"Yellow Stable", owner:"Stan Addis", nationality:"German", age:6, type:"Horse", colour:"grey", description:"Powerful pace angle who is happiest when bossing matters from the front.", jockey:"Goose", grade:2, lane:1, finish:"1st" },
          { horse:"Le Gris", stable:"Red Stable", owner:"Alex Ryder", nationality:"French", age:10, type:"Mare", colour:"grey", description:"Talented mare with a patchy finishing record.", jockey:"Matt Long", grade:1, lane:6, finish:"DNF" },
          { horse:"OAP McCoy", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"Northern Irish", age:11, type:"Horse", colour:"brown", description:"Elder statesman of the paddock who still knows all the tricks.", jockey:"A.P. McCoy", grade:6, lane:2, finish:"2nd" },
          { horse:"The Bengal Lancer", stable:"Green Stable", owner:"Nick Frank", nationality:"Indian", age:3, type:"Colt", colour:"chestnut", description:"Exciting colt but still rough around the edges.", jockey:"Alec Guinness", grade:1, lane:4, finish:"DNF" },
          { horse:"Al's 2nd Horse", stable:"Purple Stable", owner:"Al Clarke", nationality:"English", age:6, type:"Horse", colour:"brown", description:"Useful stable second string who failed to land a blow here.", jockey:"Al Clarke", grade:1, lane:5, finish:"DNF" },
          { horse:"Never in Doubt", stable:"White Stable", owner:"Warren Jones", nationality:"English", age:8, type:"Mare", colour:"black", description:"Name promised plenty, performance less so.", jockey:"Aamilah Aswat", grade:1, lane:3, finish:"DNF" },
        ],
      },
      {
        order: 3, name: "Duke's Shield", ground: "Good", length: RACE_META["Duke's Shield"].length, classLabel: RACE_META["Duke's Shield"].classLabel,
        summary: "In a race that looked close coming into the home straight, the GOAT is a Horse romped home by 4F. A big lunge from Fix the Pipes to secure second.",
        runners: [
          { horse:"The GOAT is a Horse", stable:"Yellow Stable", owner:"Stan Addis", nationality:"Irish", age:8, type:"Horse", colour:"roan", description:"Popular front-runner who can stretch fields when allowed to roll.", jockey:"Goose", grade:4, lane:2, finish:"1st" },
          { horse:"Scotch Eggington", stable:"Red Stable", owner:"Alex Ryder", nationality:"English", age:6, type:"Horse", colour:"chestnut", description:"Still consistent and usually thereabouts.", jockey:"Warwick Davis", grade:2, lane:4, finish:"3rd" },
          { horse:"Ponce de Leon", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"Spanish", age:3, type:"Colt", colour:"grey", description:"Youngster with ability but not enough know-how yet.", jockey:"Xherdan Shaqiri", grade:3, lane:5, finish:"4th" },
          { horse:"Quiz Woakes' Good Length Outswinger", stable:"Green Stable", owner:"Nick Frank", nationality:"English", age:11, type:"Gelding", colour:"chestnut", description:"Old favourite who now relies on rhythm and guile.", jockey:"Ben Duckett", grade:2, lane:6, finish:"5th" },
          { horse:"Sore Throat", stable:"Purple Stable", owner:"Al Clarke", nationality:"English", age:8, type:"Mare", colour:"chestnut", description:"Capable mare who failed to get competitive.", jockey:"Leslie Jones", grade:6, lane:1, finish:"DNF" },
          { horse:"Fix the Pipes", stable:"White Stable", owner:"Warren Jones", nationality:"English", age:11, type:"Mare", colour:"brown", description:"Stayed on well late to nick second.", jockey:"Aamilah Aswat", grade:6, lane:3, finish:"2nd" },
        ],
      },
      {
        order: 4, name: "King's Cup", ground: "Good to Soft", length: RACE_META["King's Cup"].length, classLabel: RACE_META["King's Cup"].classLabel,
        summary: "Squire ran an incredible race, but nicked Blackthorns on the final straight. War Horse held on to win a photo finish against an impressive red stable filly.",
        runners: [
          { horse:"War Horse", stable:"Yellow Stable", owner:"Stan Addis", nationality:"English", age:9, type:"Horse", colour:"black", description:"Hard stayer with a big engine and no fear of a battle.", jockey:"Goose", grade:1, lane:6, finish:"1st" },
          { horse:"Cheltenhamshire, La La La", stable:"Red Stable", owner:"Alex Ryder", nationality:"English", age:2, type:"Filly", colour:"brown", description:"Bright filly with plenty of natural pace.", jockey:"Matt Long", grade:4, lane:3, finish:"2nd" },
          { horse:"Squire", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"English", age:3, type:"Colt", colour:"black", description:"Outstanding colt whose reputation makes him a market force.", jockey:"Henry Rayner", grade:1, lane:1, finish:"DNF" },
          { horse:"Hung Like a Jockey", stable:"Green Stable", owner:"Nick Frank", nationality:"Irish", age:9, type:"Mare", colour:"brown", description:"Tried to go with the principals but flattened out late.", jockey:"Kira McKinstry", grade:4, lane:5, finish:"4th" },
          { horse:"Two Thousand and Two", stable:"Purple Stable", owner:"Al Clarke", nationality:"Irish", age:3, type:"Colt", colour:"grey", description:"Promising youngster who did not complete.", jockey:"Al Clarke", grade:3, lane:2, finish:"DNF" },
          { horse:"Cheap as Chippies", stable:"White Stable", owner:"Warren Jones", nationality:"English", age:10, type:"Horse", colour:"chestnut", description:"Kept plugging on to grab a useful placing.", jockey:"Aamilah Aswat", grade:2, lane:4, finish:"3rd" },
        ],
      },
      {
        order: 5, name: "Lord's Salver", ground: "Good", length: RACE_META["Lord's Salver"].length, classLabel: RACE_META["Lord's Salver"].classLabel,
        summary: "Two rapid fighters made the Salver a great spectacle for fans from start to finish. The yellow stable filly just lacked the stamina to hold on the pace at the end.",
        runners: [
          { horse:"Kiss the Alderman", stable:"Yellow Stable", owner:"Stan Addis", nationality:"English", age:1, type:"Filly", colour:"brown", description:"Bold juvenile who nearly stole the race from the front.", jockey:"Keith Addis", grade:5, lane:2, finish:"2nd" },
          { horse:"Long Face Larry", stable:"Red Stable", owner:"Alex Ryder", nationality:"Irish", age:7, type:"Horse", colour:"black", description:"Returned to a tougher task and found a few too sharp.", jockey:"Pat Noodle", grade:3, lane:3, finish:"4th" },
          { horse:"The Bishop of Norwich", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"English", age:9, type:"Horse", colour:"brown", description:"Class edge told again when the pressure went on.", jockey:"Xherdan Shaqiri", grade:2, lane:1, finish:"1st" },
          { horse:"Anne of Cleves Looks Like a Horse", stable:"Green Stable", owner:"Nick Frank", nationality:"Belgian", age:9, type:"Mare", colour:"roan", description:"Interesting mare but faded out of contention.", jockey:"Henry VIII", grade:6, lane:4, finish:"DNF" },
          { horse:"Joey from Neighbours", stable:"Purple Stable", owner:"Al Clarke", nationality:"Australian", age:6, type:"Horse", colour:"brown", description:"Ran a solid race and picked off tired horses late.", jockey:"Alex Scoby", grade:4, lane:6, finish:"3rd" },
          { horse:"Soggybuiscit", stable:"White Stable", owner:"Warren Jones", nationality:"English", age:5, type:"Horse", colour:"white", description:"Travelled kindly enough but could not quite land a blow.", jockey:"Aamilah Aswat", grade:5, lane:5, finish:"5th" },
        ],
      },
      {
        order: 6, name: "Prince's Trophy", ground: "Good", length: RACE_META["Prince's Trophy"].length, classLabel: RACE_META["Prince's Trophy"].classLabel,
        summary: "Close coming round the final bend, Sturm und Drang responded positively to Michael O'Leary's demands to gallop clear of the purple stable favourite.",
        runners: [
          { horse:"He's in his Hayday", stable:"Yellow Stable", owner:"Stan Addis", nationality:"Irish", age:3, type:"Colt", colour:"chestnut", description:"Still developing and found this too much too soon.", jockey:"Goose", grade:3, lane:6, finish:"DNF" },
          { horse:"Swig the Nag", stable:"Red Stable", owner:"Alex Ryder", nationality:"English", age:3, type:"Colt", colour:"brown", description:"Early speed but not enough late substance.", jockey:"Marrrio", grade:5, lane:4, finish:"DNF" },
          { horse:"Chimp", stable:"Blue Stable", owner:"Alfie Clarke-Coast", nationality:"South African", age:2, type:"Colt", colour:"chestnut", description:"Raw colt with charisma and enough talent to nick third.", jockey:"Xherdan Shaqiri", grade:5, lane:3, finish:"3rd" },
          { horse:"Sturm und Drang", stable:"Green Stable", owner:"Nick Frank", nationality:"German", age:3, type:"Colt", colour:"brown", description:"Game colt who found a telling surge when it mattered.", jockey:"Michael O'Leary", grade:5, lane:2, finish:"1st" },
          { horse:"Cloppy Balboa", stable:"Purple Stable", owner:"Al Clarke", nationality:"American", age:3, type:"Colt", colour:"black", description:"Looked the danger for a long way before one proved stronger.", jockey:"Al Clarke", grade:2, lane:1, finish:"2nd" },
          { horse:"Manosphere", stable:"White Stable", owner:"Warren Jones", nationality:"English", age:2, type:"Colt", colour:"white", description:"Promising but still learning under pressure.", jockey:"Aamilah Aswat", grade:3, lane:5, finish:"4th" },
        ],
      },
    ],
  },
];

const UPCOMING_ORDER: RaceName[] = [
  "Duke's Shield",
  "Lady's Plate",
  "King's Cup",
  "Earl's Sceptre",
  "Queen's Prize",
  "Lord's Salver",
  "Jester's Jug",
  "Prince's Trophy",
];

const UPCOMING_RUNNERS: UpcomingRunner[] = [
  { horse: "Red Runner", stable: "Red Stable", owner: OWNER_BY_STABLE["Red Stable"], nationality: "English", age: 5, type: "Horse", colour: "brown", description: "Admin-editable placeholder runner for the Red Stable.", jockey: "TBC", grade: 2, lane: 4 },
  { horse: "Yellow Runner", stable: "Yellow Stable", owner: OWNER_BY_STABLE["Yellow Stable"], nationality: "English", age: 4, type: "Horse", colour: "chestnut", description: "Admin-editable placeholder runner for the Yellow Stable.", jockey: "TBC", grade: 3, lane: 5 },
  { horse: "Purple Runner", stable: "Purple Stable", owner: OWNER_BY_STABLE["Purple Stable"], nationality: "Irish", age: 4, type: "Horse", colour: "grey", description: "Admin-editable placeholder runner for the Purple Stable.", jockey: "TBC", grade: 2, lane: 2 },
  { horse: "White Runner", stable: "White Stable", owner: OWNER_BY_STABLE["White Stable"], nationality: "English", age: 6, type: "Horse", colour: "white", description: "Admin-editable placeholder runner for the White Stable.", jockey: "TBC", grade: 1, lane: 6 },
  { horse: "Green Runner", stable: "Green Stable", owner: OWNER_BY_STABLE["Green Stable"], nationality: "Irish", age: 4, type: "Horse", colour: "brown", description: "Admin-editable placeholder runner for the Green Stable.", jockey: "TBC", grade: 3, lane: 1 },
  { horse: "Blue Runner", stable: "Blue Stable", owner: OWNER_BY_STABLE["Blue Stable"], nationality: "English", age: 5, type: "Horse", colour: "black", description: "Admin-editable placeholder runner for the Blue Stable.", jockey: "TBC", grade: 4, lane: 3 },
  { horse: "Pink Runner", stable: "Pink Stable", owner: OWNER_BY_STABLE["Pink Stable"], nationality: "English", age: 4, type: "Horse", colour: "roan", description: "Admin-editable placeholder runner for the Pink Stable.", jockey: "TBC", grade: 5, lane: 7 },
  { horse: "Navy Runner", stable: "Navy Stable", owner: OWNER_BY_STABLE["Navy Stable"], nationality: "English", age: 5, type: "Horse", colour: "grey", description: "Admin-editable placeholder runner for the Navy Stable.", jockey: "TBC", grade: 6, lane: 8 },
];

function toDisplay(runners: Array<HistoricRunner | UpcomingRunner>, seedOffset: number): DisplayRunner[] {
  return runners.map((r, i) => ({ ...r, win: chooseWin(r.grade, r.lane, i + seedOffset) }));
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{children}</div>;
}

export default function RaceCardsPage() {
  const [mode, setMode] = useState<"historic" | "upcoming">("historic");
  const [festivalId, setFestivalId] = useState<string>(HISTORIC_FESTIVALS[1].id);
  const [historicRaceOrder, setHistoricRaceOrder] = useState<number>(1);
  const [upcomingRaceName, setUpcomingRaceName] = useState<RaceName>(UPCOMING_ORDER[0]);
  const [selectedHorse, setSelectedHorse] = useState<string>("");
  const [forecastSecond, setForecastSecond] = useState<string>("");
  const [tricastSecond, setTricastSecond] = useState<string>("");
  const [tricastThird, setTricastThird] = useState<string>("");

  const [upcomingRaceState, setUpcomingRaceState] = useState<Record<RaceName, { ground: string; length: string; classLabel: string }>>(() => {
    const base = {} as Record<RaceName, { ground: string; length: string; classLabel: string }>;
    UPCOMING_ORDER.forEach((name) => {
      base[name] = {
        ground: "Good to Soft",
        length: RACE_META[name].length,
        classLabel: RACE_META[name].classLabel,
      };
    });
    return base;
  });

  const historicFestival = HISTORIC_FESTIVALS.find((f) => f.id === festivalId) || HISTORIC_FESTIVALS[0];
  const historicRace = historicFestival.races.find((r) => r.order === historicRaceOrder) || historicFestival.races[0];

  const upcomingRace: UpcomingRace = {
    order: UPCOMING_ORDER.indexOf(upcomingRaceName) + 1,
    name: upcomingRaceName,
    ground: upcomingRaceState[upcomingRaceName].ground,
    length: upcomingRaceState[upcomingRaceName].length,
    classLabel: upcomingRaceState[upcomingRaceName].classLabel,
    runners: UPCOMING_RUNNERS,
  };

  const activeRace = mode === "historic" ? historicRace : upcomingRace;
  const activeFestivalLabel = mode === "historic" ? `${historicFestival.name} — ${historicFestival.date}` : "Belland Meadows — 15/05/2026";

  const activeRunners = useMemo<DisplayRunner[]>(() => {
    return mode === "historic" ? toDisplay(historicRace.runners, historicRace.order) : toDisplay(upcomingRace.runners, upcomingRace.order);
  }, [mode, historicRace, upcomingRace]);

  const selected = activeRunners.find((r) => r.horse === selectedHorse) || activeRunners[0];
  const sortedByPrice = [...activeRunners].sort((a, b) => DEC[a.win] - DEC[b.win]);
  const fav = sortedByPrice[0]?.horse || "";
  const secondFav = sortedByPrice[1]?.horse || "";
  const winner = mode === "historic" ? activeRunners.find((r) => r.finish === "1st") || null : null;
  const prize = RACE_META[activeRace.name].prize;

  const availableOthers = activeRunners.filter((r) => r.horse !== selected.horse);
  const chosenForecastSecond = forecastSecond && forecastSecond !== selected.horse ? forecastSecond : (availableOthers[0]?.horse || "");
  const chosenTricastSecond = tricastSecond && tricastSecond !== selected.horse ? tricastSecond : (availableOthers[0]?.horse || "");
  const tricastThirdChoices = activeRunners.filter((r) => r.horse !== selected.horse && r.horse !== chosenTricastSecond);
  const chosenTricastThird = tricastThird && tricastThird !== selected.horse && tricastThird !== chosenTricastSecond ? tricastThird : (tricastThirdChoices[0]?.horse || "");

  const handleUpcomingMeta = (field: "ground" | "length" | "classLabel", value: string) => {
    setUpcomingRaceState((prev) => ({
      ...prev,
      [upcomingRaceName]: {
        ...prev[upcomingRaceName],
        [field]: value,
      },
    }));
  };

  return (
    <SiteShell currentPage="Race Cards">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value as "historic" | "upcoming");
              setSelectedHorse("");
              setForecastSecond("");
              setTricastSecond("");
              setTricastThird("");
            }}
          >
            <option value="historic">Historic race</option>
            <option value="upcoming">Upcoming festival</option>
          </select>

          {mode === "historic" ? (
            <>
              <select
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                value={festivalId}
                onChange={(e) => {
                  setFestivalId(e.target.value);
                  setHistoricRaceOrder(1);
                  setSelectedHorse("");
                  setForecastSecond("");
                  setTricastSecond("");
                  setTricastThird("");
                }}
              >
                {HISTORIC_FESTIVALS.map((f) => (
                  <option key={f.id} value={f.id}>{`${f.name} — ${f.date}`}</option>
                ))}
              </select>
              <select
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                value={historicRaceOrder}
                onChange={(e) => {
                  setHistoricRaceOrder(Number(e.target.value));
                  setSelectedHorse("");
                  setForecastSecond("");
                  setTricastSecond("");
                  setTricastThird("");
                }}
              >
                {historicFestival.races.map((r) => (
                  <option key={r.order} value={r.order}>{`${r.order}. ${r.name}`}</option>
                ))}
              </select>
            </>
          ) : (
            <>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800">Belland Meadows — 15/05/2026</div>
              <select
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                value={upcomingRaceName}
                onChange={(e) => {
                  setUpcomingRaceName(e.target.value as RaceName);
                  setSelectedHorse("");
                  setForecastSecond("");
                  setTricastSecond("");
                  setTricastThird("");
                }}
              >
                {UPCOMING_ORDER.map((r, i) => (
                  <option key={r} value={r}>{`${i + 1}. ${r}`}</option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className={`grid gap-4 bg-gradient-to-r ${RACE_META[activeRace.name].header} px-8 py-6 lg:grid-cols-[150px_1fr_280px]`}>
            <div className="flex h-32 items-center justify-center rounded-3xl border border-slate-300/70 bg-white/60 text-center text-sm text-slate-500">Trophy image slot</div>
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-slate-600">{mode === "historic" ? "Historic race card" : "Upcoming festival race card"}</div>
              <div className="mt-1 font-serif text-5xl font-bold text-slate-800">{activeRace.name}</div>
              <div className="mt-3 text-lg font-semibold text-slate-700">{activeFestivalLabel}</div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {mode === "historic" ? (
                  <>
                    <div><Label>Ground</Label><div className="rounded-2xl bg-white/70 px-4 py-3 font-semibold">{activeRace.ground}</div></div>
                    <div><Label>Race length</Label><div className="rounded-2xl bg-white/70 px-4 py-3 font-semibold">{activeRace.length}</div></div>
                    <div><Label>Race class</Label><div className="rounded-2xl bg-white/70 px-4 py-3 font-semibold">{activeRace.classLabel}</div></div>
                  </>
                ) : (
                  <>
                    <div><Label>Ground</Label><input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold" value={activeRace.ground} onChange={(e) => handleUpcomingMeta("ground", e.target.value)} /></div>
                    <div><Label>Race length</Label><input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold" value={activeRace.length} onChange={(e) => handleUpcomingMeta("length", e.target.value)} /></div>
                    <div><Label>Race class</Label><input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold" value={activeRace.classLabel} onChange={(e) => handleUpcomingMeta("classLabel", e.target.value)} /></div>
                  </>
                )}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-300/70 bg-white/60 p-5">
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Prize money</div>
              <div className="mt-3 space-y-3 text-lg font-semibold text-slate-800">
                <div className="flex items-center justify-between"><span>1st</span><span>{prize[0]}</span></div>
                <div className="flex items-center justify-between"><span>2nd</span><span>{prize[1]}</span></div>
                <div className="flex items-center justify-between"><span>3rd</span><span>{prize[2]}</span></div>
              </div>
            </div>
          </div>

          {mode === "historic" && winner ? (
            <div className="grid gap-4 border-b bg-amber-50 px-6 py-5 md:grid-cols-[180px_1fr_220px]">
              <div className="flex h-36 items-center justify-center rounded-2xl bg-white text-6xl">🐎</div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Race summary</div>
                <div className="mt-1 text-4xl font-bold">Winner: {winner.horse}</div>
                <p className="mt-3 max-w-4xl text-slate-700">{historicRace.summary}</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="text-sm text-slate-500">Winning odds</div>
                <div className="mt-2 text-4xl font-black">{winner.win}</div>
              </div>
            </div>
          ) : null}

          <div className="hidden grid-cols-[72px_90px_110px_1.9fr_220px_130px] gap-4 border-b bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 lg:grid">
            <div>Grade</div>
            <div>Lane</div>
            <div>Jersey</div>
            <div>Horse / Information</div>
            <div>Jockey / Owner / Stable</div>
            <div>Win odds</div>
          </div>

          <div className="divide-y">
            {activeRunners.map((runner, i) => (
              <button
                key={`${runner.horse}-${runner.lane}`}
                type="button"
                onClick={() => {
                  setSelectedHorse(runner.horse);
                  setForecastSecond("");
                  setTricastSecond("");
                  setTricastThird("");
                }}
                className={`grid w-full gap-4 px-6 py-5 text-left transition hover:bg-emerald-50 lg:grid-cols-[72px_90px_110px_1.9fr_220px_130px] ${selected.horse === runner.horse ? "bg-emerald-50" : "bg-white"}`}
              >
                <div className="text-5xl font-black text-slate-500">{runner.grade}</div>
                <div className="flex items-center justify-center"><span className="rounded-full border px-3 py-2 text-lg font-semibold">{runner.lane}</span></div>
                <div className="flex h-28 items-center justify-center rounded-3xl border bg-slate-50 text-center text-xs text-slate-500">Jersey image slot</div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-serif text-3xl font-bold text-slate-800">{runner.horse}</div>
                    <span className="text-2xl">{flagEmoji(runner.nationality)}</span>
                    {fav === runner.horse ? <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-900">FAV</span> : null}
                    {secondFav === runner.horse ? <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-900">2FAV</span> : null}
                    {runner.finish ? <span className="rounded-full border px-3 py-1 text-xs font-semibold">{runner.finish}</span> : null}
                  </div>
                  <div className="mt-2 text-slate-600">{runner.age} y.o. {runner.type}, {runner.colour}</div>
                  <p className="mt-2 max-w-3xl text-slate-700">{runner.description}</p>
                </div>
                <div className="text-slate-600">
                  <div><span className="font-semibold text-slate-800">J:</span> {runner.jockey}</div>
                  <div><span className="font-semibold text-slate-800">O:</span> {runner.owner}</div>
                  <div className="mt-2"><span className={`rounded-full px-3 py-1 text-xs font-bold ${stableColourChip(runner.stable)}`}>{runner.stable}</span></div>
                </div>
                <div className="lg:text-right">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Odds</div>
                  <div className="mt-2 inline-flex rounded-2xl border border-rose-300 bg-rose-100 px-4 py-3 text-3xl font-black text-rose-900">{runner.win}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_.95fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">Selected horse markets</h2>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="text-slate-500">Horse</div>
              <div className="mt-2 text-3xl font-bold">
                {selected.horse}
                <span className="ml-2 rounded-full bg-amber-100 px-3 py-1 text-base align-middle">Win {selected.win}</span>
              </div>
              <div className="mt-2 text-slate-600">{selected.stable} · Grade {selected.grade} · Lane {selected.lane}</div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Label>Each Way</Label>
                <div className="text-4xl font-black">{eachWayOdds(selected.win)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Label>Place</Label>
                <div className="text-4xl font-black">{placeOdds(selected.win)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Label>Forecast</Label>
                <select className="mb-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={chosenForecastSecond} onChange={(e) => setForecastSecond(e.target.value)}>
                  {availableOthers.map((r) => <option key={r.horse} value={r.horse}>{r.horse}</option>)}
                </select>
                <div className="text-4xl font-black">{chosenForecastSecond ? forecastOdds(selected.horse, chosenForecastSecond) : "—"}</div>
                <div className="mt-2 text-sm text-slate-600">1st {selected.horse} · 2nd {chosenForecastSecond || "—"}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Label>Tricast</Label>
                <div className="space-y-3">
                  <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={chosenTricastSecond} onChange={(e) => { setTricastSecond(e.target.value); setTricastThird(""); }}>
                    {availableOthers.map((r) => <option key={r.horse} value={r.horse}>{r.horse}</option>)}
                  </select>
                  <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" value={chosenTricastThird} onChange={(e) => setTricastThird(e.target.value)}>
                    {tricastThirdChoices.map((r) => <option key={r.horse} value={r.horse}>{r.horse}</option>)}
                  </select>
                </div>
                <div className="mt-3 text-4xl font-black">{chosenTricastSecond && chosenTricastThird ? tricastOdds(selected.horse, chosenTricastSecond, chosenTricastThird) : "—"}</div>
                <div className="mt-2 text-sm text-slate-600">1st {selected.horse} · 2nd {chosenTricastSecond || "—"} · 3rd {chosenTricastThird || "—"}</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">Race card notes</h2>
            <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
              Historic races use stored race data and summaries. Upcoming Belland Meadows races use editable race info and automatic odds from grade + lane for each horse.
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
