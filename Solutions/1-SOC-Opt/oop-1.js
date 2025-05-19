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

class City {
  #dataset;

  constructor(dataset, fields) {
    const { name, population, area, density, country } = fields;
    this.#dataset = dataset;
    this.name = name;
    this.population = parseInt(population);
    this.area = parseInt(area);
    this.density = parseInt(density);
    this.country = country;
  }

  get crowding() {
    return this.#dataset.getRelativeDensity(this.density);
  }

  render() {
    return (
      '  ' +
      this.name.padEnd(16) +
      this.population.toString().padStart(10) +
      this.area.toString().padStart(8) +
      this.density.toString().padStart(8) +
      '  ' +
      this.country.padStart(16) +
      this.crowding.toString().padStart(6)
    );
  }
}

class Dataset {
  constructor(data) {
    const lines = data.trim().split('\n').slice(1);
    this.records = lines
      .map((line) => {
        const cells = line.trim().split(',');
        const [name, population, area, density, country] = cells;
        const record = { name, population, area, density, country };
        return new City(this, record);
      })
      .sort((a, b) => b.density - a.density);
  }

  getRelativeDensity(density) {
    const maxDensity = this.records[0].density;
    return Math.round((density * 100) / maxDensity);
  }

  render() {
    return this.records.map((city) => city.render()).join('\n');
  }
}

const dataset = new Dataset(data);
const output = dataset.render();
console.log(output);
