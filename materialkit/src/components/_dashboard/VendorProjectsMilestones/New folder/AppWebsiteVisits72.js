import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ----project all milestones graph 5--------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Completed',
    type: 'column',
    data: [45, 39, 43, 10, 15, 30, 10, 37, 37]
  },
  {
    name: 'Pending',
    type: 'column',
    data: [102, 102, 102, 102, 102, 102, 102, 102, 102]
  }
];

export default function AppWebsiteVisits72() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2] },
    plotOptions: { bar: { columnWidth: '65%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', '']
    ],
    xaxis: { type: 'description' },
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
      <CardHeader title="Foreign Supply" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          width={950}
          height={330}
        />
      </Box>
    </Card>
  );
}
