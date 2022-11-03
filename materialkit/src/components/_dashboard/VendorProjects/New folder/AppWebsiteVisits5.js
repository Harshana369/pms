import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ------project all milestones graph 4----------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Completed',
    type: 'column',
    data: [100, 92, 40, 30, 20, 70]
  },
  {
    name: 'Pending',
    type: 'column',
    data: [102, 102, 102, 102, 102, 102]
  }
];

export default function AppWebsiteVisits5() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2] },
    plotOptions: { bar: { columnWidth: '36%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: ['Equipment Pending', 'SAQ', 'Loading Approval', 'Civil', 'Power', 'MCW', 'TX'],
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
      <CardHeader title="Dependancy Analysis" subheader="(+43%) than last year" />
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
