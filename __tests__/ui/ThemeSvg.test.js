import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeSvg from '../../src/components/ui/ThemeSvg';
import { useTheme } from '../../src/contexts/ThemeContext';

// Mock the theme context
jest.mock('../../src/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

// Mock the useTheme hook
const mockUseTheme = useTheme;

describe('ThemeSvg', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with light theme by default', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    render(<ThemeSvg name="bell" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/svgs/light-theme/bell.svg');
    expect(img).toHaveAttribute('alt', 'bell');
  });

  it('should render with dark theme', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark' });
    
    render(<ThemeSvg name="bell" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/svgs/dark-theme/bell.svg');
  });

  it('should render direct SVGs without theme path', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    render(<ThemeSvg name="byewind" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/svgs/byewind.svg');
  });

  it('should apply custom className', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    render(<ThemeSvg name="bell" className="custom-class" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveClass('custom-class');
  });

  it('should apply custom width and height', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    render(<ThemeSvg name="bell" width={24} height={24} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '24');
    expect(img).toHaveAttribute('height', '24');
  });

  it('should use default dimensions when not provided', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    render(<ThemeSvg name="bell" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '16');
    expect(img).toHaveAttribute('height', '16');
  });

  it('should handle missing icon gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    render(<ThemeSvg name="nonexistent" />);
    
    const img = screen.getByRole('img');
    
    // Simulate image load error
    img.dispatchEvent(new Event('error'));
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Icon "nonexistent" not found at path: /svgs/light-theme/nonexistent.svg'
    );
    expect(img).toHaveStyle('opacity: 0.3');
    
    consoleSpy.mockRestore();
  });

  it('should pass through additional props', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    render(<ThemeSvg name="bell" data-testid="test-icon" />);
    
    const img = screen.getByTestId('test-icon');
    expect(img).toBeInTheDocument();
  });

  it('should handle all direct SVG names correctly', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    
    const directSvgs = ['bug', 'live', 'man', 'woman', 'man-two', 'woman-two', 'user', 'byewind'];
    
    directSvgs.forEach(svgName => {
      const { unmount } = render(<ThemeSvg name={svgName} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', `/svgs/${svgName}.svg`);
      unmount();
    });
  });

  it('should handle theme-specific SVG names correctly', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark' });
    
    const themeSvgs = ['bell', 'account', 'chats', 'collapse', 'default', 'ecomm', 'filled-book', 'group', 'history', 'notebook', 'profile', 'projects', 'search', 'snow', 'star-filled', 'trailing-slash'];
    
    themeSvgs.forEach(svgName => {
      const { unmount } = render(<ThemeSvg name={svgName} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', `/svgs/dark-theme/${svgName}.svg`);
      unmount();
    });
  });
});
