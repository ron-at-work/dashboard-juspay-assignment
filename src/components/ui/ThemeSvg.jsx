import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * ThemeSvg component that automatically selects the right SVG based on current theme
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the SVG file (without extension)
 * @param {string} props.className - CSS classes to apply
 * @param {number} props.width - Width of the SVG
 * @param {number} props.height - Height of the SVG
 * @param {Object} props.otherProps - Other props to pass to the img element
 */
const ThemeSvg = ({ 
  name, 
  className = '', 
  width = 16, 
  height = 16, 
  ...otherProps 
}) => {
  const { theme } = useTheme();
  
  // List of SVGs that are directly in the svgs folder (not theme-specific)
  const directSvgs = ['bug', 'live', 'man', 'woman', 'man-two', 'woman-two', 'user', 'byewind'];
  
  // Construct the path to the SVG
  const svgPath = directSvgs.includes(name) 
    ? `/svgs/${name}.svg`
    : `/svgs/${theme}-theme/${name}.svg`;
  
  return (
    <img
      src={svgPath}
      alt={name}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        // Fallback to a simple placeholder if icon is missing
        console.warn(`Icon "${name}" not found at path: ${svgPath}`);
        e.target.style.opacity = '0.3';
      }}
      {...otherProps}
    />
  );
};

ThemeSvg.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ThemeSvg;
