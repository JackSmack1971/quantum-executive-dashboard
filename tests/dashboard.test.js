const { QuantumDashboard } = require('../app');

beforeEach(() => {
  QuantumDashboard.prototype.init = jest.fn();
});

describe('filterData', () => {
  test('filters by time range', () => {
    const dash = new QuantumDashboard();
    dash.filters.timeRange = '2024-2025';
    const filtered = dash.filterData();
    expect(filtered.market_projections.every(mp => mp.year >= 2024 && mp.year <= 2025)).toBe(true);
  });

  test('filters by confidence level', () => {
    const dash = new QuantumDashboard();
    dash.filters.confidenceLevel = 'high';
    const filtered = dash.filterData();
    expect(filtered.market_projections.every(mp => mp.confidence === 'High')).toBe(true);
    expect(filtered.companies.every(c => c.confidence === 'High')).toBe(true);
  });

  test('filters by region', () => {
    const dash = new QuantumDashboard();
    dash.filters.regionFocus = 'north-america';
    const filtered = dash.filterData();
    expect(filtered.regional_data.length).toBe(1);
    expect(filtered.regional_data[0].region).toBe('North America');
  });
});

describe('chart update functions', () => {
  function setupCharts(dash) {
    dash.charts = {
      market: { data: { labels: [], datasets: [] }, update: jest.fn() },
      regional: { data: { labels: [], datasets: [{ data: [] }] }, update: jest.fn() },
      investment: { data: { labels: [], datasets: [] }, update: jest.fn() },
      company: { data: { datasets: [] }, update: jest.fn() }
    };
  }

  test('updateMarketChart updates chart data', () => {
    const dash = new QuantumDashboard();
    setupCharts(dash);
    const mp = [{ year: 2024, conservative: 1, moderate: 2, aggressive: 3 }];
    dash.updateMarketChart(mp);
    expect(dash.charts.market.data.labels).toEqual([2024]);
    expect(dash.charts.market.data.datasets.length).toBe(3);
    expect(dash.charts.market.update).toHaveBeenCalled();
  });
});

describe('updateDashboard', () => {
  test('calls chart update functions', () => {
    const dash = new QuantumDashboard();
    dash.updatePanelData = jest.fn();
    dash.updateInsights = jest.fn();
    dash.measurePerformance = jest.fn();
    dash.updateMarketChart = jest.fn();
    dash.updateRegionalChart = jest.fn();
    dash.updateInvestmentChart = jest.fn();
    dash.updateCompanyChart = jest.fn();
    dash.updateDashboard();
    expect(dash.updateMarketChart).toHaveBeenCalled();
    expect(dash.updateRegionalChart).toHaveBeenCalled();
    expect(dash.updateInvestmentChart).toHaveBeenCalled();
    expect(dash.updateCompanyChart).toHaveBeenCalled();
  });
});

describe('createCharts', () => {
  beforeEach(() => {
    global.document = { getElementById: jest.fn(() => ({})) };
    global.Chart = jest.fn().mockImplementation(() => ({ update: jest.fn() }));
  });

  test('instantiates charts with existing data', async () => {
    const dash = new QuantumDashboard();
    dash.data.market_projections = [{ year: 2024, conservative: 1, moderate: 2, aggressive: 3 }];
    dash.data.regional_data = [{ region: 'A', share: 10 }];
    dash.data.investment_flows = [{ year: 2024, vc: 1, government: 2, corporate: 3 }];
    dash.data.companies = [{ name: 'IBM', marketCap: 1, revenue: 1, employees: 100, technology: 'Superconducting' }];
    await dash.createCharts();
    expect(Chart).toHaveBeenCalledTimes(4);
    expect(dash.charts.market).toBeDefined();
  });

  test('loads data when arrays are empty', async () => {
    const dash = new QuantumDashboard();
    dash.data.market_projections = [];
    dash.loadDataFromCSVs = jest.fn().mockResolvedValue(undefined);
    await dash.createCharts();
    expect(dash.loadDataFromCSVs).toHaveBeenCalled();
  });
});
