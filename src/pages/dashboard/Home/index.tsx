import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
//Components
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TableList from "./TableList";
//Services
import { getCoronavirusCases } from "../../services/coronavirus.service";
//Types
import { ICoronaVirusCases } from "../../services/coronavirus.types";

const unitFederations = [
  { value: "AC", label: "AC" },
  { value: "AL", label: "AL" },
  { value: "AP", label: "AP" },
  { value: "AM", label: "AM" },
  { value: "BA", label: "BA" },
  { value: "CE", label: "CE" },
  { value: "DF", label: "DF" },
  { value: "ES", label: "ES" },
  { value: "GO", label: "GO" },
  { value: "MA", label: "MA" },
  { value: "MT", label: "MT" },
  { value: "MS", label: "MS" },
  { value: "MG", label: "MG" },
  { value: "PA", label: "PA" },
  { value: "PB", label: "PB" },
  { value: "PR", label: "PR" },
  { value: "PE", label: "PE" },
  { value: "PI", label: "PI" },
  { value: "RJ", label: "RJ" },
  { value: "RN", label: "RN" },
  { value: "RS", label: "RS" },
  { value: "RO", label: "RO" },
  { value: "RR", label: "RR" },
  { value: "SC", label: "SC" },
  { value: "SP", label: "SP" },
  { value: "SE", label: "SE" },
  { value: "TO", label: "TO" },
];

const Home: React.FC = () => {
  const [unitFederation, setUnitFederation] = useState<string>("");
  const [dateCases, setDateCases] = useState<Dayjs | null>(null);
  const [coronaVirusCasesData, setCoronaVirusCasesData] =
    useState<ICoronaVirusCases>({} as ICoronaVirusCases);

  const handleUnitFederationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUnitFederation(event.target.value);
  };

  const data = {
    series: [
      {
        color: "rgba(86, 100, 210, 0.5)",
        data: 10,
        label: "Cidade 1",
      },
      {
        color: "#FFB547",
        data: 10,
        label: "Cidade 2",
      },
      {
        color: "#7BC67E",
        data: 20,
        label: "Cidade 3",
      },
    ],
  };

  const sanitizeCoronaVirusChartData = () => {
    // return !!coronaVirusCasesData && coronaVirusCasesData.results.slice(0, 5).map((casesByCity) => {
    //   return {
    //     color: "rgba(86, 100, 210, 0.5)",
    //     data: casesByCity.last_available_confirmed,
    //     label: casesByCity.city,
    //   };
    // });
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: data.series.map((item) => item.color),
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    labels: data.series.map((item) => item.label),
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
  };

  const getCoronavirusCasesData = () => {
    getCoronavirusCases(dateCases, unitFederation).then((responseData) => {
      setCoronaVirusCasesData(responseData);
    });
  };

  useEffect(() => {
    !!coronaVirusCasesData &&
      console.log(
        "sanitizeCoronaVirusChartData",
        sanitizeCoronaVirusChartData()
      );
  }, [coronaVirusCasesData]);

  return (
    <Box>
      <Typography variant="h2">Covid-19</Typography>
      <Typography variant="body1">
        Boletins informativos e casos de coronavírus por município por dia
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
        <Typography variant="h2">Relatório de Casos</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box component="span">UF</Box>
          <TextField
            select
            value={unitFederation}
            fullWidth
            onChange={handleUnitFederationChange}
          >
            {unitFederations.map((uf) => (
              <MenuItem key={uf.value} value={uf.value}>
                {uf.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box component="span">Data</Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dateCases}
              onChange={(newValue) => {
                setDateCases(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Button onClick={getCoronavirusCasesData} variant="contained">
          Mostrar dados
        </Button>
      </Paper>
      <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
        <Typography variant="body1">
          Distribuição de casos de COVID-19
        </Typography>
        <Chart
          height={200}
          options={chartOptions}
          series={data.series.map((item) => item.data)}
          type="donut"
        />
        <Grid container>
          {data.series.map((item) => (
            <Grid
              item
              key={item.label}
              sx={{
                alignItems: "center",
                display: "flex",
                p: 1,
              }}
              xs={6}
            >
              <Box
                sx={{
                  backgroundColor: item.color,
                  borderRadius: "50%",
                  height: 16,
                  mr: 1,
                  width: 16,
                }}
              />
              <Typography variant="subtitle2">{item.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Typography variant="body2">
        Distribuição de porcentagem dos municípios que tem confirmações no dia
        diferente de 0
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
        <Typography variant="body1">Lista de casos por município</Typography>
        <TableList coronaVirusCasesData={coronaVirusCasesData} />
      </Paper>
      <Typography variant="body2">
        Distribuição de municípios que tem confirmações no dia diferente de 0
        ordenados de mais confirmações no dia para menos confirmações no dia
      </Typography>
    </Box>
  );
};

export default Home;
