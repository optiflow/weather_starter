import { createContext, useContext, useEffect, useState } from 'react';
import type { ProviderProps } from '../types';

interface Theme {
  id: string;
  label: string;
}

interface ThemeContextValue {
  themeId: string;
  setThemeId: (themeId: string) => void;
  themes: Theme[];
}

export const THEMES: Theme[] = [
  { id: 'apple', label: 'Apple' },
  { id: 'glassmorphism-sky', label: 'Glassmorphism Sky' },
  { id: 'retro-terminal', label: 'Retro Terminal' },
  { id: 'neo-brutalist', label: 'Neo-Brutalist' },
  { id: 'sketchbook', label: 'Sketchbook' },
  { id: 'cyberpunk', label: 'Cyberpunk' },
  { id: 'vintage-almanac', label: 'Vintage Almanac' },
  { id: 'minimal-swiss', label: 'Minimal Swiss' },
  { id: 'ghibli-pastoral', label: 'Ghibli Pastoral' },
  { id: 'dark-glass', label: 'Dark Glass' },
  { id: 'material-you', label: 'Material You' },
  { id: 'weather-reactive', label: 'Weather Reactive' },
  { id: 'newspaper', label: 'Newspaper' },
  { id: 'aviation-hud', label: 'Aviation HUD' },
  { id: 'claymorphism', label: 'Claymorphism' },
  { id: 'synthwave', label: 'Synthwave' },
  { id: 'paper-cutout', label: 'Paper Cutout' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'cottagecore', label: 'Cottagecore' },
  { id: 'frutiger-aero', label: 'Frutiger Aero' },
  { id: 'risograph', label: 'Risograph' },
];

export const DEFAULT_THEME_ID = 'apple';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: ProviderProps) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);

  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
  }, [themeId]);

  const value = {
    themeId,
    setThemeId,
    themes: THEMES,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
