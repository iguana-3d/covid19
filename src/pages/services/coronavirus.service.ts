import axios from "axios";
//Types
import { ICoronaVirusCases } from "./coronavirus.types";
import dayjs, { Dayjs } from "dayjs";
//Gerar TOKEN da API em https://brasil.io/auth/tokens-api/
const config = {
  headers: { Authorization: `Token ${process.env.REACT_APP_API_TOKEN}` },
};

export const getCoronavirusCases = async (
  date: Dayjs | null,
  uf: string
): Promise<ICoronaVirusCases> => {
  const response = await axios.get<ICoronaVirusCases>(
    `${
      process.env.REACT_APP_API_BASE_URL
    }/dataset/covid19/caso_full/data?state=${uf}&is_last=True&date=${
      !!date ? dayjs(date).format("YYYY-MM-DD") : ""
    }`,
    config
  );

  return response.data;
};
