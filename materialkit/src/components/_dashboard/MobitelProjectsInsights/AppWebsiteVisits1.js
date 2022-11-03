import React, { useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Alert, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
//
import { BaseOptionChart5 } from '../../charts';

export default function AppWebsiteVisits1({ xAxisDaysLabel, weeklyProgressData, completedSites }) {
  const [alert1, setAlert1] = useState(false);
  const [alertContent1, setAlertContent1] = useState('');
  const [open1, setOpen1] = React.useState(false);

  // --------- Assigning Data To Graph ----------------------------------

  const xAxisData = xAxisDaysLabel;
  const CHART_DATA = weeklyProgressData;
  const dailyCompletedSites = completedSites;

  const chartOptions = merge(BaseOptionChart5(), {
    stroke: { width: [3, 1] },
    plotOptions: {
      bar: {
        columnWidth: '35%',
        borderRadius: 2,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    fill: { type: ['solid', 'gradient'] },
    labels: xAxisData,
    xaxis: { type: 'day' },
    tooltip: {
      shared: true,
      intersect: false,
      x: {},
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Sites`;
          }
          return y;
        }
      }
    },
    chart: {
      events: {
        // this click event used to show the Daily On Air sites when clcik on the Chart Column
        click(event, chartContext, config) {
          if (config.dataPointIndex.toString() === '0') {
            setAlertContent1(`${dailyCompletedSites[0]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '1') {
            setAlertContent1(`${dailyCompletedSites[1]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '2') {
            setAlertContent1(`${dailyCompletedSites[2]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '3') {
            setAlertContent1(`${dailyCompletedSites[3]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '4') {
            setAlertContent1(`${dailyCompletedSites[4]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '5') {
            setAlertContent1(`${dailyCompletedSites[5]}`);
            setAlert1(true);
          } else {
            setAlertContent1(`${dailyCompletedSites[6]}`);
            setAlert1(true);
          }
          // ----------------------------------------------------------------------------------
        },
        animationEnd: undefined,
        beforeMount: undefined,
        mounted: undefined,
        updated: undefined,
        mouseMove: undefined,
        mouseLeave: undefined,
        legendClick: undefined,
        markerClick: undefined,
        selection: undefined,
        dataPointSelection: undefined,
        dataPointMouseEnter: undefined,
        dataPointMouseLeave: undefined
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Daily Work Progress" /*  subheader="(+12%) than last week" */ />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={311} />
      </Box>
      <Box sx={{ width: '100%' }}>
        <Collapse in={open1}>
          {alert1 ? (
            <Alert
              variant="outlined"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen1(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle8" gutterBottom>
                {alertContent1}
              </Typography>
            </Alert>
          ) : (
            <></>
          )}
        </Collapse>
        <Button
          disabled={open1}
          variant="text"
          onClick={() => {
            setOpen1(true);
          }}
        >
          View
        </Button>
      </Box>
    </Card>
  );
}
