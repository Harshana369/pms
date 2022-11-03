import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Stack, Typography, Grid } from '@mui/material';
//
import { BaseOptionChart2 } from '../../charts';

// ---------------------------  46 Milestone graph in insights  ---------------------------------------

// ----------------------------------------
export default function AppWebsiteVisits2({ AllmilestoneData }) {
  const chartData = AllmilestoneData;

  const CHART_DATA = [
    {
      name: 'Completed Count',
      type: 'bar',
      data: chartData
    },
    {
      name: 'Expand',
      type: 'column',
      data: [0]
    }
  ];

  const chartOptions = merge(BaseOptionChart2(), {
    stroke: { width: [1] },
    plotOptions: { bar: { columnWidth: '100%', borderRadius: 1 } },
    fill: { type: ['gradient', 'gradient'] },
    labels: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      '46'
    ],
    xaxis: { type: 'description' }
  });

  return (
    <Card>
      <CardHeader title="Project all milestones" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
        <table className="fixed">
          <tr>
            <td>
              <div style={{ width: '150px' }}>
                <Typography variant="caption">
                  <dl>
                    <dt>1 - Scope </dt>
                    <dt>2 - PR Submitted </dt>
                    <dt>3 - PR Raised</dt>
                    <dt>4 - PO Issued </dt>
                    <dt>5 - TSS HO </dt>
                    <dt>6 - TSSR Submitted </dt>
                    <dt>7 - TSSR Approved </dt>
                    <dt>8 - BOQ Submitted </dt>
                    <dt> &nbsp;</dt>
                  </dl>
                </Typography>
              </div>
            </td>
            <td>
              <div style={{ width: '170px' }}>
                <Typography variant="caption">
                  <dl>
                    <dt>9 - Imp HO </dt>
                    <dt>10 - PR Submission for Imp</dt>
                    <dt>11 - PR Raised for Imp </dt>
                    <dt>12 - PO Issued for Imp </dt>
                    <dt>13 - PR Sub for supply </dt>
                    <dt>14 - PR Raised for supply</dt>
                    <dt>15 - PO Issued for supply</dt>
                    <dt> &nbsp;</dt>
                    <dt> &nbsp;</dt>
                  </dl>
                </Typography>
              </div>
            </td>
            <td>
              <div style={{ width: '150px' }}>
                <Typography variant="caption">
                  <dl>
                    <dt>16 - PI Submitted </dt>
                    <dt>17 - PI Approved </dt>
                    <dt>18 - TRC Completed</dt>
                    <dt>19 - BOI Completed</dt>
                    <dt>20 - ICL Completed</dt>
                    <dt>21 - LC Issued</dt>
                    <dt>22 - Shipped</dt>
                    <dt>23 - Received at port</dt>
                    <dt>24 - Delivered to WH</dt>
                  </dl>
                </Typography>
              </div>
            </td>
            <td>
              <div style={{ width: '130px' }}>
                <Typography variant="caption">
                  <dl>
                    <dt>25 - SAQ </dt>
                    <dt>26 - Infra </dt>
                    <dt>27 - Civil </dt>
                    <dt>28 - Power </dt>
                    <dt>29 - Transmission</dt>
                    <dt>30 - MCW </dt>
                    <dt>31 - Equipments </dt>
                    <dt> &nbsp;</dt>
                    <dt> &nbsp;</dt>
                  </dl>
                </Typography>
              </div>
            </td>
            <td>
              <div style={{ width: '170px' }}>
                <Typography variant="caption">
                  <dl>
                    <dt>32 - Installed </dt>
                    <dt>33 - Commissioned </dt>
                    <dt>34 - PAT Pass </dt>
                    <dt>35 - SAR Approved/Scope </dt>
                    <dt>36 - SSV/Check List </dt>
                    <dt>37 - On Air </dt>
                    <dt>38 - Reconciled </dt>
                    <dt>&nbsp; </dt>
                    <dt> &nbsp;</dt>
                  </dl>
                </Typography>
              </div>
            </td>
            <td>
              <div style={{ width: '190px' }}>
                <Typography variant="caption">
                  <dl>
                    <dt>39 - Supply-HW PAC Submitted</dt>
                    <dt>40 - Supply-HW PAC Approved </dt>
                    <dt>41 - Imp PAC Submitted</dt>
                    <dt>42 - Imp PAC Approved </dt>
                    <dt>43 - Supply-SW PAC Submitted</dt>
                    <dt>44 - Supply-SW PAC Approved</dt>
                    <dt>45 - Capitalization Supply-HW</dt>
                    <dt>46 - Capitalization Imp</dt>
                    <dt>47 - Capitalization Supply-SW</dt>
                  </dl>
                </Typography>
              </div>
            </td>
          </tr>
        </table>
      </Box>
    </Card>
  );
}
