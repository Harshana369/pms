import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { BaseOptionChart } from '../../charts';

//  ---------------- App dashboard cumilative graph ---------------

export default function AppWebsiteVisits({ chartData, xaxisData }) {
  const CHART_DATA = chartData;
  const xAxisData = xaxisData;

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2, 2, 2, 2, 2] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 1 } },
    fill: { type: ['solid', 'solid', 'solid', 'solid', 'solid', 'solid'] },
    labels: xAxisData,
    xaxis: { type: 'datetime' }
    // tooltip: {
    //   shared: true,
    //   intersect: false,
    //   y: {
    //     formatter: (y) => {
    //       if (typeof y !== 'undefined') {
    //         return `${y.toFixed(0)} sites`;
    //       }
    //       return y;
    //     }
    //   }
    // }
  });

  return (
    <Card>
      <CardHeader title="All Sites Completed" subheader="Cumilative progress" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={391} />
      </Box>
    </Card>
  );
}
