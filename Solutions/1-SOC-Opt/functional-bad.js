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

const rpad = (s, count, char) => s.padEnd(count, char);
const lpad = (s, count, char) => s.padStart(count, char);

const padding = [rpad, lpad, lpad, lpad, lpad, lpad];
const width = [18, 10, 8, 8, 18, 6];

let maxDensity = 0;

const output = data
  .split('\n')
  .filter((s, i) => i && s)
  .map((line) =>
    line
      .split(',')
      .map(
        (cell, i, arr) => (
          i < 1 || i > 3 || ((cell = parseInt(cell)), (arr[i] = cell)),
          i - 3 || (maxDensity = maxDensity > cell ? maxDensity : cell),
          cell
        ),
      ),
  )
  .map(
    (row) => (
      row.push(Math.round((row[3] * 100) / maxDensity).toString()), row
    ),
  )
  .sort((r1, r2) => r2[5] - r1[5])
  .map((row) => row.map((cell, i) => padding[i](cell + '', width[i])).join(''))
  .join('\n');

console.log(output);
