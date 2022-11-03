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

// ---------------------------  Daily work progress graph in dashboard----------------------------

export default function AppWebsiteVisits1({
  xAxisDaysLabel,
  weeklyProgressDataMobitel,
  weeklyProgressDataVendor,
  completedSitesMobitel,
  completedSitesVendor
}) {
  const [alert1, setAlert1] = useState(false);
  const [alertContent1, setAlertContent1] = useState('');
  const [open1, setOpen1] = React.useState(false);

  const weeklyProgress1 = weeklyProgressDataMobitel[0].data;
  const weeklyProgress2 = weeklyProgressDataVendor[0].data;
  const weeklyProgress = weeklyProgress1.map((a, i) => a + weeklyProgress2[i]);

  const weeklyTarget1 = weeklyProgressDataMobitel[1].data;
  const weeklyTarget2 = weeklyProgressDataVendor[1].data;
  const weeklyTarget = weeklyTarget1.map((a, i) => a + weeklyTarget2[i]);

  const weeklyProgressData = [];
  weeklyProgressData.push(
    { name: 'Completed', type: 'column', data: weeklyProgress },
    { name: 'Targeted', type: 'column', data: weeklyTarget }
  );

  // --------- Assigning Data To Graph ----------------------------------

  const xAxisData = xAxisDaysLabel;

  const CHART_DATA = weeklyProgressData;
  const CompletedSites = completedSitesMobitel.map((a, i) => a.concat(completedSitesVendor[i]));

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
    fill: { type: ['solid', 'gradient', 'solid'] },
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
            setAlertContent1(`${CompletedSites[0]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '1') {
            setAlertContent1(`${CompletedSites[1]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '2') {
            setAlertContent1(`${CompletedSites[2]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '3') {
            setAlertContent1(`${CompletedSites[3]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '4') {
            setAlertContent1(`${CompletedSites[4]}`);
            setAlert1(true);
          } else if (config.dataPointIndex.toString() === '5') {
            setAlertContent1(`${CompletedSites[5]}`);
            setAlert1(true);
          } else {
            setAlertContent1(`${CompletedSites[6]}`);
            setAlert1(true);
          }
          // ---------------------------------------------------------------------------------------
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
      <CardHeader title="Daily Work Progress" />
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
