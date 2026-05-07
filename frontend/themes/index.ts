
import type { Theme, ThemeModule } from "@/types";
const DEFAULT = "l_default"
const modules = import.meta.glob<ThemeModule>('./*.json5', {eager:true});
const themes: Record<string, Theme> = {};

export async function loadAllThemes(): Promise<Record<string, Theme>> {
  for (const path in modules) {
    const themeContent = await modules[path].default;
    const name = path.replace('./', '').replace('.json5', '');
    themes[name] = themeContent;
  }
  return themes;
}

export const All_Themes = loadAllThemes()
export const getDefaultTheme = () => themes[DEFAULT];

