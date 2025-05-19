'use strict';

const test = require('node:test');
const assert = require('node:assert');

const {
  parseCities,
  calculateCrowdingColumn,
  showTable,
} = require('./imperative-1.js');

const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

test('Parse city data', () => {
  const cities = parseCities(data);
  assert.strictEqual(cities.length, 10);
  const expected = {
    name: 'Shanghai',
    population: 24256800,
    area: 6340,
    density: 3826,
    country: 'China',
  };
  assert.deepStrictEqual(cities[0], expected);
});

test('Calculate crowding', () => {
  const cities = parseCities(data);
  calculateCrowdingColumn(cities);

  assert.strictEqual(cities[0].name, 'Lagos');

  const tokyo = cities.find(({ name }) => name === 'Tokyo');

  const maxDensity = cities[0].density;
  const expectedCrowding = Math.round((tokyo.density * 100) / maxDensity);

  assert.strictEqual(tokyo.crowding, expectedCrowding);
});

test('Output the table', () => {
  const cities = parseCities(data);
  calculateCrowdingColumn(cities);

  let output = '';
  const originalConsoleLog = console.log;
  console.log = (msg) => {
    output += msg + '\n';
  };

  try {
    showTable(cities);
    assert.ok(output.includes('Lagos'));
    assert.ok(output.includes('100'));
    assert.ok(output.includes('New York City'));
  } finally {
    console.log = originalConsoleLog;
  }
  console.log(output);
});
