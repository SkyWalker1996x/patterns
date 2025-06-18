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

const metaData = {
  cityName: {
    index: 0,
    padEnd: 18,
  },
  population: {
    index: 1,
    padStart: 10,
  },
  area: {
    index: 2,
    padStart: 8,
  },
  density: {
    index: 3,
    padStart: 8,
  },
  country: {
    index: 4,
    padStart: 18,
  },
  densityIndex: {
    index: 5,
    padStart: 6,
  },
};

const { cityName, population, area, density, country, densityIndex } = metaData;

const getArrayFromString = (string, separator) => string.split(separator);

const transformStringDataToArray = (data) => getArrayFromString(data, '\n');

const removeFirstAndLastRows = (data) => data.slice(1, -1);

const findMaxDensity = (data) => {
  let maxDensity = 0;
  for (const row of data) {
    const rowAsArray = getArrayFromString(row, ',');
    const rowDensity = Number(rowAsArray[density.index]);

    if (rowDensity > maxDensity) {
      maxDensity = rowDensity;
    }
  }
  return maxDensity;
};

// eslint-disable-next-line arrow-body-style
const injectDensityIndex = (data, maxDensity) => {
  return data.map((row) => {
    const rowAsArray = getArrayFromString(row, ',');
    const rowDensity = Number(rowAsArray[density.index]);
    const densityIndex = Math.round((rowDensity * 100) / maxDensity);

    return row + `,${densityIndex}`;
  });
};

// eslint-disable-next-line arrow-body-style
const sortByDensityIndex = (data) => {
  return data.slice().sort((cityA, cityB) => {
    const densityCityA = Number(cityA.split(',')[density.index]);
    const densityCityB = Number(cityB.split(',')[density.index]);

    return densityCityB - densityCityA;
  });
};

const printAlignedStringData = (data) => {
  for (const row of data) {
    const rowAsArray = getArrayFromString(row, ',');
    let s = rowAsArray[cityName.index].padEnd(cityName.padEnd);
    s += rowAsArray[population.index].padStart(population.padStart);
    s += rowAsArray[area.index].padStart(area.padStart);
    s += rowAsArray[density.index].padStart(density.padStart);
    s += rowAsArray[country.index].padStart(country.padStart);
    s += rowAsArray[densityIndex.index].padStart(densityIndex.padStart);
    console.log(s);
  }
};

const transformedData = transformStringDataToArray(data);
const dataWithoutFirstAndLastRows = removeFirstAndLastRows(transformedData);
const maxDensity = findMaxDensity(dataWithoutFirstAndLastRows);
const dataWithDensityIndex = injectDensityIndex(
  dataWithoutFirstAndLastRows,
  maxDensity,
);
const sortedDataWithDensityIndex = sortByDensityIndex(dataWithDensityIndex);
printAlignedStringData(sortedDataWithDensityIndex);
