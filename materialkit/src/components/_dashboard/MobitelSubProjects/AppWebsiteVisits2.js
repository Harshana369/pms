import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Stack, Typography, Grid } from '@mui/material';
//
import { BaseOptionChart2 } from '../../charts';

// -44 Milestone graph in insights---------------------------------------
const CHART_DATA = [
  {
    name: 'Completed',
    type: 'bar',
    data: [
      102, 10, 130, 130, 119, 114, 112, 111, 23, 45, 56, 57, 76, 35, 87, 13, 68, 98, 34, 35, 65, 25,
      76, 87, 130, 130, 119, 114, 112, 111, 23, 45, 56, 57, 76, 35, 87, 112, 111, 23, 45, 56, 78,
      98, 76, 78
    ]
  },
  {
    name: 'Expand',
    type: 'column',
    data: [0]
  }
];
// --------------------------------
export default function AppWebsiteVisits2() {
  const chartOptions = merge(BaseOptionChart2(), {
    stroke: { width: [3] },
    plotOptions: { bar: { columnWidth: '100%', borderRadius: 1 } },
    fill: { type: ['solid', 'gradient'] },
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
      <CardHeader title="Project all milestones" subheader="(+12%) than last week" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
        <table>
          <tr>
            <td>
              <Typography variant="caption">
                <dl>
                  <dt>1 - Scope &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>2 - PR Submitted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>3 - PR Raised &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>4 - PO Issued &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>5 - TSS HO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>6 - TSSR Submitted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>7 - TSSR Approved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>8 - BOQ Submitted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                </dl>
              </Typography>
            </td>
            <td>
              <Typography variant="caption">
                <dl>
                  <dt>9 - Imp HO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>10 - PR Submission for Imp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>11 - PR Raised for Imp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>12 - PO Issued for Imp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>13 - PR Sub for supply &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>14 - PR Raised for supply &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>15 - PO Issued for supply&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                </dl>
              </Typography>
            </td>
            <td>
              <Typography variant="caption">
                <dl>
                  <dt>16 - PI Submitted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>17 - PI Approved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>18 - TRC Completed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>19 - BOI Completed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>20 - ICL Completed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>21 - LC Issued&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>22 - Shipped&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>23 - Received at port &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>24 - Delivered to WH &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                </dl>
              </Typography>
            </td>
            <td>
              <Typography variant="caption">
                <dl>
                  <dt>25 - Equipment Pending &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>26 - SAQ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>27 - Loading Approval &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>28 - Civil &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>29 - Power &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>30 - MCW &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                </dl>
              </Typography>
            </td>
            <td>
              <Typography variant="caption">
                <dl>
                  <dt>31 - Commissioned &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>32 - PAT Pass &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>33 - On Air &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>34 - SSV/Check List &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>35 - WIP &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>36 - SAR Approved/Scope &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>37 - Reconcilliation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                </dl>
              </Typography>
            </td>
            <td>
              <Typography variant="caption">
                <dl>
                  <dt>38 - Supply PAC submitted &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>39 - Supply PAC Approved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>40 - Imp PAC Submitted&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>41 - Imp PAC Approved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>42 - COW&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>43 - COM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>44 - Capitalization Supply&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>45 - Capitalization Implimentation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                  <dt>46 - Capitalization Software&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</dt>
                </dl>
              </Typography>
            </td>
          </tr>
        </table>
      </Box>
    </Card>
  );
}
