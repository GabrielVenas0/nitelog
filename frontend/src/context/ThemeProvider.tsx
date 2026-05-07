import { useState, useEffect} from 'react';
import { ThemeContext,  type Theme } from '@/types';
import { Default_Theme } from '../../themes/index';

import { Get_Storage } from '@/utility';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>( Get_Storage("THEME") ||Default_Theme);

  useEffect(() => {
    const root = document.documentElement;
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

