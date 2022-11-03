// material
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function BaseOptionChartStyle() {
  const theme = useTheme();
}

export default function BaseOptionChart2() {
  const theme = useTheme();

  return {
    // Colors
    colors: [
      theme.palette.chart.blue[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0],
      theme.palette.chart.green[0],
      theme.palette.chart.red[0]
    ],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: theme.palette.text.disabled,
      fontFamily: theme.typography.fontFamily
    },
    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100]
      }
    },

    // Stroke
    stroke: {
      width: 2,
      curve: 'smooth',
      lineCap: 'round'
    },
    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false }
    },

    // Legend
    legend: {
      fontSize: 13,
      position: 'top',
      horizontalAlign: 'left',
      fontWeight: 400,
      itemMargin: { horizontal: 10 },
      color: '#c2c2c2'
    }
  };
}
