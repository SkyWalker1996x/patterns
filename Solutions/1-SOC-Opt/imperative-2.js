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

const parseData = (data, schema) => {
  const lines = data.split('\n').slice(1);
  const records = [];
  for (const line of lines) {
    const cells = line.trim().split(',');
    const record = {};
    for (const { index, name, type } of schema) {
      const value = cells[index];
      record[name] = type === 'number' ? parseInt(value) : value;
    }
    records.push(record);
  }
  return records;
};

const calculateCrowdingColumn = (cities) => {
  cities.sort((a, b) => b.density - a.density);
  const maxDensity = cities[0].density;
  for (const city of cities) {
    city.crowding = Math.round((city.density * 100) / maxDensity);
  }
};

const showTable = (records, schema) => {
  for (const record of records) {
    let row = '';
    for (const { index, name, type, size } of schema) {
      const value = record[name];
      const line = type === 'number' ? value.toString() : '  ' + value;
      row += index ? line.padStart(size) : line.padEnd(size);
    }
    console.log(row);
  }
};

const cities = parseData(data, schema);
calculateCrowdingColumn(cities);
showTable(cities, schema);
