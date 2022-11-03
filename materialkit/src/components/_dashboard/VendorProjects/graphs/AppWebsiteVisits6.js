import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Completed',
    type: 'column',
    data: [93, 90, 90, 90, 0, 102, 102]
  },
  {
    name: 'Pending',
    type: 'line',
    data: [0, 0, 0, 0, 0]
  }
];

export default function AppWebsiteVisits6() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2] },
    plotOptions: { bar: { columnWidth: '35%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      'Project 1',
      'Project 2',
      'Project 3',
      'Project 4',
      'Project 5',
      'Project 6',
      'Project 7',
      'Project 8'
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
      <CardHeader title="Project Milestones" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
