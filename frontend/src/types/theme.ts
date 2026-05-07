import { createContext } from 'react'

export type ThemeProps = {
    accent: string,
    accentedBg: string,
    fg: string,
    bg: string,
    error: string,
    info: string,
    warn: string
}

export type Theme = {
    name: string,
    kind: string,
    props: ThemeProps
}

interface ThemeContextType {
  theme: Theme 
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export interface ThemeData {
  id: string;
  name: string;
  data: Record<string, string>;
}

export interface ThemeModule {
  default: Theme;
}