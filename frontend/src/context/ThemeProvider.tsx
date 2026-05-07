import { useState, useEffect} from 'react';
import { ThemeContext,  type Theme } from '@/types';
import { getDefaultTheme} from '../../themes/index';

import { Get_Storage } from '@/utility';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>( Get_Storage("THEME") || getDefaultTheme());

  useEffect(() => {
    const root = document.documentElement;
    console.log(theme)
    Object.entries(theme.props).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

