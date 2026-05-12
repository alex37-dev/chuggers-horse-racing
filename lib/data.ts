export const stableMeta = {
  'Blue Stable': { owner: 'Alfie Clarke-Coast', jersey: 'Blue / white cross' },
  'Yellow Stable': { owner: 'Stan Addis', jersey: 'Yellow / green' },
  'Red Stable': { owner: 'Alex Ryder', jersey: 'Red / white stars' },
  'Green Stable': { owner: 'Nick Frank', jersey: 'Green / yellow chevron' },
  'Pink Stable': { owner: 'Joe Elliott', jersey: 'Pink / black' },
  'White Stable': { owner: 'Warren Jones', jersey: 'White / orange cuffs' },
  'Navy Stable': { owner: 'Henry Rayner', jersey: 'Navy / silver' },
  'Black Stable': { owner: 'Luke Goddard', jersey: 'Black / gold' },
  'Purple Stable': { owner: 'Al Clarke', jersey: 'Purple / gold sash' },
} as const;

export const standings = [
  { stable: 'Blue Stable', owner: 'Alfie Clarke-Coast', points: 8, festivalWins: 1, raceWins: 5 },
  { stable: 'Yellow Stable', owner: 'Stan Addis', points: 6, festivalWins: 1, raceWins: 4 },
  { stable: 'Red Stable', owner: 'Alex Ryder', points: 6, festivalWins: 0, raceWins: 3 },
  { stable: 'Green Stable', owner: 'Nick Frank', points: 2, festivalWins: 0, raceWins: 2 },
  { stable: 'Purple Stable', owner: 'Al Clarke', points: 1, festivalWins: 0, raceWins: 0 },
];

export const festivals = [
  {
    id: 'maze',
    name: 'The Maze',
    date: '21 Mar 2026',
    winner: 'Blue Stable',
    races: 6,
    stables: 4,
    fanFavourites: ['Leek & Potato Soup', 'Hung Like a Jockey', 'Scotch Eggington'],
  },
  {
    id: 'charleston',
    name: 'Charleston Park',
    date: '11 Apr 2026',
    winner: 'Yellow Stable',
    races: 6,
    stables: 6,
    fanFavourites: ['OAP McCoy', 'Chimp', 'Kiss the Alderman', 'Le Gris'],
  },
  {
    id: 'belland',
    name: 'Belland Meadows',
    date: '15 May 2026',
    winner: 'Upcoming',
    races: 8,
    stables: 8,
    fanFavourites: [],
  },
] as const;

export const raceCardSample = {
  festival: 'Charleston Park',
  race: "Lady's Plate",
  summary:
    '10 Pints Deep wins by a nose in a rapid sprint finish after trailing the experienced Lady Tottingham for much of the race. Favourite Pegasus falls at the first.',
  runners: [
    { horse: 'Sugar Cube', stable: 'Yellow Stable', grade: 6, lane: 4, finish: '3rd', winOdds: '25/1' },
    { horse: '10 Pints Deep', stable: 'Red Stable', grade: 6, lane: 3, finish: '1st', winOdds: '18/1' },
    { horse: 'Lady Tottingham', stable: 'Blue Stable', grade: 4, lane: 2, finish: '2nd', winOdds: '8/1' },
    { horse: 'Pegasus', stable: 'Green Stable', grade: 3, lane: 6, finish: 'DNF', winOdds: '18/1' },
  ],
};

export const horseIndex = [
  { horse: 'The Bishop of Norwich', stable: 'Blue Stable', starts: 2, wins: 2, seconds: 0, thirds: 0, tags: 'Race winner' },
  { horse: 'Squire', stable: 'Blue Stable', starts: 2, wins: 1, seconds: 0, thirds: 0, tags: 'Race winner' },
  { horse: '10 Pints Deep', stable: 'Red Stable', starts: 1, wins: 1, seconds: 0, thirds: 0, tags: 'Race winner' },
  { horse: 'War Horse', stable: 'Yellow Stable', starts: 1, wins: 1, seconds: 0, thirds: 0, tags: 'Race winner' },
  { horse: 'Sturm und Drang', stable: 'Green Stable', starts: 1, wins: 1, seconds: 0, thirds: 0, tags: 'Race winner' },
  { horse: 'Scotch Eggington', stable: 'Red Stable', starts: 2, wins: 0, seconds: 1, thirds: 0, tags: 'Fan favourite' },
];
