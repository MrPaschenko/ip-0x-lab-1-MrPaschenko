'use strict';

const fs = require('fs');
module.exports = {
  parseString,
  prepareArray,
  calculateCellNeighbours,
  predictCellInFuture,
  calculateNextGen,
  calculateNextNumOfGen
};

const string = fs.readFileSync('./input.txt', 'utf8');

function parseString(string) {
  const generalArray = string.split('\n');

  const numberOfGeneration = parseInt(generalArray[0]);
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

function calculateCellNeighbours(line, column, array) {
  let neigboursNum = 0;
  if (column === 0) {
    neigboursNum += array[line][column + 1];
    neigboursNum += array[line][array[line].length - 1];
  } else if (column === (array[line].length - 1)) {
    neigboursNum += array[line][column - 1];
    neigboursNum += array[line][0];
  } else {
    neigboursNum += array[line][column + 1];
    neigboursNum += array[line][column - 1];
  }

  //Calculate alive neighbours in array above
  if (line === 0) {
    if (column === 0) {
      neigboursNum += array[array.length - 1][column];
      neigboursNum += array[array.length - 1][column + 1];
      neigboursNum += array[array.length - 1].last;
    } else if (column === (array[array.length - 1].length - 1)) {
      neigboursNum += array[array.length - 1][column];
      neigboursNum += array[array.length - 1][column - 1];
      neigboursNum += array[array.length - 1][0];
    } else {
      neigboursNum += array[array.length - 1][column];
      neigboursNum += array[array.length - 1][column + 1];
      neigboursNum += array[array.length - 1][column - 1];
    }
  } else if (column === 0) {
    neigboursNum += array[line - 1][column];
    neigboursNum += array[line - 1][column + 1];
    neigboursNum += array[line - 1][array[line - 1].length - 1];
  } else if (column === (array[line - 1].length - 1)) {
    neigboursNum += array[line - 1][column];
    neigboursNum += array[line - 1][column - 1];
    neigboursNum += array[line - 1][0];
  } else {
    neigboursNum += array[line - 1][column];
    neigboursNum += array[line - 1][column + 1];
    neigboursNum += array[line - 1][column - 1];
  }

  //Calculate alive neighbours in array below
  if (line === (array.length - 1)) {
    if (column === 0) {
      neigboursNum += array[0][column];
      neigboursNum += array[0][column + 1];
      neigboursNum += array[0][array[0].length - 1];
    } else if (column === (array[0].length - 1)) {
      neigboursNum += array[0][column];
      neigboursNum += array[0][column - 1];
      neigboursNum += array[0][0];
    } else {
      neigboursNum += array[0][column];
      neigboursNum += array[0][column + 1];
      neigboursNum += array[0][column - 1];
    }
  } else if (column === 0) {
    neigboursNum += array[line + 1][column];
    neigboursNum += array[line + 1][column + 1];
    neigboursNum += array[line + 1][array[line + 1].length - 1];
  } else if (column === (array[line + 1].length - 1)) {
    neigboursNum += array[line + 1][column];
    neigboursNum += array[line + 1][column - 1];
    neigboursNum += array[line + 1][0];
  } else {
    neigboursNum += array[line + 1][column];
    neigboursNum += array[line + 1][column + 1];
    neigboursNum += array[line + 1][column - 1];
  }
  return neigboursNum;
}

function predictCellInFuture(cell, neigboursNum) {
  let cellInFuture = 0;

  if (cell === 0) {
    if (neigboursNum === 3) {
      cellInFuture = 1;
    }
  } else if (neigboursNum === 2 || neigboursNum === 3) {
    cellInFuture = 1;
  }

  return cellInFuture;
}

function calculateNextGen(array) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray.push([]);
    for (let k = 0; k < array[i].length; k++) {
      newArray[i].push(predictCellInFuture(array[i][k], calculateCellNeighbours(i, k, array)));
    }
  }

  return newArray;
}

function calculateNextNumOfGen(array, gen) {
  let newArray = [];

  for (let i = 0; i <= gen; i++) {
    newArray = calculateNextGen(array);
  }

  return newArray;
}

const array = parseString(string)[2];
const preparedArray = prepareArray(array);
