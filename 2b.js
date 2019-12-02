const { p2 } = require('./puzzle_input');

const main = () => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      let end = false;
      const ins = p2.split(',').map(o => parseInt(o, 10));
      ins[1] = noun;
      ins[2] = verb;
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
          if (ins[0] === 19690720) {
            return 100 * noun + verb;
          }
          break;
        }
      }
    }
  }
}

console.log(main());