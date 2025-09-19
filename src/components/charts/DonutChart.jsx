import React from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * DonutChart component for displaying total sales breakdown
 * @param {Object} props - Component props
 * @param {string} props.title - Chart title
 * @param {Array} props.series - Chart data series
 * @param {Array} props.labels - Chart labels
 * @param {string} props.centerValue - Center value display
 * @param {number} props.delay - Animation delay
 */
const DonutChart = React.memo(({ title, series, labels, centerValue, delay = 0 }) => {
  const options = {
    chart: {
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
        expandOnClick: false, // arc bada hone ka effect hata dega
        dataLabels: {
          offset: 0,
        },
        borderRadius: 8, // rounded corners for each segment
        borderWidth: 10, // no border between segments
      },
    },
    stroke: {
      width: 2,  // stroke width 0 kar diya for smoother edges
      lineCap: 'round', // rounded edges for arcs
    },
    states: {
      hover: {
        filter: {
          type: 'none', // hover background/glow disable
        },
      },
      active: {
        filter: {
          type: 'none', // click par bhi disable
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#1C1C1C', '#BAEDBD', '#95A4FC', '#B1E3FF'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      show: false, // Hide default legend
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
      y: {
        formatter: (val) => `$${val.toFixed(2)}`,
      },
    },
  };
  

  // Custom legend component
  const CustomLegend = () => {
    // Handle null/undefined cases
    if (!labels || !series || labels.length === 0 || series.length === 0) {
      return null;
    }
    
    return (
      <div className="mt-4 space-y-2">
        {labels.map((label, index) => {
          const seriesValue = series[index];
          if (seriesValue === undefined || seriesValue === null) {
            return null;
          }
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: options.colors[index] }}
                ></div>
                <span className="text-sm text-dashboard-textPrimary">{label}</span>
              </div>
              <span className="text-sm font-medium text-dashboard-textPrimary">
                ${seriesValue.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="chart-container bg-dashboard-bgSecondary border-none rounded-lg p-6 h-[350px] flex flex-col"
    >
      <h3 className="text-lg font-semibold text-dashboard-textPrimary mb-4">{title}</h3>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Chart
            options={options}
            series={series}
            type="donut"
            height="100%"
          />
        </div>
        <CustomLegend />
      </div>
    </motion.div>
  );
});

DonutChart.propTypes = {
  title: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  centerValue: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

DonutChart.displayName = 'DonutChart';

export default DonutChart;
