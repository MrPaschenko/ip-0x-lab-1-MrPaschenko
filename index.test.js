'use strict';

const { parseString, prepareArray, calculateCellNeighbours } = require('./index');
const fs = require('fs');

test('Check number of generation', () => {
  const string = fs.readFileSync('./input.txt', 'utf8');
  const numberOfGeneration = parseString(string)[0];
  expect(numberOfGeneration).toEqual(3);
});

test('Check width', () => {
  const string = fs.readFileSync('./input.txt', 'utf8');
  const width = parseString(string)[1][0];
  expect(width).toEqual(8);
});

test('Check height', () => {
  const string = fs.readFileSync('./input.txt', 'utf8');
  const height = parseString(string)[1][1];
  expect(height).toEqual(5);
});

test('Check array', () => {
  const string = fs.readFileSync('./input.txt', 'utf8');
  const array = parseString(string)[2];
  expect(array).toEqual([ '........', '..x.....', '..x.....', '..x.....', '........' ]);
});

test('Check prepared array', () => {
  const string = fs.readFileSync('./input.txt', 'utf8');
  const array = parseString(string)[2];
  const preparedArray = prepareArray(array);
  expect(preparedArray).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]);
});

test('Check number of cell neighbours', () => {
  const string = fs.readFileSync('./input.txt', 'utf8');
  const array = parseString(string)[2];
  const preparedArray = prepareArray(array);
  //Cell (2, 1) has 3 neighbours
  expect(calculateCellNeighbours(2, 1, preparedArray)).toEqual(3);
});
