import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'On Air',
    type: 'line',
    data: [63, 79, 74, 78, 72, 79, 60, 58, 78, 65, 78, 75, 66]
  },
  {
    name: 'PAT',
    type: 'line',
    data: [56, 25, 66, 38, 62, 22, 43, 21, 41, 47, 36, 47, 29]
  },
  {
    name: 'SAR',
    type: 'line',
    data: [46, 55, 46, 68, 47, 22, 43, 47, 51, 41, 56, 47, 43]
  },
  {
    name: 'Commisioned',
    type: 'line',
    data: [35, 65, 26, 62, 30, 71, 47, 35, 44, 52, 29, 66, 19]
  },
  {
    name: 'Installed',
    type: 'line',
    data: [32, 55, 66, 10, 62, 47, 25, 45, 24, 42, 39, 67, 34]
  },
  {
    name: 'Mobilized',
    type: 'line',
    data: [30, 25, 36, 47, 62, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

export default function AppWebsiteVisitsEng1() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2.5, 2, 2, 2, 2, 2] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: [
      '01/01/2021',
      '02/01/2021',
      '03/01/2021',
      '04/01/2021',
      '05/01/2021',
      '06/01/2021',
      '07/01/2021',
      '08/01/2021',
      '09/01/2021',
      '10/01/2021',
      '11/01/2021',
      '12/01/2021',
      '01/01/2022'
    ],
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
      <CardHeader title="Sites Completed" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={391} />
      </Box>
    </Card>
  );
}
