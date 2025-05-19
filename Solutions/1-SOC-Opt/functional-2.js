'use strict';

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

const schema = [
  { index: 0, name: 'city', type: 'string', size: 18 },
  { index: 1, name: 'population', type: 'number', size: 10 },
  { index: 2, name: 'area', type: 'number', size: 8 },
  { index: 3, name: 'density', type: 'number', size: 8 },
  { index: 4, name: 'country', type: 'string', size: 18 },
  { index: 5, name: 'crowding', type: 'number', size: 6 },
];

const pipe = (...funcs) => {
  const apply = (x, fn) => fn(x);
  return (x) => funcs.reduce(apply, x);
};

const proportion = (max, val) => Math.round((val * 100) / max);

const parseDataset = (data) => {
  const lines = data.trim().split('\n').slice(1);
  return lines.map((line) => line.trim().split(','));
};

const createNormalizer = (schema) => (dataset) =>
  dataset.map((row) =>
    schema.reduce((record, { index, name, type }) => {
      const value = row[index];
      record[name] = type === 'number' ? parseInt(value) : value;
      return record;
    }, {}),
  );

const calculateCrowding = (records) => {
  const cities = records.toSorted((a, b) => b.density - a.density);
  const maxDensity = cities[0].density;
  return cities.map((record) => {
    const crowding = proportion(maxDensity, record.density);
    return { ...record, crowding };
  });
};

const createRenderer = (schema) => (records) => {
  const lines = records.map((record) => {
    const cells = schema.map(({ index, name, type, size }) => {
      const value = record[name];
      const line = type === 'number' ? value.toString() : '  ' + value;
      return index ? line.padStart(size) : line.padEnd(size);
    });
    return cells.join('');
  });
  return lines.join('\n');
};

const main = pipe(
  parseDataset,
  createNormalizer(schema),
  calculateCrowding,
  createRenderer(schema),
  console.log,
);

main(data);
