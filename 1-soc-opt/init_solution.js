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

const transformStringDataToArray = (data) => data;
const removeLastElement = (data) => data;
const removeHeaders = (data) => data;
const findMaxDensity = (data) => data;
const injectDensityIndex = (data) => data;
const sortByDensityIndex = (data, maxDensity) => data;
const alignStringData = (data) => data;

const transformedData = transformStringDataToArray(data);
const dataWithoutLastElement = removeLastElement(transformedData);
const dataWithoutHeaders = removeHeaders(dataWithoutLastElement);
const maxDensity = findMaxDensity(dataWithoutHeaders);
const dataWithDensityIndex = injectDensityIndex(dataWithoutHeaders, maxDensity);
const sortedDataWithDensityIndex = sortByDensityIndex(dataWithDensityIndex);
const alignedData = alignStringData(sortedDataWithDensityIndex);

console.log(alignedData);
