import {api} from "./api"; 

export interface Country {
    name: {
        common: string; 
    };
    population: number; 
    region: string; 
    area: number; 
    flags: {
        png: string;
    }
}

export const getCountries = async (): Promise<Country[]> => {
    const response = await api.get<Country[]>("/all"); 
    return response.data; 
}