import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    data: [
      400, 345, 430, 567, 322, 448, 470, 540, 580, 690, 400, 345, 430, 567, 322, 448, 470, 540, 580,
      322, 448, 470, 540, 580, 322, 448, 470, 540, 580, 322, 448, 470, 540, 580, 690, 690, 1100,
      992, 848, 470, 789, 123
    ]
  }
];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '25%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'Scope ',
        'PR Submitted for Survey',
        'PR Raised for Survey',
        'PO Issued for Survey',
        'HO for Survey',
        'Survey Completed',
        'TSSR approved',
        'BOQ submitted to planning',
        'HO for Implementation',
        'PR Submission for Imp',
        'PR Raised for Implementation',
        'PO Issued for Implementation',
        'PR submission for Supply',
        'PR Raised for Supply',
        'PO Issued for Supply',
        'PI Submitted',
        'PI Approved',
        'TRC Completed',
        'BOI Completed',
        'ICL Completed',
        'LC Confirmed to Open',
        'LC Draft Confirmed',
        'LC Issued',
        'Shipment Confirmed',
        'Shipped',
        'Received at Port',
        'Delivered to WH',
        'Loading Approval ',
        'Civil ',
        'SAQ ',
        'Power',
        'MCW',
        'TX',
        'Commissioned',
        'PAT pass',
        'On Air',
        'SSV/ check list',
        'WIP',
        'SAR Approved/ Scope',
        'Reconciliation',
        'PAC Supply/ Imp Approve',
        'PAC Supply/ Imp Approve'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Conversion Rates" subheader="(+23%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={1400} />
      </Box>
    </Card>
  );
}
