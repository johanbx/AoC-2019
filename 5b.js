const { p5 } = require('./puzzle_input');

const intCodePc = (initialMemory, initialBuffer) => {
  let buffer = initialBuffer;
  let memory = initialMemory;
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
        memory[memory[pointer+1]] = buffer.pop();
        pointer += 2;
        break;
      case 4:
        console.log(param1);
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

const initialMemory = p5.split(',').map(o => parseInt(o, 10));
const initialBuffer = [5];
const mem = intCodePc(initialMemory, initialBuffer);