import { createContext } from 'react'

export type ThemeProps = {
  bg: string
  fg: string
  border: string
  accent: string
  accentedBg: string
  // Texto
  textPrimary: string
  textSecondary: string
  textMuted: string
  // Feedback
  error: string
  info: string
  warn: string
}

export type Theme = {
  name: string
  kind: string
  props: ThemeProps
}

interface ThemeContextType {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export interface ThemeData {
  id: string
  name: string
  data: Record<string, string>
}

export interface ThemeModule {
  default: Theme
}
