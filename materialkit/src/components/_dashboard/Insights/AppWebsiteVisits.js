import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ chartData, xaxisData }) {
  const Xaxislabels = xaxisData;

  const CHART_DATA = [
    {
      name: 'On Air',
      type: 'column',
      data: chartData[0]
    },
    {
      name: 'PAT',
      type: 'column',
      data: chartData[1]
    },
    {
      name: 'SAR',
      type: 'column',
      data: chartData[2]
    },
    {
      name: 'Commisioned',
      type: 'column',
      data: chartData[3]
    },
    {
      name: 'Installed',
      type: 'column',
      data: chartData[4]
    },
    {
      name: 'Mobilized',
      type: 'column',
      data: chartData[5]
    }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [1, 1, 1, 1, 1, 1] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 0 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: Xaxislabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} sites`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Sites Completed" subheader="Cumilative progress" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={391} />
      </Box>
    </Card>
  );
}
