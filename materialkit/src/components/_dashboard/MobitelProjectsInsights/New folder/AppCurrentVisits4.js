import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Stack } from '@mui/material';
// utils
import { fNumber } from './formatNumber';
//
import { BaseOptionChart } from '../../../charts';

// -project completion pie chart in the dash board-----------------------------------------

const CHART_HEIGHT = 330;
const LEGEND_HEIGHT = 220;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [984, 643, 673, 435, 342, 223];

export default function AppCurrentVisits({ installationData }) {
  const theme = useTheme();

  const CHART_DATA = installationData;

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.pending,
      theme.palette.error.main
    ],
    labels: [
      'Installed-TX completed & Power Completed',
      'Installed-TX Completed & Power pending',
      'Installed-TX pending & Power Completed',
      'Installed-TX pending & Power Pending',
      'Installation Pending',
      'Installation Hold'
    ],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Installation" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={250} />
      </ChartWrapperStyle>
    </Card>
  );
}
