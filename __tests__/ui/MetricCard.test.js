import React from 'react';
import { render, screen } from '@testing-library/react';
import MetricCard from '../../src/components/ui/MetricCard';

describe('MetricCard', () => {
  const defaultProps = {
    title: 'Total Revenue',
    value: '$12,345',
    change: '+12.5%',
    trend: 'up',
    icon: 'chart',
  };

  it('should render with default props', () => {
    render(<MetricCard {...defaultProps} />);
    
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
  });

  it('should render with custom background color', () => {
    render(<MetricCard {...defaultProps} bgColor="bg-blue-500" />);
    
    // Find the element that contains the bg-blue-500 class
    const card = document.querySelector('.bg-blue-500');
    expect(card).toBeInTheDocument();
  });

  it('should render with custom text color', () => {
    render(<MetricCard {...defaultProps} textColor="text-white" />);
    
    const title = screen.getByText('Total Revenue');
    expect(title).toHaveClass('text-white');
  });

  it('should render with up trend icon', () => {
    render(<MetricCard {...defaultProps} trend="up" />);
    
    // Check if TrendingUp icon is rendered (Lucide icons render as SVG)
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render with down trend icon', () => {
    render(<MetricCard {...defaultProps} trend="down" />);
    
    // Check if TrendingDown icon is rendered
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should apply animation delay', () => {
    render(<MetricCard {...defaultProps} delay={0.5} />);
    
    // The delay is applied to the motion.div, we can't easily test this without
    // more complex testing setup, but we can verify the component renders
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  it('should have proper accessibility structure', () => {
    render(<MetricCard {...defaultProps} />);
    
    const title = screen.getByText('Total Revenue');
    const value = screen.getByText('$12,345');
    const change = screen.getByText('+12.5%');
    
    expect(title).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(change).toBeInTheDocument();
  });

  it('should handle different trend values', () => {
    const { rerender } = render(<MetricCard {...defaultProps} trend="up" />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    
    rerender(<MetricCard {...defaultProps} trend="down" />);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  it('should render with long values', () => {
    const longValueProps = {
      ...defaultProps,
      title: 'Very Long Title That Might Wrap',
      value: '$1,234,567,890',
      change: '+999.99%',
    };
    
    render(<MetricCard {...longValueProps} />);
    
    expect(screen.getByText('Very Long Title That Might Wrap')).toBeInTheDocument();
    expect(screen.getByText('$1,234,567,890')).toBeInTheDocument();
    expect(screen.getByText('+999.99%')).toBeInTheDocument();
  });

  it('should apply default props correctly', () => {
    render(<MetricCard {...defaultProps} />);
    
    // Find the element that contains the bg-dashboard-card class
    const card = document.querySelector('.bg-dashboard-card');
    expect(card).toBeInTheDocument();
    
    const title = screen.getByText('Total Revenue');
    expect(title).toHaveClass('text-dashboard-textPrimary');
  });

  it('should handle missing optional props', () => {
    const minimalProps = {
      title: 'Minimal Card',
      value: '$100',
      change: '0%',
      trend: 'up',
      icon: 'chart',
    };
    
    render(<MetricCard {...minimalProps} />);
    
    expect(screen.getByText('Minimal Card')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should have proper CSS classes for styling', () => {
    render(<MetricCard {...defaultProps} />);
    
    // Find the element that contains the rounded-lg class (which should be the main card)
    const card = document.querySelector('.rounded-lg');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg', 'shadow-sm', 'p-6', 'overflow-hidden', 'shadow-md', 'transition-all', 'duration-300', 'group', 'h-full', 'w-full');
  });

  it('should render value with proper styling', () => {
    render(<MetricCard {...defaultProps} />);
    
    const value = screen.getByText('$12,345');
    expect(value).toHaveClass('text-2xl', 'font-semibold', 'text-dashboard-textPrimary');
  });

  it('should render change with proper styling', () => {
    render(<MetricCard {...defaultProps} />);
    
    const change = screen.getByText('+12.5%');
    expect(change).toHaveClass('text-sm', 'font-medium', 'text-dashboard-textPrimary');
  });
});
