# Quantum Executive Dashboard

The Quantum Executive Dashboard is a static single-page site that visualizes key market metrics for the quantum computing industry. Charts built with Chart.js provide projections, regional share data, investment trends and company performance to help executives understand the market landscape.

## Prerequisites
- [Node.js](https://nodejs.org/) (required only for running tests)
- A simple HTTP server such as `npx http-server` or `python3 -m http.server`
- A modern web browser

## Serving the site locally
1. Install dependencies (for tests):
   ```bash
   npm install
   ```
2. Launch a local server from the repository root. Example using `http-server`:
   ```bash
   npx http-server . -p 8080
   ```
   Or with Python:
   ```bash
   python3 -m http.server 8080
   ```
3. Navigate to `http://localhost:8080` in your browser to view the dashboard.

The project does not require a build step. `index.html` pulls Chart.js from a CDN and the page loads the CSV files directly.

## Updating datasets
The dashboard reads several CSV files at startup:
- `quantum_market_projections.csv`
- `quantum_regional_data.csv`
- `quantum_investment_flows.csv`
- `quantum_company_performance.csv`
- `quantum_trends_challenges.csv`

To update the dashboard data, replace these files with new versions while keeping their headers intact. Refresh the page after updating to load the new values.

## Development
- Run the Jest suite with:
  ```bash
  npm test
  ```
- Charts are created with Chart.js in `app.js`. If you introduce additional tooling (e.g., bundlers), run the build step before serving the site.

## License
This project is licensed under the [MIT License](LICENSE).
