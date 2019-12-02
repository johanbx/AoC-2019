const { p2 } = require('./puzzle_input');

const ins = p2.split(',').map(o => parseInt(o, 10));
ins[1] = 12;
ins[2] = 2;

let end = false;
for (let i = 0; i < ins.length; i += 4) {
  switch (ins[i]) {
    case 1:
      ins[ins[i+3]] = ins[ins[i+1]]+ins[ins[i+2]];
      break;
    case 2:
      ins[ins[i+3]] = ins[ins[i+1]]*ins[ins[i+2]];
      break;
    case 99:
      end = true;
      break;
  }
  if (end) {
    break;
  }
}

console.log(ins[0]);