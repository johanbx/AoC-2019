const { p1 } = require('./puzzle_input');
console.log(p1.split('\n').map(m => (m/3>>0)-2).reduce((a,b)=>a+b));