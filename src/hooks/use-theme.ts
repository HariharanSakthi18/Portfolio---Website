import { useCallback, useEffect, useState } from "react";

const readIsLight = () => document.documentElement.classList.contains("light");

/** Shared light/dark theme state. Any component can toggle it and all others stay in sync. */
export const useTheme = () => {
  const [isLight, setIsLight] = useState(readIsLight);

  useEffect(() => {
    const mo = new MutationObserver(() => setIsLight(readIsLight()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const toggle = useCallback(() => {
    document.documentElement.classList.toggle("light");
  }, []);

  return { isLight, toggle };
};
