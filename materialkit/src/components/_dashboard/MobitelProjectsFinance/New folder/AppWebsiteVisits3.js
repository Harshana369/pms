import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ---project all milestones graph 2------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Completed',
    type: 'column',
    data: [93, 90, 90, 90, 0, 102, 102]
  },
  {
    name: 'Target',
    type: 'column',
    data: [102, 102, 102, 102, 102, 102, 102]
  }
];

export default function AppWebsiteVisits3() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2] },
    plotOptions: { bar: { columnWidth: '48%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: [
      'Imp HO',
      'PR Submission for Imp',
      'PR Raised for Imp',
      'PO Issued for Imp',
      'PR sub for Supply',
      'PR Raised for Supply',
      'PO Issued for Supply'
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
      <CardHeader title="PO Progress" subheader="(+43%) than last year" />
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
