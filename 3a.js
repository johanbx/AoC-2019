const { p3 } = require('./puzzle_input');

const [wire1path, wire2path] = p3
  .split('\n')
  .map(o => {
    const path = [];
    let x = 0;
    let y = 0;
    const moves = o.split(',');
    moves.forEach(move => {
      const direction = move[0];
      const steps = parseInt(move.substring(1), 10);
      for (let i = 0; i < steps; i++) {
        switch (direction) {
          case 'R':
            x++;
            break;
          case 'L':
            x--;
            break;
          case 'U':
            y++;
            break;
          case 'D':
            y--;
            break;
        }
        path.push(`${x},${y}`);
      }
    })
    return path;
  });

const intersections = wire1path.filter(o => wire2path.includes(o));
const distances = intersections.map(o => {
  const [x, y] = o.split(',').map(o => parseInt(o, 10));
  const d = Math.abs(0 - x) + Math.abs(0 - y);
  return d;
});

console.log(Math.min.apply(null, distances));