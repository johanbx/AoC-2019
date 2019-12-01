const { p1 } = require('./puzzle_input');
console.log(
  p1
    .split('\n')
    .map(m => {
      let total = 0;
      let curr = m;
      do {
        curr = (curr/3>>0)-2;
        total += curr > 0 ? curr : 0;
      } while (curr > 0)
      return total;
    })
    .reduce((a,b)=>a+b)
);