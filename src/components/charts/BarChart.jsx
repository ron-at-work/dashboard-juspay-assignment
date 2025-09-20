import React from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Typography from '../ui/Typography';

/**
 * BarChart component for displaying projections vs actuals data
 * @param {Object} props - Component props
 * @param {string} props.title - Chart title
 * @param {Array} props.categories - X-axis categories
 * @param {Array} props.series - Chart data series
 * @param {number} props.delay - Animation delay
 */
const BarChart = React.memo(({ title, categories, series, delay = 0 }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 180,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      stacked: true,
      parentHeightOffset: 0,
      redrawOnParentResize: true,
      responsive: [{
        breakpoint: 640,
        options: {
          chart: {
            height: 160,
          },
        }
      }],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20px',
        endingShape: 'rounded',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--dashboard-text-secondary)', // Use CSS variable for theme support
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        rotate: -45,
        rotateAlways: false,
      },
    },
    yaxis: {
      min: 0,
      max: 30,
      title: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--dashboard-text-secondary)', // Use CSS variable for theme support
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        formatter: (value) => {
          if ([0, 10, 20, 30].includes(value)) {
            return `${value}M`;
          }
          return '';
        },
      },
      tickAmount: 3,
      forceNiceScale: false,
      floating: false,
      decimalsInFloat: 0,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    colors: ['#A8C5DA', '#A8C5DA80'], // Using dashboard colors from config
    legend: {
   show: false
    },
    grid: {
      borderColor: 'var(--dashboard-text-tertiary)', // Use CSS variable for theme support
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
      y: {
        formatter: (val) => `${val}M`,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="chart-container bg-dashboard-bgSenary rounded-lg p-4 sm:p-6 border-none w-full h-full overflow-hidden min-w-0"
    >
      <Typography variant="heading2">{title}</Typography>
      <div className="w-full h-full min-h-0 flex-1">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={180}
          width="100%"
        />
      </div>
    </motion.div>
  );
});

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  delay: PropTypes.number,
};

BarChart.displayName = 'BarChart';

export default BarChart;
