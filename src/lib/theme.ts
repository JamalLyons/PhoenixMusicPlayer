export type ThemeMode = 'dark' | 'light';

class ThemeState {
  mode: ThemeMode = 'dark';

  init() {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('phoenix_landing_theme') as ThemeMode | null;
    if (storedTheme) {
      this.setMode(storedTheme);
    } else {
      this.setMode('dark');
    }
  }

  setMode(newMode: ThemeMode) {
    this.mode = newMode;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newMode);
      localStorage.setItem('phoenix_landing_theme', newMode);
    }
  }

  toggleMode() {
    this.setMode(this.mode === 'dark' ? 'light' : 'dark');
  }
}

export const theme = new ThemeState();
