import { describe, expect, it } from "vitest";
import { aboutCards } from "@/lib/data";

describe("confirmed internship dates", () => {
  it("uses the confirmed Artificial Augment internship dates", () => {
    expect(aboutCards.find((card) => card.id === "artificial-augment")?.meta).toBe("20/10/26 - 19/04/27");
  });
});