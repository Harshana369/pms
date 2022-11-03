import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
// ----------------------------------------------------------------------

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity)
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600]
  }
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function AppWebsiteVisits({ chartData, xaxisData }) {
  const Xaxislabels = xaxisData;
  const ChartData = chartData;
  // console.log(Xaxislabels);
  const CHART_DATA = ChartData;

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [1, 1, 1, 1, 1, 1] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 0 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: Xaxislabels,
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
      <CardHeader title="Sites Completed" subheader="Cumilative progress" />
      {/* <GreenSwitch {...label} defaultChecked size="small" /> */}
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={391} />
      </Box>
    </Card>
  );
}
