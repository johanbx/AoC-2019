const { p7 } = require('./puzzle_input');

// Borrowed...
const getAllPermutations = string => {
  const results = [];
  if (string.length === 1) {
    results.push(string);
    return results;
  }
  for (let i = 0; i < string.length; i++) {
    const firstChar = string[i];
    const charsLeft = string.substring(0, i) + string.substring(i + 1);
    const innerPermutations = getAllPermutations(charsLeft);
    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

const intCodePc = (memory, buffer, returnMode = false) => {
  let pointer = 0;
  do {
    const [
      opcodePart2,
      opcodePart1,
      param1Mode,
      param2Mode,
      // param3Mode,
    ] = memory[pointer].toString().split('').map(o => parseInt(o)).reverse();
    const opcode = parseInt(`${opcodePart1 || ''}${opcodePart2 || ''}`, 10);
    let param1 = param1Mode ? memory[pointer+1] : memory[memory[pointer+1]];
    let param2 = param2Mode ? memory[pointer+2] : memory[memory[pointer+2]];
    // let param3 = param3Mode ? memory[pointer+3] : memory[memory[pointer+3]];
    switch (opcode) {
      case 1:
        memory[memory[pointer+3]] = param1+param2;
        pointer += 4;
        break;
      case 2:
        memory[memory[pointer+3]] = param1*param2;
        pointer += 4;
        break;
      case 3:
        memory[memory[pointer+1]] =buffer.shift();
        pointer += 2;
        break;
      case 4:
        if (returnMode) {
          return param1;
        } else {
          console.log(param1);
        }
        pointer += 2;
        break;
      case 5:
        if (param1) {
          pointer = param2;
        } else {
          pointer += 3;
        }
        break;
      case 6:
        if (!param1) {
          pointer = param2;
        } else {
          pointer += 3;
        }
        break;
      case 7:
        if (param1 < param2) {
          memory[memory[pointer+3]] = 1;
        } else {
          memory[memory[pointer+3]] = 0;
        }
        pointer += 4;
        break;
      case 8:
        if (param1 === param2) {
          memory[memory[pointer+3]] = 1;
        } else {
          memory[memory[pointer+3]] = 0;
        }
        pointer += 4;
        break;
      case 99:
        return memory;
      default:
        throw new Error(`Invalid opcode: ${opcode}`);
    }
  } while (true);
}

const initialMemory = p7.split(',').map(o => parseInt(o, 10));

let max = 0;
getAllPermutations('01234').forEach(perm => {
  const [s0, s1, s2, s3, s4] = perm.split('').map(o => parseInt(o, 10));
  const ampA = intCodePc(initialMemory, [s0, 0], true);
  const ampB = intCodePc(initialMemory, [s1, ampA], true);
  const ampC = intCodePc(initialMemory, [s2, ampB], true);
  const ampD = intCodePc(initialMemory, [s3, ampC], true);
  const ampE = intCodePc(initialMemory, [s4, ampD], true);
  if (ampE > max) {
    max = ampE;
  }
});
console.log(max);