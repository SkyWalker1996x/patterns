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

const renderCities = (cities, crowding) => {
  const output = [];
  for (const { name, population, area, density, country } of cities) {
    const line =
      '  ' +
      name.padEnd(16) +
      population.toString().padStart(10) +
      area.toString().padStart(8) +
      density.toString().padStart(8) +
      '  ' +
      country.padStart(16) +
      crowding[name].toString().padStart(6);
    output.push(line);
  }
  return output.join('\n');
};

const parseCities = (data) => {
  const lines = data.trim().split('\n').slice(1);
  const table = [];
  for (const line of lines) {
    const cells = line.trim().split(',');
    const [name, population, area, density, country] = cells;
    table.push({
      name,
      population: parseInt(population),
      area: parseInt(area),
      density: parseInt(density),
      country,
    });
  }
  return table;
};

const calculateCrowding = (cities) => {
  const maxDensity = cities[0].density;
  const crowding = {};
  for (const { name, density } of cities) {
    crowding[name] = Math.round((density * 100) / maxDensity);
  }
  return crowding;
};

const dataset = parseCities(data);
const cities = dataset.toSorted((a, b) => b.density - a.density);
const crowding = calculateCrowding(cities);
const output = renderCities(cities, crowding);
console.log(output);
