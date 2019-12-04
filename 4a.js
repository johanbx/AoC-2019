const { p4 } = require('./puzzle_input');

const [start, end] = p4.split('-').map(o => parseInt(o, 10));

const isCandidate = pw => {
  const pwSize = pw.length;
  let prevC;
  let haveTwoSameC = false;
  for (let i = 0; i < pwSize; i++){
    const c = parseInt(pw[i], 10);
    if (prevC === c) {
      haveTwoSameC = true;
    }
    if (c < prevC) {
      return false;
    }
    prevC = c;
  };
  return haveTwoSameC;
}

let candidates = 0;
for (let intPw = start; intPw <= end; intPw++) {
  const pw = intPw.toString();
  if (isCandidate(pw)) {
    candidates++;
  }
}
console.log(candidates);