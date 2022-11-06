'use strict';

const fs = require('fs');
module.exports = { parseString, prepareArray, calculateCellNeighbours, predictCellInFuture };

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
    neigboursNum += array[line].last;
  } else if (column === (array[line].count - 1)) {
    neigboursNum += array[line][column - 1];
    neigboursNum += array[line][0];
  } else {
    neigboursNum += array[line][column + 1];
    neigboursNum += array[line][column - 1];
  }

  //Calculate alive neighbours in array above
  if (line === 0) {
    if (column === 0) {
      neigboursNum += array.last[column];
      neigboursNum += array.last[column + 1];
      neigboursNum += array.last.last;
    } else if (column === (array.last.count - 1)) {
      neigboursNum += array.last[column];
      neigboursNum += array.last[column - 1];
      neigboursNum += array.last[0];
    } else {
      neigboursNum += array.last[column];
      neigboursNum += array.last[column + 1];
      neigboursNum += array.last[column - 1];
    }
  } else if (column === 0) {
    neigboursNum += array[line - 1][column];
    neigboursNum += array[line - 1][column + 1];
    neigboursNum += array[line - 1].last;
  } else if (column === (array[line - 1].count - 1)) {
    neigboursNum += array[line - 1][column];
    neigboursNum += array[line - 1][column - 1];
    neigboursNum += array[line - 1][0];
  } else {
    neigboursNum += array[line - 1][column];
    neigboursNum += array[line - 1][column + 1];
    neigboursNum += array[line - 1][column - 1];
  }

  //Calculate alive neighbours in array below
  if (line === (array.count - 1)) {
    if (column === 0) {
      neigboursNum += array[0][column];
      neigboursNum += array[0][column + 1];
      neigboursNum += array[0].last;
    } else if (column === (array[0].count - 1)) {
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
    neigboursNum += array[line + 1].last;
  } else if (column === (array[line + 1].count - 1)) {
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

const array = parseString(string)[2];
const preparedArray = prepareArray(array);

console.log(calculateCellNeighbours(2, 1, preparedArray));
