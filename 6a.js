const { p6 } = require('./puzzle_input');

const memo = func => {
  const cache = {};
  return function() {
    const key = JSON.stringify(arguments);
    if (cache[key]) {
      return cache[key];
    } else {
      let result = func.apply(null, arguments);
      cache[key] = result;
      return result;
    }
  }
}

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

const allOrbits = memo((orbit, count = 0) => {
  const parent = Object.keys(orbits).find(key => orbits[key].includes(orbit));
  if (!parent) {
    return count;
  }
  return allOrbits(parent, count+1);
});

const totalOrbits = Object
  .keys(orbits)
  .reduce(
    (acc, key) => acc + orbits[key].reduce(
      (acc, curr) => acc + allOrbits(curr), 0)
  ,0)

console.log(totalOrbits);