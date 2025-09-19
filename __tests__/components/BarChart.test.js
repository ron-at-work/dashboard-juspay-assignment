import React from 'react';
import { render, screen } from '@testing-library/react';
import BarChart from '../../src/components/charts/BarChart';

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

describe('BarChart', () => {
  const defaultProps = {
    title: 'Projections vs Actuals',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [
      {
        name: 'Projected',
        data: [100, 200, 150, 300, 250, 400],
        color: '#6366f1'
      },
      {
        name: 'Actual',
        data: [120, 220, 170, 320, 270, 420],
        color: '#10b981'
      }
    ],
    delay: 0
  };

  it('should render chart with title', () => {
    render(<BarChart {...defaultProps} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should render chart with correct type', () => {
    render(<BarChart {...defaultProps} />);
    
    const chart = screen.getByTestId('apex-chart');
    expect(chart).toHaveAttribute('data-type', 'bar');
  });

  it('should render chart with correct height', () => {
    render(<BarChart {...defaultProps} />);
    
    const chart = screen.getByTestId('apex-chart');
    expect(chart).toHaveAttribute('data-height', '180');
  });

  it('should render chart with correct width', () => {
    render(<BarChart {...defaultProps} />);
    
    const chart = screen.getByTestId('apex-chart');
    expect(chart).toHaveAttribute('data-width', '100%');
  });

  it('should handle empty series gracefully', () => {
    const propsWithEmptySeries = {
      ...defaultProps,
      series: []
    };
    
    render(<BarChart {...propsWithEmptySeries} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle missing series gracefully', () => {
    const propsWithoutSeries = {
      ...defaultProps,
      series: null
    };
    
    render(<BarChart {...propsWithoutSeries} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should apply animation delay', () => {
    render(<BarChart {...defaultProps} delay={0.5} />);
    
    // The delay is applied to the motion.div, we can't easily test this without
    // more complex testing setup, but we can verify the component renders
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
  });

  it('should handle single series', () => {
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
    
    render(<BarChart {...singleSeriesProps} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle multiple series', () => {
    const multipleSeriesProps = {
      ...defaultProps,
      series: [
        {
          name: 'Series 1',
          data: [100, 200, 150, 300, 250, 400],
          color: '#6366f1'
        },
        {
          name: 'Series 2',
          data: [120, 220, 170, 320, 270, 420],
          color: '#10b981'
        },
        {
          name: 'Series 3',
          data: [140, 240, 190, 340, 290, 440],
          color: '#f59e0b'
        }
      ]
    };
    
    render(<BarChart {...multipleSeriesProps} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
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
    
    render(<BarChart {...seriesWithMissingData} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle different categories', () => {
    const propsWithDifferentCategories = {
      ...defaultProps,
      categories: ['Q1', 'Q2', 'Q3', 'Q4']
    };
    
    render(<BarChart {...propsWithDifferentCategories} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle empty categories', () => {
    const propsWithEmptyCategories = {
      ...defaultProps,
      categories: []
    };
    
    render(<BarChart {...propsWithEmptyCategories} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle missing categories', () => {
    const propsWithoutCategories = {
      ...defaultProps,
      categories: null
    };
    
    render(<BarChart {...propsWithoutCategories} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    render(<BarChart {...defaultProps} />);
    
    const chartContainer = screen.getByText('Projections vs Actuals').closest('div');
    expect(chartContainer).toHaveClass('chart-container', 'bg-dashboard-bgSecondary', 'rounded-lg', 'p-6', 'border-none', 'w-full');
  });

  it('should handle long titles', () => {
    const propsWithLongTitle = {
      ...defaultProps,
      title: 'Very Long Bar Chart Title That Might Wrap to Multiple Lines'
    };
    
    render(<BarChart {...propsWithLongTitle} />);
    
    expect(screen.getByText('Very Long Bar Chart Title That Might Wrap to Multiple Lines')).toBeInTheDocument();
  });

  it('should handle special characters in title', () => {
    const propsWithSpecialTitle = {
      ...defaultProps,
      title: 'Sales & Revenue (2024) - $1M+'
    };
    
    render(<BarChart {...propsWithSpecialTitle} />);
    
    expect(screen.getByText('Sales & Revenue (2024) - $1M+')).toBeInTheDocument();
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
    
    render(<BarChart {...seriesWithMixedData} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle missing title gracefully', () => {
    const propsWithoutTitle = {
      ...defaultProps,
      title: null
    };
    
    render(<BarChart {...propsWithoutTitle} />);
    
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle empty title', () => {
    const propsWithEmptyTitle = {
      ...defaultProps,
      title: ''
    };
    
    render(<BarChart {...propsWithEmptyTitle} />);
    
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle zero delay', () => {
    render(<BarChart {...defaultProps} delay={0} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });

  it('should handle negative delay', () => {
    render(<BarChart {...defaultProps} delay={-0.5} />);
    
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByTestId('apex-chart')).toBeInTheDocument();
  });
});
