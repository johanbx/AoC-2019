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
    const parts = []
    for (let k = 0; k < layer.data.length+1; k += layer.width) {
      const part = layer.data.substring(k, k+layer.width).split('').map(o => parseInt(o, 10));
      parts.push(part);
    }
    layer.parts = parts;
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

const generateImage = ({ layers }) => {
  const image = [];
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    for (let x = 0; x < layer.parts.length; x++) {
      if (!image[x]) {
        image[x] = [];
      }
      for (let y = 0; y < layer.parts[x].length; y++) {
        if (typeof image[x][y] === 'undefined') {
          image[x][y] = layer.parts[x][y];
        } else if (image[x][y] === 2) {
          image[x][y] = layer.parts[x][y];
        }
      }
    }
  }
  return image;
}

const prettyImage = ({ image }) => {
  pImage = '';
  for (let i = 0; i < image.length-1; i++) {
    pImage += image[i].map(o => {
      switch (o) {
        case 0:
          return ' ';
        case 1:
          return 'X'
      }
    }).join('') + '\n';
  }
  return pImage.slice(0, -1);
}

const getChecksum = ({ layers }) => {
  const min = getMin({ layers });
  return min.count['1'] * min.count['2'];
}

const layers = getLayers({ tall: 6, width: 25 });
const checksum = getChecksum({ layers });

const image = generateImage({ layers });
console.log(prettyImage({ image }));