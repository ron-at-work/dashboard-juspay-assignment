import React from 'react';
import PropTypes from 'prop-types';

/**
 * Typography component with Inter font and customizable styling
 * @param {Object} props - Component props
 * @param {string} props.variant - Typography variant (h1, h2, h3, h4, h5, h6, body1, body2, body3, body5, body6, body7, heading1, heading2, heading3, paragraph1, paragraph2, paragraph3)
 * @param {string} props.children - Text content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.color - Text color variant (primary, secondary, tertiary, custom)
 * @param {string} props.align - Text alignment (left, center, right, justify)
 * @param {string} props.weight - Font weight (normal, medium, semibold, bold)
 * @param {string} props.customColor - Custom color value
 * @param {string} props.tag - HTML tag to render (overrides variant default)
 * @param {boolean} props.truncate - Whether to truncate text with ellipsis
 * @param {number} props.lineHeight - Custom line height
 * @param {number} props.letterSpacing - Custom letter spacing
 */
const Typography = ({
  variant = 'body1',
  children,
  className = '',
  color = 'primary',
  align = 'left',
  weight = 'normal',
  customColor,
  tag,
  truncate = false,
  lineHeight,
  letterSpacing,
  ...props
}) => {
  // Variant configurations with CSS variables for automatic theme switching
  const variants = {
    body1: { 
      tag: 'p', 
      classes: 'text-sm leading-5 text-center align-middle',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'var(--typography-body1)'
      }
    },
    body2: { 
      tag: 'p', 
      classes: 'text-sm leading-5 text-center align-middle',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'var(--typography-body2)'
      }
    },
    body3: { 
      tag: 'p', 
      classes: 'text-sm leading-5',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        color: 'var(--typography-body3)'
      }
    },
    body5: { 
      tag: 'p', 
      classes: 'text-sm leading-5',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        color: 'var(--typography-body5)'
      }
    },
    body6: { 
      tag: 'p', 
      classes: 'text-sm leading-5',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        color: 'var(--typography-body6)'
      }
    },
    heading1: { 
      tag: 'h1', 
      classes: 'text-sm leading-5',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        color: 'var(--typography-heading1)'
      }
    },
    heading2: { 
      tag: 'h2', 
      classes: 'text-sm leading-5',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        color: 'var(--typography-heading2)'
      }
    },
    paragraph1: { 
      tag: 'p', 
      classes: '',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '36px',
        letterSpacing: '0%'
      }
    },
    paragraph2: { 
      tag: 'p', 
      classes: '',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '0%'
      }
    },
    heading3: { 
      tag: 'h3', 
      classes: 'truncate',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        color: 'var(--typography-heading3)'
      }
    },
    paragraph3: { 
      tag: 'p', 
      classes: 'truncate',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0%',
        color: 'var(--typography-paragraph3)'
      }
    },
    body7: { 
      tag: 'p', 
      classes: '',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '0%',
        color: 'var(--typography-body7)'
      }
    },
    paragraph4: { 
      tag: 'p', 
      classes: '',
      style: { 
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '0%',
        color: 'var(--typography-paragraph4)'
      }
    }
  };

  const variantConfig = variants[variant] || variants.body1;
  const Component = tag || variantConfig.tag;

  // Build className string - simplified since styles are handled inline
  const baseClasses = [
    'font-inter', // Ensure Inter font family
    variantConfig.classes,
    truncate ? 'truncate' : '',
    className
  ].filter(Boolean).join(' ');

  // Get font weight value
  const getFontWeight = (weightValue) => {
    switch(weightValue) {
      case 'medium': return 500;
      case 'semibold': return 600;
      case 'bold': return 700;
      default: return 400;
    }
  };

  // Merge variant styles with any custom overrides
  // CSS variables automatically handle theme switching
  const inlineStyles = {
    ...variantConfig.style,
    ...(customColor && { color: customColor }),
    ...(lineHeight && { lineHeight: `${lineHeight}px` }),
    ...(letterSpacing && { letterSpacing: `${letterSpacing}%` }),
    ...(align !== 'left' && { textAlign: align }),
    ...(weight !== 'normal' && { fontWeight: getFontWeight(weight) })
  };

  return (
    <Component 
      className={baseClasses}
      style={inlineStyles}
      {...props}
    >
      {children}
    </Component>
  );
};

Typography.propTypes = {
  variant: PropTypes.oneOf(['body1', 'body2', 'body3', 'body5', 'body6', 'body7', 'heading1', 'heading2', 'heading3', 'paragraph1', 'paragraph2', 'paragraph3']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'custom']),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  weight: PropTypes.oneOf(['normal', 'medium', 'semibold', 'bold']),
  customColor: PropTypes.string,
  tag: PropTypes.string,
  truncate: PropTypes.bool,
  lineHeight: PropTypes.number,
  letterSpacing: PropTypes.number
};

export default Typography;
