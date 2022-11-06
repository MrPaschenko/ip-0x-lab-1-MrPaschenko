'use strict';

const fs = require('fs');
module.exports = { parseString };

const string = fs.readFileSync('./input.txt', 'utf8');

function parseString(string) {
  const generalArray = string.split('\n');

  const numberOfGeneration = generalArray[0];
  const width = parseInt(generalArray[1].split(' ')[0]);
  const height = parseInt(generalArray[1].split(' ')[1]);
  const size = [width, height];
  const array = generalArray.slice(2, 2 + size[1]);

  return [numberOfGeneration, size, array];
}

function prepareArray(array) {
  const newArray = [];

  for (const lineIndex in array) {
    newArray.push([]);
    for (const symbolIndex in array[lineIndex]) {
      if (array[lineIndex][symbolIndex] === '.') {
        newArray[lineIndex][symbolIndex] = 0;
      } else {
        newArray[lineIndex][symbolIndex] = 1;
      }
    }
  }

  return newArray;
}

const newArray = prepareArray(parseString(string)[2]);
console.log(newArray);
