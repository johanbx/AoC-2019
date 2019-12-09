const { p8 } = require('./puzzle_input');

const getLayers = ({ tall, width }) => {
  const layers = [];
  const pixelSize = tall*width;
  for (let i = 0; i < p8.length; i += pixelSize) {
    const layer = {
      data: p8.substring(i, i+pixelSize),
      tall,
      width,
      count: {}
    }
    for (let k = 0; k < pixelSize; k++) {
      if (!layer.count[layer.data[k]]) {
        layer.count[layer.data[k]] = 1;
      } else {
        layer.count[layer.data[k]] += 1;
      }
    }
    layers.push(layer);
  }
  return layers;
}

const getMin = ({ layers }) => {
  let min = layers[0];
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    if (layer.count['0'] < min.count['0']) {
      min = layer;
    }
  }
  return min;
}

const getChecksum = ({ layers }) => {
  const min = getMin({ layers });
  return min.count['1'] * min.count['2'];
}

const layers = getLayers({ tall: 6, width: 25 });
const checksum = getChecksum({ layers });

console.log(checksum);