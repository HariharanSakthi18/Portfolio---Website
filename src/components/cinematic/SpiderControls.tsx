import { useState } from "react";
import { ArrowLeftToLine, ArrowRightToLine, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { readSpiderSettings, saveSpiderSettings, type SpiderSettings } from "@/lib/spider-settings";
import ThemeSwingHero from "./ThemeSwingHero";

export default function SpiderControls() {
  const [settings, setSettings] = useState(readSpiderSettings);
  const update = (next: SpiderSettings) => {
    setSettings(next);
    saveSpiderSettings(next);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 z-40 h-44 lg:fixed lg:top-24 lg:h-0">
      <div className="pointer-events-auto absolute left-1/2 top-3 -translate-x-1/2 lg:left-auto lg:right-5 lg:top-0 lg:translate-x-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="icon-btn h-11 w-11" aria-label="Spider settings" title="Spider settings">
              <Settings2 />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="center" collisionPadding={16} className="z-[70] w-64">
            <h2 className="mb-4 font-semibold">Spider settings</h2>
            <div className="mb-5 flex items-center justify-between gap-4">
              <label htmlFor="spider-enabled" className="text-sm">Show spider</label>
              <Switch id="spider-enabled" checked={settings.enabled} onCheckedChange={(enabled) => update({ ...settings, enabled })} />
            </div>
            <p id="spider-position-label" className="mb-2 text-sm text-muted-foreground">Position</p>
            <ToggleGroup type="single" value={settings.position} onValueChange={(position) => {
              if (position === "left" || position === "right") update({ ...settings, position });
            }} aria-labelledby="spider-position-label" variant="outline" className="justify-start">
              <ToggleGroupItem value="left" aria-label="Left side" className="gap-2"><ArrowLeftToLine className="h-4 w-4" />Left</ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right side" className="gap-2"><ArrowRightToLine className="h-4 w-4" />Right</ToggleGroupItem>
            </ToggleGroup>
          </PopoverContent>
        </Popover>
      </div>
      {settings.enabled && <ThemeSwingHero key={settings.position} position={settings.position} />}
    </div>
  );
}