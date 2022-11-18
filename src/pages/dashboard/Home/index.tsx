import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { ApexOptions } from "apexcharts";
import dayjs, { Dayjs } from "dayjs";
import Chart from "react-apexcharts";
import TableList from "./TableList";
//Services
import { getCoronavirusCases } from "../../services/coronavirus.service";
//Types
import { ICoronaVirusCases } from "../../services/coronavirus.types";

const unitFederations = [
  { value: "", label: "Selecione" },
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
  const theme = useTheme();

  const handleUnitFederationChange = (event: SelectChangeEvent) => {
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
      <Typography variant="h3">Covid-19</Typography>
      <Typography variant="body1">
        Boletins informativos e casos de coronavírus por município por dia
      </Typography>
      <Paper
        sx={{ p: 3, mt: 3, display: "flex", flexDirection: "column", gap: 3 }}
        elevation={3}
      >
        <Typography variant="h3">Relatório de Casos</Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              width: "100%",
              gap: 1,
            }}
          >
            <Box component="span">UF</Box>
            <FormControl fullWidth>
              <Select
                value={unitFederation}
                onChange={handleUnitFederationChange}
                fullWidth
                displayEmpty
              >
                {unitFederations.map((uf) => (
                  <MenuItem key={uf.value} value={uf.value}>
                    {uf.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              select
              value={unitFederation}
              onChange={handleUnitFederationChange}
              fullWidth
            >
              {unitFederations.map((uf) => (
                <MenuItem key={uf.value} value={uf.value}>
                  {uf.label}
                </MenuItem>
              ))}
            </TextField> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              width: "100%",
              gap: 1,
            }}
          >
            <Box component="span">Data</Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                maxDate={dayjs(Date.now())}
                value={dateCases}
                onChange={(newValue) => {
                  setDateCases(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Button
          onClick={getCoronavirusCasesData}
          variant="contained"
          sx={{ width: "max-content" }}
        >
          Mostrar dados
        </Button>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
          <Typography variant="body2" color={theme.palette.error.main} sx={{ mt: 2, ml: .5 }}>
            Distribuição de porcentagem dos municípios que tem confirmações no
            dia diferente de 0
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
            <Typography variant="body1">
              Lista de casos por município
            </Typography>
            <TableList coronaVirusCasesData={coronaVirusCasesData} />
          </Paper>
          <Typography variant="body2" color={theme.palette.error.main} sx={{ mt: 2, ml: .5 }}>
            Distribuição de municípios que tem confirmações no dia diferente de
            0 ordenados de mais confirmações no dia para menos confirmações no
            dia
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
