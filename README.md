# Analytics Dashboard

A modern, responsive analytics dashboard built with React, featuring comprehensive data visualization, order management, and a sleek dark/light theme system.

![Analytics Dashboard](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38BDF8) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📊 Dashboard Analytics
- **Interactive Charts**: Line charts, bar charts, donut charts, and revenue maps
- **Key Metrics**: Real-time KPI cards with trend indicators
- **Revenue Analytics**: Location-based revenue visualization
- **Top Selling Products**: Data table with sorting and filtering

### 📦 Order Management
- **Order Table**: Comprehensive order listing with pagination
- **Search & Filter**: Advanced search and status filtering
- **Add Orders**: Modal-based order creation
- **Bulk Selection**: Multi-order selection capabilities

### 🎨 UI/UX Features
- **Dark/Light Theme**: Seamless theme switching with CSS variables
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion powered transitions
- **Modern Icons**: Lucide React and Material-UI icons
- **Sidebar Navigation**: Collapsible sidebar with favorites
- **Right Sidebar**: Notifications, activities, and contacts

### 🔧 Technical Features
- **Error Boundaries**: Graceful error handling
- **Custom Hooks**: Reusable data management logic
- **PropTypes**: Runtime type checking
- **Jest Testing**: Comprehensive test coverage
- **ESLint & Prettier**: Code quality and formatting
- **Performance Optimized**: Lazy loading and memoization

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/analytics-dashboard.git
   cd analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── charts/          # Chart components (Bar, Line, Donut)
│   ├── layout/          # Layout components (Header, Sidebar)
│   ├── orders/          # Order management components
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts (Theme)
├── data/                # Static data files
├── hooks/               # Custom React hooks
└── utils/               # Utility functions
```

## 🎯 Key Components

### Dashboard
- **MetricCard**: Displays key performance indicators
- **BarChart**: Projections vs actuals visualization
- **LineChart**: Revenue trend analysis
- **DonutChart**: Sales distribution breakdown
- **DataTable**: Top selling products table

### Orders Page
- **OrdersTable**: Main order listing with sorting/filtering
- **OrdersHeader**: Search, filters, and add order button
- **OrdersPagination**: Navigation controls
- **AddOrderModal**: Order creation form

### Layout
- **ResponsiveLayout**: Main app layout wrapper
- **Sidebar**: Navigation with favorites and collapsible design
- **Header**: Top navigation with search and theme toggle
- **RightSidebar**: Notifications and activities panel

## 🎨 Theming

The dashboard supports dynamic theme switching using CSS variables:

```css
/* Light Theme */
--dashboard-bg-primary: #ffffff;
--dashboard-text-primary: #1f2937;

/* Dark Theme */
--dashboard-bg-primary: #111827;
--dashboard-text-primary: #f9fafb;
```

## 🧪 Testing

The project includes comprehensive testing with Jest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

Test coverage includes:
- Component rendering and interactions
- Custom hooks functionality
- Utility functions
- Error boundaries

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

## 🛠️ Built With

- **[React 19.1.1](https://reactjs.org/)** - UI library
- **[Vite 7.1.6](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion 12.23.15](https://www.framer.com/motion/)** - Animation library
- **[ApexCharts 5.3.5](https://apexcharts.com/)** - Chart library
- **[React Router DOM 7.9.1](https://reactrouter.com/)** - Routing
- **[Material-UI 7.3.2](https://mui.com/)** - UI components
- **[Lucide React 0.544.0](https://lucide.dev/)** - Icon library

## 📊 Data Structure

The dashboard uses a JSON-based data structure located in `src/data/dashboard.json`:

```json
{
  "app": { "name": "ByeWind", "title": "Analytics Dashboard" },
  "navigation": { /* sidebar navigation structure */ },
  "metrics": { /* KPI cards data */ },
  "charts": { /* chart configurations and data */ },
  "orders": { /* order management data */ },
  "notifications": { /* notification items */ },
  "activities": { /* recent activities */ },
  "contacts": { /* contact information */ }
}
```

## 🔧 Customization

### Adding New Charts
1. Create component in `src/components/charts/`
2. Add data structure to `dashboard.json`
3. Import and use in `Dashboard.jsx`

### Adding New Pages
1. Create component in `src/components/`
2. Add navigation item to `dashboard.json`
3. Update routing in `App.jsx`

### Custom Themes
Modify CSS variables in `src/index.css` for theme customization.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ApexCharts](https://apexcharts.com/) for beautiful chart components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for the icon set

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the test files for usage examples

---

**Made with ❤️ using React and modern web technologies**