import { api } from "./api";

export interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  area: number;
  flags: {
    png: string;
  };
}

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await api.get<Country[]>(
    "/all?fields=name,population,region,area,flags" 
  );
  return response.data;
};
