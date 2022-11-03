import { React, useState, useEffect } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

// material
import { Card, CardHeader, Box, ButtonGroup, Button } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
// ---------------------------------------------------

export default function AppWebsiteVisits({ chartData, chartDataMonthly, xaxisData }) {
  const [showChartData, setShowChartData] = useState(chartData);
  const Xaxislabels = xaxisData;

  useEffect(() => {
    getCumilativeData();
  }, [xaxisData]);

  const getCumilativeData = () => {
    setShowChartData(chartData);
  };

  const getMonthlyData = async () => {
    setShowChartData(chartDataMonthly);
  };

  const buttons = [
    <Button onClick={getCumilativeData} key="one">
      Cumilative Progress
    </Button>,
    <Button onClick={getMonthlyData} key="two">
      Monthly Progress&nbsp;&nbsp;&nbsp;
    </Button>
  ];

  const CHART_DATA = [
    {
      name: 'On Air',
      type: 'column',
      data: showChartData[0]
    },
    {
      name: 'PAT',
      type: 'column',
      data: showChartData[1]
    },
    {
      name: 'SAR',
      type: 'column',
      data: showChartData[2]
    },
    {
      name: 'Commisioned',
      type: 'column',
      data: showChartData[3]
    },
    {
      name: 'Installed',
      type: 'column',
      data: showChartData[4]
    },
    {
      name: 'Mobilized',
      type: 'column',
      data: showChartData[5]
    }
  ];

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
      <CardHeader title="Sites Completed" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: -0.5
          }
        }}
      >
        <ButtonGroup color="secondary" size="small" aria-label="small button group">
          {buttons}
        </ButtonGroup>
      </Box>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={391} />
      </Box>
    </Card>
  );
}
