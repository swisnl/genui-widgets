import { afterEach, beforeEach } from 'vitest';

function resetDocument() {
  document.body.innerHTML = '';
  document.documentElement.lang = 'en';
  document.documentElement.style.colorScheme = 'light';

  Object.assign(document.body.style, {
    margin: '0',
    minHeight: '100vh',
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    background: '#f5f5f5',
  });
}

beforeEach(() => {
  resetDocument();
});

afterEach(() => {
  resetDocument();
});
