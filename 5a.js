const { p5 } = require('./puzzle_input');

const intCodePc = (initialMemory, initialBuffer) => {
  let buffer = initialBuffer;
  let memory = initialMemory;
  let pointer = 0;
  let saveTo, param1, param2;
  do {
    const [
      opcodePart2,
      opcodePart1,
      param1Mode,
      param2Mode,
      param3Mode,
    ] = memory[pointer].toString().split('').map(o => parseInt(o)).reverse();
    const opcode = parseInt(`${opcodePart1 || ''}${opcodePart2 || ''}`, 10);
    switch (opcode) {
      case 1:
      case 2:
        let operator = {
          1: '+',
          2: '*'
        }[opcode]
        param1 = param1Mode ? memory[pointer+1] : memory[memory[pointer+1]];
        param2 = param2Mode ? memory[pointer+2] : memory[memory[pointer+2]];
        saveTo = memory[pointer+3];
        memory[saveTo] = eval(`${param1}${operator}${param2}`);
        pointer += 4;
        break;
      case 3:
        saveTo = memory[pointer+1];
        memory[saveTo] = buffer.pop();
        pointer += 2;
        break;
      case 4:
        param1 = param1Mode ? memory[pointer+1] : memory[memory[pointer+1]];
        console.log(param1);
        pointer += 2;
        break;
      case 99:
        return memory;
    }
  } while (true);
}

const initialMemory = p5.split(',').map(o => parseInt(o, 10));
const initialBuffer = [1];
const mem = intCodePc(initialMemory, initialBuffer);