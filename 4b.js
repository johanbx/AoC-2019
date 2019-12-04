const { p4 } = require('./puzzle_input');
const [start, end] = p4.split('-').map(o => parseInt(o, 10));

const isCandidate = pw => {
  const pwLen = pw.length;
  let counter = {};
  let prevC = 0;
  for (let i = 0; i < pwLen; i++) {
    const c = pw[i];
    if (c < prevC) {
      return false;
    }
    if (!counter[c]) {
      counter[c] = 0;
    }
    counter[c]++;
    prevC = c;
  }
  for (const c in counter){
    if (counter[c] === 2){
      return true;
    }
  }
  return false;
}

let candidates = 0;
for (let i = start; i < end; i++){
  if (isCandidate(i.toString())){
    candidates++;
  }
}
console.log(candidates);