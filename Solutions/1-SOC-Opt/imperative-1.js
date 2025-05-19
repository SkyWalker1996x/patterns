'use strict';

const parseCities = (data) => {
  const lines = data.split('\n').slice(1);
  const cities = [];
  for (const line of lines) {
    const cells = line.trim().split(',');
    const [name, population, area, density, country] = cells;
    cities.push({
      name,
      population: parseInt(population),
      area: parseInt(area),
      density: parseInt(density),
      country,
    });
  }
  return cities;
};

const calculateCrowdingColumn = (cities) => {
  cities.sort((a, b) => b.density - a.density);
  const maxDensity = cities[0].density;
  for (const city of cities) {
    city.crowding = Math.round((city.density * 100) / maxDensity);
  }
};

const showTable = (cities) => {
  for (const city of cities) {
    const line =
      '  ' +
      city.name.padEnd(16) +
      city.population.toString().padStart(10) +
      city.area.toString().padStart(8) +
      city.density.toString().padStart(8) +
      '  ' +
      city.country.padStart(16) +
      city.crowding.toString().padStart(6);
    console.log(line);
  }
};

module.exports = {
  parseCities,
  calculateCrowdingColumn,
  showTable,
};
