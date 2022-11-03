import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// --------------------------------  project all milestones graph 3  --------------------------------------------------------

export default function AppWebsiteVisits4({ LogisticsmilsetonesData }) {
  const completedData = LogisticsmilsetonesData[0];
  const scopeData = LogisticsmilsetonesData[1];

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
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient'] },
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
      <CardHeader title="Logistics Progress" />
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
