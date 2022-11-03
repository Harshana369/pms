import React, { useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// -Daily work progress graph in dashboard---------------------------------------

const CHART_DATA = 0;

export default function AppWebsiteVisits1({
  xAxisDaysLabel,
  weeklyProgressDataMobitel,
  weeklyProgressDataVendor,
  completedSitesMobitel,
  completedSitesVendor
}) {
  const [alert1, setAlert1] = useState(false);
  const [alertContent1, setAlertContent1] = useState('');
  const [open1, setOpen1] = React.useState(false);

  const xAxisData = xAxisDaysLabel;
  const CHART_DATA = weeklyProgressData;
  const dailyCompletedSites = completedSites;

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3, 2, 3] },
    plotOptions: { bar: { columnWidth: '21%', borderRadius: 2 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      ' .Sunday',
      ' .Monday',
      ' .Tuesday',
      ' .Wednesday',
      ' .Thursday',
      ' .Friday',
      ' .Saturday'
    ],
    xaxis: { type: 'day' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Sites`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Daily Work Progress" subheader="(+12%) than last week" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
