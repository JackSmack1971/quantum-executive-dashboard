const { QuantumDashboard } = require('../app');

describe('resize throttling', () => {
  beforeEach(() => {
    QuantumDashboard.prototype.init = jest.fn();
  });

  test('debounce waits before calling function', () => {
    jest.useFakeTimers();
    const dash = new QuantumDashboard();
    const fn = jest.fn();
    const debounced = dash.debounce(fn, 100);
    debounced();
    debounced();
    jest.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('resize and orientationchange use same handler', () => {
    const listeners = {};
    global.window = { addEventListener: jest.fn((evt, h) => { listeners[evt] = h; }), innerWidth: 800 };
    global.document = {
      getElementById: jest.fn(),
      querySelectorAll: jest.fn(() => [])
    };
    const dash = new QuantumDashboard();
    dash.setupEventListeners();
    expect(listeners.resize).toBe(listeners.orientationchange);
  });

  test('orientationchange triggers debounced resize', () => {
    jest.useFakeTimers();
    const listeners = {};
    global.window = { addEventListener: jest.fn((evt, h) => { listeners[evt] = h; }), innerWidth: 800 };
    global.document = {
      getElementById: jest.fn(),
      querySelectorAll: jest.fn(() => [])
    };
    const dash = new QuantumDashboard();
    dash.handleResize = jest.fn();
    dash.setupEventListeners();
    listeners.orientationchange();
    jest.advanceTimersByTime(101);
    expect(dash.handleResize).toHaveBeenCalledTimes(1);
  });
});
