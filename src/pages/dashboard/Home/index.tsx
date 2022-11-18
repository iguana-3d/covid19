import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import TableList from "./TableList";
import ChartDonut from "./ChartDonut";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [dateCases, setDateCases] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const [coronaVirusCasesData, setCoronaVirusCasesData] =
    useState<ICoronaVirusCases>({} as ICoronaVirusCases);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const theme = useTheme();

  const getCoronavirusCasesData = (data: any) => {
    setLoading(true);
    getCoronavirusCases(dateCases, data.uf)
      .then((responseData) => {
        setCoronaVirusCasesData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`${error.response.data.date[0]}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

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
        <form onSubmit={handleSubmit(getCoronavirusCasesData)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 1,
                }}
              >
                <Box component="span">UF</Box>
                <FormControl>
                  <Controller
                    name="uf"
                    defaultValue=""
                    control={control}
                    rules={{ required: "O campo é requerido." }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        displayEmpty
                        error={!!errors.uf}
                      >
                        {unitFederations.map((uf) => (
                          <MenuItem key={uf.value} value={uf.value}>
                            {uf.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.uf && (
                  <Typography
                    variant="body2"
                    color={theme.palette.error.main}
                    sx={{ m: 1 }}
                  >
                    Selecione uma Unidade Federativa
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
            </Grid>
          </Grid>
          <LoadingButton
            sx={{ width: "max-content", mt: 3 }}
            loading={loading}
            loadingPosition="center"
            variant="contained"
            type="submit"
          >
            Mostrar dados
          </LoadingButton>
        </form>
      </Paper>
      {!!coronaVirusCasesData.results && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
              <ChartDonut
                casesByCity={coronaVirusCasesData.results?.slice(0, 10)}
              />
            </Paper>
            <Typography
              variant="body2"
              color={theme.palette.error.main}
              sx={{ mt: 2, ml: 0.5 }}
            >
              Distribuição de porcentagem dos municípios que tem confirmações no
              dia diferente de 0
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mt: 3, overflowX: "auto" }} elevation={3}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Lista de casos por município
              </Typography>
              <TableList coronaVirusCasesData={coronaVirusCasesData} />
            </Paper>
            <Typography
              variant="body2"
              color={theme.palette.error.main}
              sx={{ mt: 2, ml: 0.5 }}
            >
              Distribuição de municípios que tem confirmações no dia diferente
              de 0 ordenados de mais confirmações no dia para menos confirmações
              no dia
            </Typography>
          </Grid>
        </Grid>
      )}
      <ToastContainer />
    </Box>
  );
};

export default Home;
