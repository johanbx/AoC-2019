if (!process.argv[2]) {
  console.log('Usage example: node time 1a');
} else {
  const start = process.hrtime();
  require('./'+process.argv[2]);
  const end = process.hrtime(start);
  console.info('Execution time: %ds %dms', end[0], parseInt(end[1] / 1000000));
}