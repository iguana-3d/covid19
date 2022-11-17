export interface ICasesByCity {
  city: string;
  city_ibge_code: number;
  date: string; //Date
  epidemiological_week: number;
  estimated_population: number;
  estimated_population_2019: number;
  is_last: boolean;
  is_repeated: boolean;
  last_available_confirmed: number;
  last_available_confirmed_per_100k_inhabitants: number;
  last_available_date: string; //Date
  last_available_death_rate: number;
  last_available_deaths: number;
  new_confirmed: number;
  new_deaths: number;
  order_for_place: number;
  place_type: string;
  state: string;
}

export interface ICoronaVirusCases {
  count: number;
  next: any; //Não consegui descobri o tipo de retorno deste dado, o vesmo vem como null,
  previous: any; //Não consegui descobri o tipo de retorno deste dado, o vesmo vem como null,
  results: ICasesByCity[];
}
