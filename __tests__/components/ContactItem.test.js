import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactItem from '../../src/components/ui/ContactItem';
import { ThemeProvider } from '../../src/contexts/ThemeContext';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ContactItem', () => {
  const defaultProps = {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    index: 0
  };

  it('should render contact item with name', () => {
    renderWithTheme(<ContactItem {...defaultProps} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render contact item with avatar', () => {
    renderWithTheme(<ContactItem {...defaultProps} />);
    
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', '/svgs/man.svg');
  });

  it('should handle missing props gracefully', () => {
    renderWithTheme(<ContactItem />);
    
    // Should not crash and render empty or default content
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should handle missing name gracefully', () => {
    const propsWithMissingName = {
      avatar: 'https://example.com/avatar.jpg',
      index: 0
    };
    
    renderWithTheme(<ContactItem {...propsWithMissingName} />);
    
    // Should render without crashing
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', '/svgs/man.svg');
  });

  it('should handle missing avatar gracefully', () => {
    const propsWithMissingAvatar = {
      name: 'John Doe',
      index: 0
    };
    
    renderWithTheme(<ContactItem {...propsWithMissingAvatar} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render with proper CSS classes', () => {
    const { container } = renderWithTheme(<ContactItem {...defaultProps} />);
    
    const contactItem = container.firstChild;
    expect(contactItem).toHaveClass('contact-item');
  });

  it('should handle long names', () => {
    const propsWithLongName = {
      name: 'This is a very long contact name that should be handled gracefully',
      avatar: 'https://example.com/avatar.jpg',
      index: 0
    };
    
    renderWithTheme(<ContactItem {...propsWithLongName} />);
    
    expect(screen.getByText('This is a very long contact name that should be handled gracefully')).toBeInTheDocument();
  });

  it('should handle special characters in name', () => {
    const propsWithSpecialChars = {
      name: 'John @doe_123 with special chars: !@#$%^&*()',
      avatar: 'https://example.com/avatar.jpg',
      index: 0
    };
    
    renderWithTheme(<ContactItem {...propsWithSpecialChars} />);
    
    expect(screen.getByText('John @doe_123 with special chars: !@#$%^&*()')).toBeInTheDocument();
  });
});
