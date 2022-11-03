import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart3 } from '../../../charts';

// ---project all milestones graph 1-------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Completed',
    type: 'column',
    data: [102, 0, 130, 130, 119, 114, 112, 111]
  },
  {
    name: 'Target',
    type: 'column',
    data: [102, 102, 102, 102, 102, 102, 102, 102]
  }
];

export default function AppWebsiteVisits2() {
  const chartOptions = merge(BaseOptionChart3(), {
    stroke: { width: [2] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: [
      'Scope',
      'PR Submitted',
      'PR Raised',
      'PO Issued',
      'TSS HO',
      'TSSR Submitted',
      'TSSR approved',
      'BOQ submitted'
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
      <CardHeader title="TSSR Progress" subheader="(+43%) than last year" />
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
