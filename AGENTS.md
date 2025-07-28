# Quantum Executive Dashboard - AI Agent Guide

## Project Overview

This is a static single-page quantum computing market intelligence dashboard designed for executive-level decision making. The application visualizes key market metrics, projections, regional data, investment flows, and company performance using Chart.js for interactive data visualization.

**Architecture**: Static HTML/CSS/JavaScript dashboard with CSV data sources
**Target Users**: Executives and stakeholders in quantum computing industry
**Core Purpose**: Data-driven insights and market intelligence visualization

## File Structure & Navigation

```
├── index.html              # Main dashboard page (entry point)
├── app.js                  # Core dashboard logic and Chart.js integration
├── style.css               # Complete design system + dashboard styling
├── package.json            # Node.js dependencies (Jest for testing)
├── jest.config.js          # Test configuration
├── install.sh              # Node.js setup script
├── tests/
│   └── dashboard.test.js   # Unit tests for core functionality
└── data/ (CSV files)
    ├── quantum_market_projections.csv
    ├── quantum_regional_data.csv
    ├── quantum_investment_flows.csv
    ├── quantum_company_performance.csv
    └── quantum_trends_challenges.csv
```

### Key Files Explained

- **index.html**: Complete dashboard UI with semantic structure, accessibility features, and Chart.js CDN integration
- **app.js**: `QuantumDashboard` class with data loading, chart management, filtering, and interactive features
- **style.css**: Comprehensive design system with CSS custom properties, dark mode support, and responsive design
- **CSV files**: Real market data that drives all visualizations and insights

## Development Guidelines

### Code Architecture Patterns

**Class-Based JavaScript**: The main `QuantumDashboard` class follows these patterns:
- Constructor initializes data structures, filters, and charts
- Async `init()` method handles setup sequence
- Separate methods for data loading, chart creation, and UI interactions
- Event-driven architecture with comprehensive event listeners

**Data Flow**:
1. CSV files → `loadDataFromCSVs()` → structured data objects
2. Data objects → `createCharts()` → Chart.js instances
3. User interactions → filter updates → `updateDashboard()` → chart updates

### CSS Architecture

**Design System Approach**:
- CSS custom properties for consistent theming
- Component-based styling (`.dashboard-panel`, `.insight-card`, etc.)
- Responsive grid layouts with mobile-first approach
- Dark/light mode support via CSS custom properties and media queries

**Key CSS Patterns**:
```css
/* Use semantic custom properties */
var(--quantum-primary)
var(--quantum-text-primary)

/* Component-based naming */
.dashboard-panel
.panel-header
.insight-card
```

### Data Management

**CSV Data Structure**: Each CSV has specific headers that map to JavaScript objects:
- Market projections: `Year`, `Conservative_Estimate`, `Moderate_Estimate`, etc.
- Regional data: `Region`, `Market_Share_2024`, `Revenue_2024_M`, etc.
- Investment flows: `Year`, `VC_Funding_M`, `Government_Funding_M`, etc.
- Company data: `Company`, `Revenue_2024_M`, `Market_Cap_B`, etc.

**Important**: Always maintain CSV header consistency when updating data files.

## Testing & Quality Assurance

### Running Tests
```bash
npm install  # Install Jest
npm test     # Run test suite
```

### Test Coverage Areas
- Data filtering logic (`filterData()` method)
- Chart update functions
- Dashboard state management
- CSV data parsing and transformation

### Code Quality Standards
- Maintain JSDoc-style comments for complex functions
- Use semantic variable names (`marketProjections` not `mp`)
- Keep functions focused and single-purpose
- Validate data integrity before chart updates

## Working with Charts

### Chart.js Integration
The dashboard uses Chart.js with four main chart types:
- **Line Chart**: Market growth projections (3 datasets: conservative, moderate, aggressive)
- **Doughnut Chart**: Regional market share distribution
- **Stacked Bar Chart**: Investment flows by source and year
- **Bubble Chart**: Company performance (market cap vs revenue, size = employees)

### Chart Update Pattern
```javascript
// Standard pattern for updating charts
updateSomeChart(newData) {
    if (!this.charts?.chartName) return;
    this.charts.chartName.data.labels = newData.map(d => d.labelField);
    this.charts.chartName.data.datasets = [...]; // Update datasets
    this.charts.chartName.update();
}
```

### Chart Customization
- Colors follow quantum theme palette (`--quantum-primary`, `--quantum-secondary`, etc.)
- Responsive design with `maintainAspectRatio: false`
- Interactive tooltips and legends enabled
- Accessibility-compliant color choices

## User Interface Guidelines

### Interactive Features
- **Filtering**: Time range, confidence level, regional focus
- **Export Functions**: PDF, CSV, PNG (simulated in current implementation)
- **Real-time Updates**: Live timestamp and connection status
- **Mobile Navigation**: Bottom navigation bar for mobile devices

### Accessibility Requirements
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader friendly structure
- Focus management for modal interactions

### Responsive Design Breakpoints
- Desktop: 1024px+ (2x2 grid layout)
- Tablet: 768-1023px (1 column layout)
- Mobile: <768px (stacked layout with mobile nav)

## Data Update Procedures

### Adding New Data
1. **Update CSV files** with new rows while maintaining header structure
2. **Refresh browser** - no build step required
3. **Verify data integrity** through browser console and chart rendering

### Modifying Data Structure
1. **Update CSV headers** if needed
2. **Modify corresponding `loadDataFromCSVs()` mapping** in app.js
3. **Update chart configurations** if data fields change
4. **Run tests** to ensure no breaking changes

## Deployment & Serving

### Local Development
```bash
# Option 1: Using http-server
npx http-server . -p 8080

# Option 2: Using Python
python3 -m http.server 8080

# Then navigate to http://localhost:8080
```

### Production Deployment
- **Static hosting compatible**: No server-side processing required
- **CDN ready**: All assets are client-side
- **HTTPS recommended**: For professional deployment
- **Caching strategy**: Cache static assets, update CSV files as needed

## Common Tasks & Patterns

### Adding a New Chart
1. Add HTML container in `index.html`
2. Create chart instance in `createCharts()` method
3. Add update method following naming convention
4. Call update method in `updateDashboard()`
5. Add corresponding test coverage

### Implementing New Filters
1. Add filter control to HTML
2. Add filter state to `this.filters` object
3. Implement filtering logic in `filterData()` method
4. Add event listener in `setupEventListeners()`
5. Test filter combinations

### Customizing Themes
1. Modify CSS custom properties in `:root`
2. Update dark mode variables in media query
3. Ensure sufficient contrast ratios
4. Test across different devices and browsers

### Performance Optimization
- **Data loading**: CSV files are loaded once on initialization
- **Chart updates**: Only update necessary datasets, not entire chart instances
- **Event throttling**: Consider throttling resize events for better performance
- **Memory management**: Clean up event listeners when needed

## Troubleshooting Common Issues

### Charts Not Rendering
- Check browser console for JavaScript errors
- Verify CSV data is loading correctly
- Ensure Chart.js CDN is accessible
- Validate data structure matches expected format

### Layout Issues
- Check CSS custom property definitions
- Verify responsive breakpoints
- Test across different browsers
- Validate HTML structure

### Data Loading Problems
- Confirm CSV file paths are correct
- Check for CSV formatting issues (commas, quotes, etc.)
- Verify fetch() has proper error handling
- Test with browser network tab

## Future Enhancement Guidelines

### Scalability Considerations
- **Data Source Migration**: Currently CSV-based, could migrate to API endpoints
- **Real-time Updates**: WebSocket integration for live data feeds
- **Advanced Analytics**: Additional chart types or statistical calculations
- **User Customization**: Saved dashboard configurations

### Code Organization
- **Modularization**: Consider splitting large `app.js` into modules
- **Type Safety**: Potential TypeScript migration for larger teams
- **Build Process**: webpack/Vite integration if complexity increases
- **Component System**: Framework migration (React/Vue) if needed

---

## Quick Reference

**Start Development**: `npx http-server . -p 8080`
**Run Tests**: `npm test`
**Key Class**: `QuantumDashboard` in `app.js`
**Data Source**: CSV files in root directory
**Main Entry**: `index.html`
**Styling**: Component-based CSS with custom properties

This dashboard prioritizes executive-level insights with professional presentation, responsive design, and maintainable code architecture.
