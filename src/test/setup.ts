import '@testing-library/jest-dom';

// Polyfill window.scrollTo in JSDOM
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
}
