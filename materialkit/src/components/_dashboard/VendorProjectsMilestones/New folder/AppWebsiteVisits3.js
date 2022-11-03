import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ---project all milestones graph 2------------------------------------------------------
export default function AppWebsiteVisits3({ POmilsetonesData }) {
  const completedData = POmilsetonesData[0];
  const scopeData = POmilsetonesData[1];

  const CHART_DATA = [
    {
      name: 'Completed',
      type: 'column',
      data: completedData
    },
    {
      name: 'Target',
      type: 'column',
      data: scopeData
    }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2] },
    plotOptions: { bar: { columnWidth: '48%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient'] },
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
      <CardHeader title="PO Progress" />
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
