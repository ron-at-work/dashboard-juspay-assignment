import React from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';

/**
 * LineChart component for displaying revenue trends
 * @param {Object} props - Component props
 * @param {string} props.title - Chart title
 * @param {Array} props.categories - X-axis categories
 * @param {Array} props.series - Chart data series
 * @param {number} props.delay - Animation delay
 */
const LineChart = React.memo(({ title, categories, series, delay = 0 }) => {
  // Modify series to add stroke configuration for partially dotted line
  const modifiedSeries = series?.map((item, index) => {
    if (index === 1) { // Current Week (black line)
      // Split the data into two series: solid (Jan-Mar) and dotted (Apr-Jun)
      const solidData = [...item.data.slice(0, 3), null, null, null]; // Jan-Mar solid, Apr-Jun null
      const dottedData = [null, null, null, ...item.data.slice(3)]; // Jan-Mar null, Apr-Jun dotted
      
      return [
        {
          ...item,
          name: `${item.name} (Solid)`,
          data: solidData,
          stroke: { dashArray: [0, 0] } // Solid line
        },
        {
          ...item,
          name: `${item.name} (Dotted)`,
          data: dottedData,
          stroke: { dashArray: [5, 5] } // Dotted line
        }
      ];
    } else {
      return {
        ...item,
        stroke: { dashArray: [0, 0] } // Solid line
      };
    }
  }).flat();

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.1
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      dashArray: [0, 5], // First line solid, second line dotted
    },
    dataLabels: {
      enabled: false,
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
      tickAmount: 3,
      forceNiceScale: false,
      labels: {
        style: {
          colors: 'var(--dashboard-text-secondary)', // Use CSS variable for theme support
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        formatter: (value) => `${value}M`,
      },
    },
    colors: ['var(--dashboard-chart-line-primary)', 'var(--dashboard-chart-line-secondary)', 'var(--dashboard-chart-line-secondary)'], // Theme-aware colors
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
          show: true,
          strokeDashArray: 0,
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
    markers: {
      size: 4,
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="chart-container bg-dashboard-bgSecondary border-none rounded-lg p-6 h-[350px] flex flex-col"
    >
      <div className="flex items-center gap-8 mb-4">
        <h3 className="text-lg font-semibold text-dashboard-textPrimary">{title}</h3>
        <div className='flex items-center gap-2 text-dashboard-textSecondary'>|</div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-sm">
          {series?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: options.colors[index] }}
              />
              <span className="text-dashboard-textSecondary">{item.name}</span>
              <span className="font-medium text-dashboard-textPrimary">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <Chart
          options={options}
          series={modifiedSeries}
          type="line"
          height="100%"
        />
      </div>
    </motion.div>
  );
});

LineChart.displayName = 'LineChart';

export default LineChart;
