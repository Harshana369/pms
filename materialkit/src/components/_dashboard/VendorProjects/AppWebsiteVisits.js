import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'On Air',
    type: 'column',
    data: [0, 0, 0, 0, 0, 0, 0, 28, 58, 119, 144]
  },
  {
    name: 'PAT',
    type: 'column',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 52, 99, 193]
  },
  {
    name: 'SAR',
    type: 'column',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 12, 29, 106]
  },
  {
    name: 'Commisioned',
    type: 'column',
    data: [0, 0, 0, 0, 0, 0, 0, 28, 63, 136, 178]
  },
  {
    name: 'Installed',
    type: 'column',
    data: [0, 0, 0, 0, 0, 0, 0, 30, 65, 137, 177]
  },
  {
    name: 'Mobilized',
    type: 'column',
    data: [0, 0, 0, 0, 0, 0, 0, 40, 69, 153, 179]
  }
];

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2.5, 2, 2, 2, 2, 2] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 0 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: [
      '01/01/2021',
      '02/01/2021',
      '03/01/2021',
      '04/01/2021',
      '05/01/2021',
      '06/01/2021',
      '07/01/2021',
      '08/01/2021',
      '09/01/2021',
      '10/01/2021',
      '11/01/2021',
      '12/01/2021',
      '01/01/2022'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} sites`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Sites Completed" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={391} />
      </Box>
    </Card>
  );
}
