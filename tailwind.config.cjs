/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Design specific colors - Dynamic theme colors
        dashboard: {
          // Background colors - CSS Variables for theme switching
          bgPrimary: 'var(--dashboard-bg-primary)',
          bgSecondary: 'var(--dashboard-bg-secondary)',
          bgTertiary: 'var(--dashboard-bg-tertiary)',
          bgQuaternary: 'var(--dashboard-bg-quaternary)',
          bgQuinary: 'var(--dashboard-bg-quinary)',
          bgSenary: 'var(--dashboard-bg-senary)',
          
          
          // Text colors - CSS Variables for theme switching
          textPrimary: 'var(--dashboard-text-primary)',
          textSecondary: 'var(--dashboard-text-secondary)',
          textTertiary: 'var(--dashboard-text-tertiary)',
          
          // Chart colors - CSS Variables for theme switching
          chartBarPrimary: 'var(--dashboard-chart-bar-primary)',
          chartBarSecondary: 'var(--dashboard-chart-bar-secondary)',
          chartLinePrimary: 'var(--dashboard-chart-line-primary)',
          chartLineSecondary: 'var(--dashboard-chart-line-secondary)',
          
          // Map colors - CSS Variables for theme switching
          mapCountry: 'var(--dashboard-map-country)',
          mapPointer: 'var(--dashboard-map-pointer)',
          mapPointerBorder: 'var(--dashboard-map-pointer-border)',
          
          // Pie chart colors - CSS Variables for theme switching
          pieHighest: 'var(--dashboard-pie-highest)',
          pieSecond: 'var(--dashboard-pie-second)',
          pieThird: 'var(--dashboard-pie-third)',
          pieFourth: 'var(--dashboard-pie-fourth)',
          
          // Legacy colors for compatibility - CSS Variables
          card: 'var(--dashboard-card)',
          sidebar: 'var(--dashboard-sidebar)',
          border: 'var(--dashboard-border)',
          accent: 'var(--dashboard-accent)',
          success: 'var(--dashboard-success)',
          warning: 'var(--dashboard-warning)',
          error: 'var(--dashboard-error)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'primary': '14px',
        'secondary': '12px',
        'tertiary': '10px',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
