import React from 'react';
import { motion } from 'framer-motion';
import MetricCard from './ui/MetricCard';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import DonutChart from './charts/DonutChart';
import DataTable from './ui/DataTable';
import RevenueByLocation from './charts/RevenueByLocation';

/**
 * Main Dashboard component that displays all analytics data
 * @param {Object} props - Component props
 * @param {Object} props.data - Dashboard data from JSON
 */
const Dashboard = ({ data }) => {
  const { metrics, charts, revenueByLocation, topSellingProducts } = data;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-6 bg-dashboard-bgPrimary overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-dashboard-textPrimary">eCommerce</h1>
        </motion.div>

        {/* Metrics Cards and Bar Chart row */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Metric Cards - 2x2 grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 lg:w-1/2"
          >
            {metrics?.cards?.map((card, index) => {
              // Define background colors for each card
              const bgColors = [
                'bg-dashboard-bgTertiary',    // Card 1: bgTertiary (light theme color)
                'bg-dashboard-bgSecondary',   // Card 2: bgSecondary (keep same)
                'bg-dashboard-bgSecondary',   // Card 3: bgSecondary (keep same)
                'bg-dashboard-bgQuaternary'   // Card 4: bgQuaternary (light theme color)
              ];
              
              // Define text colors for each card
              const textColors = [
                'text-gray-600',              // Card 1: fixed light gray (same in both themes)
                'text-dashboard-textPrimary', // Card 2: theme-aware text
                'text-dashboard-textPrimary', // Card 3: theme-aware text
                'text-gray-600'               // Card 4: fixed light gray (same in both themes)
              ];
              
              return (
                <MetricCard
                  key={card.id}
                  title={card.title}
                  value={card.value}
                  change={card.change}
                  trend={card.trend}
                  icon={card.icon}
                  bgColor={bgColors[index]}
                  textColor={textColors[index]}
                  delay={index * 0.1}
                />
              );
            })}
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <BarChart
              title={charts.projectionsVsActuals.title}
              categories={charts.projectionsVsActuals.data.categories}
              series={charts.projectionsVsActuals.data.series}
              delay={0.2}
            />
          </motion.div>
        </div>

        {/* Charts Row 1 - Revenue Line Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
          {/* Revenue Chart - 4/5 columns */}
          <div className="xl:col-span-4">
            <LineChart
              title={charts.revenue.title}
              categories={charts.revenue.data.categories}
              series={charts.revenue.data.series}
              delay={0.3}
            />
          </div>

          {/* Revenue by Location - 1/5 columns */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <RevenueByLocation
                title={revenueByLocation.title}
                locations={revenueByLocation.locations}
                delay={0.6}
              />
            </motion.div>
          </div>
        </div>

        {/* Charts Row 2 - Top Selling Products and Donut Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-8">
          {/* DataTable - 4/5 columns */}
          <div className="xl:col-span-4">
            <DataTable
              title={topSellingProducts.title}
              columns={topSellingProducts.columns}
              data={topSellingProducts.data}
              delay={0.4}
            />
          </div>

          {/* DonutChart - 1/5 columns */}
          <div className="xl:col-span-1">
            <DonutChart
              title={charts.totalSales.title}
              series={charts.totalSales.data.series}
              labels={charts.totalSales.data.labels}
              centerValue={charts.totalSales.data.centerValue}
              delay={0.5}
            />
          </div>
        </div>

      
      </div>
    </motion.main>
  );
};

export default Dashboard;
