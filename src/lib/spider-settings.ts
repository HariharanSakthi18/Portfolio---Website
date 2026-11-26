export type SpiderSettings = { enabled: boolean; position: "left" | "right" };
export const SPIDER_SETTINGS_KEY = "portfolio-spider-settings";
export const defaultSpiderSettings: SpiderSettings = { enabled: true, position: "right" };

export function readSpiderSettings(): SpiderSettings {
  try {
    const saved = JSON.parse(localStorage.getItem(SPIDER_SETTINGS_KEY) || "null");
    return {
      enabled: typeof saved?.enabled === "boolean" ? saved.enabled : true,
      position: saved?.position === "left" ? "left" : "right",
    };
  } catch {
    return { ...defaultSpiderSettings };
  }
}

export function saveSpiderSettings(settings: SpiderSettings) {
  try {
    localStorage.setItem(SPIDER_SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // The controls still work when browser storage is unavailable.
  }
}