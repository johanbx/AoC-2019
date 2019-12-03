const { p3 } = require('./puzzle_input');

const [wire1path, wire2path] = p3
  .split('\n')
  .map(o => {
    const path = [];
    let totalSteps = 0;
    let x = 0;
    let y = 0;
    const moves = o.split(',');
    moves.forEach(move => {
      const direction = move[0];
      const steps = parseInt(move.substring(1), 10);
      for (let i = 0; i < steps; i++) {
        totalSteps++;
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
        path.push([x,y,totalSteps]);
      }
    })
    return path;
  });

const signalDelays = wire1path.reduce(
  (acc, [x, y, steps]) => {
    const intersection = wire2path
      .find(([x2, y2]) => x2 === x && y2 === y);
    if (intersection) {
      return acc.concat(steps+intersection[2]);
    }
    return acc;
  }, [])

console.log(Math.min.apply(null, signalDelays));