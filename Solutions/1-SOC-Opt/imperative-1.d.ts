export interface City {
  name: string;
  population: number;
  area: number;
  density: number;
  country: string;
  crowding?: number;
}

export function parseCities(data: string): City[];

export function calculateCrowdingColumn(cities: City[]): void;

export function showTable(cities: City[]): void;
