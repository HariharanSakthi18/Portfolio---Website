import { beforeEach, describe, expect, it } from "vitest";
import { readSpiderSettings, saveSpiderSettings, SPIDER_SETTINGS_KEY } from "@/lib/spider-settings";

describe("spider settings", () => {
  beforeEach(() => localStorage.clear());
  it("shows the spider on the right by default", () => {
    expect(readSpiderSettings()).toEqual({ enabled: true, position: "right" });
  });
  it("retains the disabled setting", () => {
    saveSpiderSettings({ enabled: false, position: "right" });
    expect(readSpiderSettings().enabled).toBe(false);
  });
  it("retains a left-side position", () => {
    saveSpiderSettings({ enabled: true, position: "left" });
    expect(readSpiderSettings().position).toBe("left");
  });
  it("recovers from invalid stored data", () => {
    localStorage.setItem(SPIDER_SETTINGS_KEY, "invalid");
    expect(readSpiderSettings()).toEqual({ enabled: true, position: "right" });
  });
});