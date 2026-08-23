export type ThemeMode = 'dark' | 'light';

export const ACCENT_PRESETS = [
  { name: 'Warm Gold', color: '#e8e0d6', glow: 'rgba(232, 224, 214, 0.35)' },
  { name: 'Sunset Amber', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.35)' },
  { name: 'Rosewood', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.35)' },
  { name: 'Emerald', color: '#10b981', glow: 'rgba(16, 185, 129, 0.35)' },
  { name: 'Electric Cyan', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.35)' },
  { name: 'Amethyst', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.35)' },
];

class ThemeState {
  mode: ThemeMode = 'dark';
  accent: string = '#e8e0d6';

  init() {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('phoenix_landing_theme') as ThemeMode | null;
    const storedAccent = localStorage.getItem('phoenix_landing_accent');

    if (storedTheme) {
      this.setMode(storedTheme);
    }
    if (storedAccent) {
      this.setAccent(storedAccent);
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

  setAccent(color: string) {
    this.accent = color;
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--ph-accent', color);
      document.documentElement.style.setProperty('--ph-accent-glow', `${color}55`);
      document.documentElement.style.setProperty('--ph-accent-border', `${color}44`);
      document.documentElement.style.setProperty('--ph-accent-muted', `${color}22`);
      localStorage.setItem('phoenix_landing_accent', color);
    }
  }
}

export const theme = new ThemeState();
