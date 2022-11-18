import React, { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { ICasesByCity } from "../../services/coronavirus.types";
import randomColor from "randomcolor";
import { Box, Grid, Typography } from "@mui/material";

interface IProps {
  casesByCity: ICasesByCity[];
}

const ChartDonut: React.FC<IProps> = ({ casesByCity }) => {
  const data = useMemo(() => {
    return (
      {
        series: casesByCity
      ?.filter((caseByCity) => !!caseByCity.city)
      ?.map((caseByCity) => {
        return {
          color: randomColor(),
          data: caseByCity.last_available_confirmed,
          label: caseByCity.city,
        };
      }),
      }
    )
  }, [casesByCity])

  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: !!casesByCity ? data.series?.map((item) => item.color) : [],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    labels: !!casesByCity ? data.series?.map((item) => item.label) : [],
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
  };

  const percentTooltip = (caseForLoop: number) => {
    let sum = 0;
    for (const cases of data.series) {
      sum += cases.data;
    }
    return (caseForLoop / sum) * 100;
  };

  return (
    <React.Fragment>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Distribuição de casos de COVID-19
      </Typography>
      {!!casesByCity && (
        <Chart
          height={300}
          options={chartOptions}
          series={!!casesByCity ? data.series?.map((item) => item.data) : [0]}
          type="donut"
        />
      )}
      <Grid container>
        {data?.series?.map((item) => (
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
            <Typography variant="subtitle2">
              Cidade {item.label} - {item.data} casos <br /> (
              {percentTooltip(item.data).toFixed(2)}%)
            </Typography>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ChartDonut;
