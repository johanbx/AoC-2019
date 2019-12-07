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

class intCodePc {
  constructor (memory, setting, name) {
    this.name = name;
    this.pointer = 0;
    this.memory = memory;
    this.buffer = [setting];
    this.end = false;
    console.log(`Created pc ${this.name}`);
  }

  run = input => {
    const output = [];
    if (input === false) {
      console.log(`${this.name} got bad input`);
      return false;
    }
    this.buffer = [...this.buffer, ...input];
    console.log(`${this.name} run at ${this.pointer} with new input `, input);
    console.log(`${this.name} buffer: `, this.buffer);
    do {
      const [
        opcodePart2,
        opcodePart1,
        param1Mode,
        param2Mode,
        // param3Mode,
      ] = this.memory[this.pointer].toString().split('').map(o => parseInt(o)).reverse();
      const opcode = parseInt(`${opcodePart1 || ''}${opcodePart2 || ''}`, 10);
      let param1 = param1Mode ? this.memory[this.pointer+1] : this.memory[this.memory[this.pointer+1]];
      let param2 = param2Mode ? this.memory[this.pointer+2] : this.memory[this.memory[this.pointer+2]];
      // let param3 = param3Mode ? memory[pointer+3] : memory[memory[pointer+3]];
      switch (opcode) {
        case 1:
            this.memory[this.memory[this.pointer+3]] = param1+param2;
            this.pointer += 4;
          break;
        case 2:
            this.memory[this.memory[this.pointer+3]] = param1*param2;
            this.pointer += 4;
          break;
        case 3:
          const input = this.buffer.shift();
          if (typeof input === 'undefined') {
            console.log(`${this.name} no input, send back ${output} and pause pc`);
            return output;
          } else {
            console.log(`${this.name} consumed ${input}`);
          }
          this.memory[this.memory[this.pointer+1]] = input;
          this.pointer += 2;
          break;
        case 4:
          console.log(`${this.name} push value ${param1}`);
          output.push(param1);
          this.pointer += 2;
          break;
        case 5:
          if (param1) {
            this.pointer = param2;
          } else {
            this.pointer += 3;
          }
          break;
        case 6:
          if (!param1) {
            this.pointer = param2;
          } else {
            this.pointer += 3;
          }
          break;
        case 7:
          if (param1 < param2) {
            this.memory[this.memory[this.pointer+3]] = 1;
          } else {
            this.memory[this.memory[this.pointer+3]] = 0;
          }
          this.pointer += 4;
          break;
        case 8:
          if (param1 === param2) {
            this.memory[this.memory[this.pointer+3]] = 1;
          } else {
            this.memory[this.memory[this.pointer+3]] = 0;
          }
          this.pointer += 4;
          break;
        case 99:
          this.end = true;
          console.log(`${this.name} finished its program`);
          return output;
        default:
          throw new Error(`Invalid opcode: ${opcode}`);
      }
    } while (true);
  }
}

const initialMemory = p7.split(',').map(o => parseInt(o, 10));

let max = 0;
getAllPermutations('01234').forEach(perm => {
  let ampA, ampB, ampC, ampD, ampE, signalA, signalB, signalC, signalD, signalE;
  const [ps0, ps1, ps2, ps3, ps4] = perm.split('').map(o => parseInt(o, 10));
  ampA = new intCodePc(initialMemory, ps0, 'A');
  ampB = new intCodePc(initialMemory, ps1, 'B');
  ampC = new intCodePc(initialMemory, ps2, 'C');
  ampD = new intCodePc(initialMemory, ps3, 'D');
  ampE = new intCodePc(initialMemory, ps4, 'E');

  signalA = ampA.run([0]);

  do {
    signalB = ampB.run(signalA);
    signalC = ampC.run(signalB);
    signalD = ampD.run(signalC);
    signalE = ampE.run(signalD);
    if (signalE[0] > max) {
      max = signalE[0];
    }
    signalA = ampA.run(signalE);
  } while (!ampE.end);
});

console.log(max)
console.log('NOPE!')