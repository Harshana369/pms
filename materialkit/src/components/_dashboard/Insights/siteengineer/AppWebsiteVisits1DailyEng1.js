import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// -Daily work progress graph in dashboard---------------------------------------

const CHART_DATA = [
  {
    name: 'Completed',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37]
  },
  {
    name: 'Targeted',
    type: 'column',
    data: [44, 55, 41, 67, 22, 43, 21]
  }
];

export default function AppWebsiteVisits1DailyEng1() {
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
      <CardHeader title="Site Engineer Daily Work Progress" subheader="(+12%) than last week" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
