
import type { Theme, ThemeModule } from "@/types";
const DEFAULT = "l_default"
const modules = import.meta.glob<ThemeModule>('./*.json5');
const themes: Record<string, Theme> = {};

export async function loadAllThemes(): Promise<Record<string, Theme>> {


  for (const path in modules) {
    const themeContent = await modules[path]();
    const name = path.replace('./', '').replace('.json5', '');
    themes[name] = themeContent.default;
  }
  return themes;
}

export const Default_Theme = themes[DEFAULT]
export const All_Themes = loadAllThemes()