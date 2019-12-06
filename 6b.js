const { p6 } = require('./puzzle_input');

const orbits = {};
const orbitMap = p6.split('\n');
for (let i = 0; i < orbitMap.length; i++) {
  const [orbitA, orbitB] = orbitMap[i].split(')');
  if (!orbits[orbitA]) {
    orbits[orbitA] = [orbitB];
  } else {
    orbits[orbitA].push(orbitB);
  }
}

const indirectOrbit = orbit => Object.keys(orbits).find(key => orbits[key].includes(orbit));

let youCurrOrbit = 'YOU';
let sanCurrOrbit = 'SAN';
let crossPath = false;
const youVisitedOrbits = [];
const santaVisitedOrbits = [];
do {
  const youTravel = indirectOrbit(youCurrOrbit);
  const sanTravel = indirectOrbit(sanCurrOrbit);
  if (santaVisitedOrbits.includes(youTravel)) {
    crossPath = youTravel;
  }
  if (!crossPath && youVisitedOrbits.includes(sanTravel)) {
    crossPath = sanTravel;
  }
  youVisitedOrbits.push(youTravel);
  santaVisitedOrbits.push(sanTravel);
  youCurrOrbit = youTravel;
  sanCurrOrbit = sanTravel;
} while (!crossPath);

console.log(
  youVisitedOrbits.findIndex(v => v === crossPath)+
  santaVisitedOrbits.findIndex(v => v === crossPath)
)