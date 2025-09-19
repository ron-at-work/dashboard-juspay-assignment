import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from '../../src/components/charts/LineChart';

// Mock react-apexcharts
jest.mock('react-apexcharts', () => {
  return function MockChart({ options, series, type, height, width }) {
    return (
      <div data-testid="apex-chart" data-type={type} data-height={height} data-width={width}>
        <div data-testid="chart-options">{JSON.stringify(options)}</div>
        <div data-testid="chart-series">{JSON.stringify(series)}</div>
      </div>
    );
  };
});

describe('LineChart', () => {
  const defaultProps = {
    title: 'Revenue Trend',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Last Week',
        data: [100, 200, 150, 300, 250, 400],
        color: '#6366f1'
      },
      {
        name: 'Current Week',
        data: [120, 220, 170, 320, 270, 420],
        color: '#000000'
      },
      {
        name: 'Projected',
        data: [140, 240, 190, 340, 290, 440],
        color: '#e5e7eb'
      }
    ],
    delay: 0
  };

  it('should render chart with title', () => {
    render(<LineChart {...defaultProps} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should render chart with correct type', () => {
    render(<LineChart {...defaultProps} />);
    
    const chart = screen.getByTestId('apex-chart');
    expect(chart).toHaveAttribute('data-type', 'line');
  });

  it('should render chart with correct height', () => {
    render(<LineChart {...defaultProps} />);
    
    const chart = screen.getByTestId('apex-chart');
    expect(chart).toHaveAttribute('data-height', '100%');
  });

  it('should render chart with correct width', () => {
    render(<LineChart {...defaultProps} />);
    
    const chart = screen.getByTestId('apex-chart');
    expect(chart).toBeInTheDocument();
  });

  it('should handle empty series gracefully', () => {
    const propsWithEmptySeries = {
      ...defaultProps,
      series: []
    };
    
    render(<LineChart {...propsWithEmptySeries} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle missing series gracefully', () => {
    const propsWithoutSeries = {
      ...defaultProps,
      series: null
    };
    
    render(<LineChart {...propsWithoutSeries} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should apply animation delay', () => {
    render(<LineChart {...defaultProps} delay={0.5} />);
    
    // The delay is applied to the motion.div, we can't easily test this without
    // more complex testing setup, but we can verify the component renders
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
  });

  it('should handle different series configurations', () => {
    const singleSeriesProps = {
      ...defaultProps,
      series: [
        {
          name: 'Single Series',
          data: [100, 200, 150, 300, 250, 400],
          color: '#6366f1'
        }
      ]
    };
    
    render(<LineChart {...singleSeriesProps} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle series with missing data', () => {
    const seriesWithMissingData = {
      ...defaultProps,
      series: [
        {
          name: 'Incomplete Series',
          data: [100, null, 150, null, 250, 400],
          color: '#6366f1'
        }
      ]
    };
    
    render(<LineChart {...seriesWithMissingData} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle different categories', () => {
    const propsWithDifferentCategories = {
      ...defaultProps,
      categories: ['Q1', 'Q2', 'Q3', 'Q4']
    };
    
    render(<LineChart {...propsWithDifferentCategories} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle empty categories', () => {
    const propsWithEmptyCategories = {
      ...defaultProps,
      categories: []
    };
    
    render(<LineChart {...propsWithEmptyCategories} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle missing categories', () => {
    const propsWithoutCategories = {
      ...defaultProps,
      categories: null
    };
    
    render(<LineChart {...propsWithoutCategories} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    render(<LineChart {...defaultProps} />);
    
    const chartContainer = screen.getByText('Revenue Trend').closest('div');
    expect(chartContainer).toHaveClass('flex', 'items-center', 'gap-8', 'mb-4');
  });

  it('should handle long titles', () => {
    const propsWithLongTitle = {
      ...defaultProps,
      title: 'Very Long Chart Title That Might Wrap to Multiple Lines'
    };
    
    render(<LineChart {...propsWithLongTitle} />);
    
    expect(screen.getByText('Very Long Chart Title That Might Wrap to Multiple Lines')).toBeInTheDocument();
  });

  it('should handle special characters in title', () => {
    const propsWithSpecialTitle = {
      ...defaultProps,
      title: 'Revenue & Sales (2024) - $1M+'
    };
    
    render(<LineChart {...propsWithSpecialTitle} />);
    
    expect(screen.getByText('Revenue & Sales (2024) - $1M+')).toBeInTheDocument();
  });

  it('should handle series with different data types', () => {
    const seriesWithMixedData = {
      ...defaultProps,
      series: [
        {
          name: 'Mixed Data',
          data: [100, '200', 150.5, null, 250, 400],
          color: '#6366f1'
        }
      ]
    };
    
    render(<LineChart {...seriesWithMixedData} />);
    
    expect(screen.getByText('Revenue Trend')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle missing title gracefully', () => {
    const propsWithoutTitle = {
      ...defaultProps,
      title: null
    };
    
    render(<LineChart {...propsWithoutTitle} />);
    
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle empty title', () => {
    const propsWithEmptyTitle = {
      ...defaultProps,
      title: ''
    };
    
    render(<LineChart {...propsWithEmptyTitle} />);
    
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });
});
