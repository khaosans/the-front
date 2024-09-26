export type ThemeColor = 'blue' | 'green' | 'purple' | 'red' | 'orange';

export const themeColors: Record<ThemeColor, string> = {
  blue: '#3b82f6',
  green: '#10b981',
  purple: '#8b5cf6',
  red: '#ef4444',
  orange: '#f97316',
};

export function getThemeColor(color: ThemeColor): string {
  return themeColors[color];
}

export function setTheme(color: ThemeColor): void {
  localStorage.setItem('theme', color);
  document.documentElement.style.setProperty('--theme-color', getThemeColor(color));
}

export function getStoredTheme(): ThemeColor {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme') as ThemeColor;
    return storedTheme || 'blue';
  }
  return 'blue';
}