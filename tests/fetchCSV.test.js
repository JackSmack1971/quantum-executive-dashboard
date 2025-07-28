const { QuantumDashboard, CSVFetchError } = require('../app');

describe('fetchCSV error handling', () => {
  beforeEach(() => {
    QuantumDashboard.prototype.init = jest.fn();
  });

  test('throws CSVFetchError on network failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('network down')));
    const dash = new QuantumDashboard();
    await expect(dash.fetchCSV('bad.csv')).rejects.toThrow(CSVFetchError);
    expect(fetch).toHaveBeenCalled();
  });

  test('throws CSVFetchError on non-OK status', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 500, statusText: 'Server Error' }));
    const dash = new QuantumDashboard();
    await expect(dash.fetchCSV('bad.csv')).rejects.toThrow(CSVFetchError);
    expect(fetch).toHaveBeenCalled();
  });
});
