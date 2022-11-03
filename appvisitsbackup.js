import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
// --------------- material
import { Card, CardHeader, Box } from '@mui/material';
import { BaseOptionChart } from '../../charts';

// // -- App dashboard cumilative graph ------------------------------

export default function AppWebsiteVisits() {
  // Graph data of number of sites Mobilized in each month assigned from setData(res.data.MobiSept) in below useEffect //
  // Assigning "setData" values to "data" variable to send it to the Graph values in below
  const [chartDataForFrontEnd, setData1] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8072/sites')
      .then((res) => {
        console.log(res.data.MobiAug); // sample data sent from backend to front end received as MobiAug
        setData1(res.data.chartDataForFrontEnd); // Graph data of number of sites Mobilized in each month assigning to useState by setData in the above of this page
        console.log(res.data.chartDataForFrontEnd);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data1 = [22, 0, 0, 0, 0, 0, 40, 69, 153, 179, 189, 199];
  const data2 = [34, 0, 0, 0, 0, 0, 0, 0, 52, 99, 193, 225];
  const data3 = [6, 0, 0, 0, 0, 0, 0, 12, 29, 106, 136, 167];
  const data4 = [6, 0, 0, 0, 0, 0, 0, 12, 29, 106, 136, 167];
  const data5 = [6, 0, 0, 0, 0, 0, 0, 12, 29, 106, 136, 167];
  const data6 = chartDataForFrontEnd; // Assigned "setData" values to "data" variable useState hook above taken here and assigned it back to "data1" in here to represent in the graph

  const CHART_DATA = [
    {
      name: 'On Air',
      type: 'column',
      data: data1
    },
    {
      name: 'PAT',
      type: 'column',
      data: data2
    },
    {
      name: 'SAR',
      type: 'column',
      data: data3
    },
    {
      name: 'Commisioned',
      type: 'column',
      data: data4
    },
    {
      name: 'Installed',
      type: 'column',
      data: data5
    },
    {
      name: 'Mobilized',
      type: 'column',
      data: data6
    }
  ];

  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(
      moment()
        .year(2021)
        .month(i + 1)
        .date(0)
        .endOf('month')
        .format('MM-YY')
    );
  }
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 2, 2, 2, 2, 2] },
    plotOptions: { bar: { columnWidth: '50%', borderRadius: 1 } },
    fill: { type: ['solid', 'solid', 'solid', 'solid', 'solid', 'solid'] },
    labels: months,
    xaxis: {
      type: 'date',
      time: {
        unit: 'month'
      }
    },
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
      <CardHeader title="All Sites Completed" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={391} />
      </Box>
    </Card>
  );
}
