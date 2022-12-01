'use strict';

const {
  parseString,
  prepareArray,
  calculateCellNeighbours,
  predictCellInFuture,
  calculateNextGen,
  calculateNextNumOfGen,
  prepareArrayBack
} = require('./index');

test('Check number of generation (3)', () => {
  expect(parseString(
    '3\n' +
    '8 5\n' +
    '........\n' +
    '..x.....\n' +
    '..x.....\n' +
    '..x.....\n' +
    '........\n')[0])
    .toEqual(3);
});

test('Check number of generation (5)', () => {
  expect(parseString(
    '5\n' +
    '8 5\n' +
    '........\n' +
    '..x.....\n' +
    '..x.....\n' +
    '..x.....\n' +
    '........\n')[0])
    .toEqual(5);
});

test('Check width (8)', () => {
  expect(parseString(
    '3\n' +
    '8 5\n' +
    '........\n' +
    '..x.....\n' +
    '..x.....\n' +
    '..x.....\n' +
    '........\n')[1][0])
    .toEqual(8);
});

test('Check width (4)', () => {
  expect(parseString(
    '3\n' +
    '4 5\n' +
    '....\n' +
    '..x.\n' +
    '..x.\n' +
    '..x.\n' +
    '....\n')[1][0])
    .toEqual(4);
});

test('Check height (5)', () => {
  expect(parseString(
    '3\n' +
    '8 5\n' +
    '........\n' +
    '..x.....\n' +
    '..x.....\n' +
    '..x.....\n' +
    '........\n')[1][1])
    .toEqual(5);
});

test('Check height (3)', () => {
  expect(parseString(
    '3\n' +
    '8 3\n' +
    '........\n' +
    '..x.....\n' +
    '..x.....\n')[1][1])
    .toEqual(3);
});

test('Check array (1)', () => {
  expect(parseString(
    '3\n' +
    '8 5\n' +
    '........\n' +
    '..x.....\n' +
    '..x.....\n' +
    '..x.....\n' +
    '........\n')[2])
    .toEqual([
      '........',
      '..x.....',
      '..x.....',
      '..x.....',
      '........' ]);
});

test('Check array (2)', () => {
  expect(parseString(
    '3\n' +
    '8 5\n' +
    '........\n' +
    '....x...\n' +
    '..x.x...\n' +
    '..x...x.\n' +
    '........\n')[2])
    .toEqual([
      '........',
      '....x...',
      '..x.x...',
      '..x...x.',
      '........' ]);
});

test('Check prepared array (1)', () => {
  expect(prepareArray(parseString(
    '3\n' +
    '8 5\n' +
    '........\n' +
    '..x.....\n' +
    '..x.....\n' +
    '..x.....\n' +
    '........\n')[2]))
    .toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]);
});

test('Check prepared array (2)', () => {
  expect(prepareArray(parseString(
    '3\n' +
    '8 5\n' +
    '........\n' +
    '..x...x.\n' +
    '..x...x.\n' +
    '..x...x.\n' +
    '....x...\n')[2]))
    .toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0]
    ]);
});

test('Check number of cell neighbours (1)', () => {
  expect(calculateCellNeighbours(2, 1, [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0]]))
    .toEqual(3);
});

test('Check number of cell neighbours (2)', () => {
  expect(calculateCellNeighbours(0, 1, [
    [0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 0]]))
    .toEqual(4);
});

test('Check number of cell neighbours (2)', () => {
  expect(calculateCellNeighbours(3, 4, [
    [0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 0]]))
    .toEqual(0);
});

test('Check cell future prediction', () => {
  expect(predictCellInFuture(0, 3)).toEqual(1);
  expect(predictCellInFuture(0, 2)).toEqual(0);
  expect(predictCellInFuture(0, 4)).toEqual(0);

  expect(predictCellInFuture(1, 2)).toEqual(1);
  expect(predictCellInFuture(1, 3)).toEqual(1);
  expect(predictCellInFuture(1, 1)).toEqual(0);
  expect(predictCellInFuture(1, 4)).toEqual(0);
});

test('Check array next generation calculation (1)', () => {
  expect(calculateNextGen([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]))
    .toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]);
});

test('Check array next generation calculation (2)', () => {
  expect(calculateNextGen([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]))
    .toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]);
});

test('Check array next n generations calculation', () => {
  expect(calculateNextNumOfGen([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ], 3))
    .toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]);
});

test('Check prepared back array (1)', () => {
  expect(prepareArrayBack([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]))
    .toEqual([
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', 'x', 'x', 'x', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.']
    ]);
});

test('Check prepared back array (2)', () => {
  expect(prepareArrayBack([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0]
  ]))
    .toEqual([
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', 'x', '.', 'x', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', 'x', '.', '.', 'x', '.']
    ]);
});
