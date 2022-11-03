import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ---project all milestones graph 3--------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Completed',
    type: 'column',
    data: [102, 102, 84, 84, 84, 84, 54, 54, 54]
  },
  {
    name: 'Target',
    type: 'column',
    data: [102, 120, 102, 140, 102, 102, 130, 102, 102]
  }
];

export default function AppWebsiteVisits4() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2, 3] },
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: [
      'PI Submitted',
      'PI Approved',
      'TRC Completed',
      'BOI Completed',
      'ICL Completed',
      'LC Issued',
      'Shipped',
      'Received at Port',
      'Delivered to WH'
    ],
    xaxis: { type: 'name' },
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
      <CardHeader title="Logistics Progress" subheader="(+43%) than last year" />
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
