'use strict';

const data = () => `city,population,area,density,country
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

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
const curry =
  (fn) =>
  (...args) =>
    fn.bind(null, ...args);
const map = curry((fn, arr) => arr.map(fn));
const join = curry((str, arr) => arr.join(str));
const split = curry((splitOn, str) => str.split(splitOn));
const sort = curry((compareFn, arr) => arr.toSorted(compareFn));
const filter = curry((filterFn, arr) => arr.filter(filterFn));
const first = (arr) => arr[0];
const skipFirst = (arr) => arr.slice(1);
const hasValue = (val) => !!val;
const toString = (val) => val.toString();
const concat = (row, value) => row.concat(value);
const padStart = (s, width) => s.padStart(width);
const padEnd = (s, width) => s.padEnd(width);
const pad = (index, str, width) => (index ? padStart : padEnd)(str, width);
const width = (index) => [18, 10, 8, 8, 18, 6][index];
const renderCell = (cell, index) => pad(index, toString(cell), width(index));
const renderRow = pipe(map(renderCell), join(''));
const renderTable = pipe(map(renderRow), join('\n'));
const getDensity = (row) => parseInt(row[3], 10);
const proportion = (max, val) => Math.round((parseInt(val, 10) * 100) / max);
const compareDensity = (row1, row2) => getDensity(row2) - getDensity(row1);
const sortByDensity = sort(compareDensity);
const calcMaxDensity = pipe(sortByDensity, first, getDensity);
const calcRowsProportionToMax = (rows) => (max) =>
  rows.map(pipe(getDensity, (densityCell) => proportion(max, densityCell)));
const appendProportionCell = (rows) => (proportions) =>
  rows.map((row, index) => concat(row, proportions[index]));
const appendProportionCol = (rows) =>
  pipe(
    calcMaxDensity,
    calcRowsProportionToMax(rows),
    appendProportionCell(rows),
  )(rows);
const parseTableLines = map(split(','));
const toLines = pipe(split('\n'), skipFirst, filter(hasValue));
const getDataset = pipe(data, toLines, parseTableLines);
const main = pipe(getDataset, appendProportionCol, renderTable, console.log);

main();
