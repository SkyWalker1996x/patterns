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

const schema = {
  city: { type: 'string', size: 18 },
  population: { type: 'number', size: 10 },
  area: { type: 'number', size: 8 },
  density: { type: 'number', size: 8, order: 'desc' },
  country: { type: 'string', size: 18 },
  crowding: { type: 'number', size: 6 },
};

class City {
  #dataset;
  #schema;

  constructor(fields, dataset, schema) {
    const { city, population, area, density, country } = fields;
    this.#dataset = dataset;
    this.#schema = schema;
    this.name = city;
    this.population = parseInt(population);
    this.area = parseInt(area);
    this.density = parseInt(density);
    this.country = country;
  }

  get crowding() {
    const maxDensity = this.#dataset.records[0].density;
    return Math.round((this.density * 100) / maxDensity);
  }

  get city() {
    return this.name;
  }

  render() {
    const output = this.#schema.fields.map((field) => {
      const { index, name, type, size } = field;
      const value = this[name];
      const line = type === 'number' ? value.toString() : value;
      return index ? line.padStart(size) : line.padEnd(size);
    });
    return output.join('');
  }
}

class Schema {
  constructor(fields, Entity) {
    const toDefinitions = ([name, def], index) => ({ index, name, ...def });
    this.fields = Object.entries(fields).map(toDefinitions);
    this.compare = () => 0;
    for (const field of this.fields) {
      if (field.order) {
        const order = field.order === 'desc' ? 1 : -1;
        const col = field.name;
        this.compare = (a, b) => (b[col] > a[col] ? order : -order);
      }
    }
    this.Entity = Entity;
  }

  create(cells, dataset) {
    const record = {};
    for (const { index, name, type } of this.fields) {
      const value = cells[index];
      if (value) {
        record[name] = type === 'number' ? parseInt(value) : value;
      }
    }
    return new this.Entity(record, dataset, this);
  }
}

class Dataset {
  constructor(data, schema) {
    this.records = [];
    this.schema = schema;
    const lines = data.trim().split('\n').slice(1);
    for (const line of lines) {
      const cells = line.split(',');
      const record = schema.create(cells, this);
      this.records.push(record);
    }
    this.records.sort(schema.compare);
  }

  render() {
    const lines = this.records.map((record) => record.render());
    return lines.join('\n');
  }
}

const citySchema = new Schema(schema, City);
const dataset = new Dataset(data, citySchema);
const output = dataset.render();
console.log(output);
