import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../charts';

// ---------------------------  project all milestones graph 4 ----------------------------------------------------------

export default function AppWebsiteVisits5({ DependancymilsetonesData }) {
  const completedData = DependancymilsetonesData[0];
  const scopeData = DependancymilsetonesData[1];

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
    plotOptions: { bar: { columnWidth: '36%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient'] },
    labels: ['SAQ', 'Infra', 'Civil', 'Power', 'TX', 'MCW', 'Equipments'],
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
      <CardHeader title="Dependancy Analysis" />
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
