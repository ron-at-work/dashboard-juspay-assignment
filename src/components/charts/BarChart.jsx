import React from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

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
      className="chart-container bg-dashboard-bgSecondary rounded-lg p-6 border-none w-full"
    >
      <h3 className="text-lg font-semibold text-dashboard-textPrimary mb-4">{title}</h3>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={180}
        width="100%"
      />
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
