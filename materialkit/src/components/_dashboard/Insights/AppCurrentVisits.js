import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// -project completion pie chart in the dash board-----------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 82;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------
export default function AppCurrentVisits({ projectCompletion }) {
  const theme = useTheme();
  // const [projectCompletion, setData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://pms-mobitel.herokuapp.com/vendorProjectsDatabases')
  //     .then((res) => {
  //       setData(res.data.ProjectCompletionForFrontEnd);
  //       // console.log(res.data.ProjectCompletionForFrontEnd);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // --------- Assigning Data To Graph ---------------------------
  // -------------------------------------------------------------
  const CHART_DATA = projectCompletion;
  // console.log(projectCompletion);

  //---------------------------------------------------------------

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main
    ],
    labels: ['Completed', 'Pending', 'Hold'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Project Completion" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={310} />
      </ChartWrapperStyle>
      <br />
      <br />
    </Card>
  );
}
