'use strict';

const { parseString, } = require('./index');
const fs = require('fs');

// test('Check number of generation', () => {
//
// });

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
