import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart3 } from '../../../charts';

// ----------------------------------- project all milestones graph 1  -----------------------------------------------------

export default function AppWebsiteVisits2({ TSSRmilestonesData }) {
  const completedData = TSSRmilestonesData[0];
  const scopeData = TSSRmilestonesData[1];

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

  const chartOptions = merge(BaseOptionChart3(), {
    stroke: { width: [4, 2] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient'] },
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
      <CardHeader title="TSSR Progress" />
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
