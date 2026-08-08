import { useEffect, useRef } from "react";

type Character = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  char: string;
  alpha: number;
  size: number;
  accent: boolean;
  phase: number;
};

type Pointer = {
  x: number;
  y: number;
  active: boolean;
};

const CODE_CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/\\()=;:+-*#$@%&_|";

const createCharacterField = (width: number, height: number): Character[] => {
  const cellWidth = width < 640 ? 18 : 15;
  const cellHeight = width < 640 ? 17 : 15;
  const columns = Math.ceil(width / cellWidth) + 1;
  const rows = Math.ceil(height / cellHeight) + 1;
  const characters: Character[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = column * cellWidth + (Math.random() - 0.5) * 2;
      const y = row * cellHeight + (Math.random() - 0.5) * 2;
      characters.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        char: CODE_CHARACTERS[Math.floor(Math.random() * CODE_CHARACTERS.length)],
        alpha: 0.08 + Math.random() * 0.2,
        size: width < 640 ? 8 : 9 + Math.random() * 2,
        accent: Math.random() > 0.92,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return characters;
};

const CodeCometField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Pointer = { x: 0, y: 0, active: false };
    let characters: Character[] = [];
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let animationFrame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(height * devicePixelRatio));
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      characters = createCharacterField(width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = pointer.x >= 0 && pointer.x <= bounds.width && pointer.y >= 0 && pointer.y <= bounds.height;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const styles = getComputedStyle(canvas);
      const primary = styles.getPropertyValue("--primary").trim();
      const accent = styles.getPropertyValue("--accent").trim();
      const muted = styles.getPropertyValue("--muted-foreground").trim();
      const influenceRadius = width < 640 ? 130 : 190;

      characters.forEach((character) => {
        const ambientX = reducedMotion ? 0 : Math.sin(time * 0.0004 + character.phase) * 0.16;
        const ambientY = reducedMotion ? 0 : Math.cos(time * 0.00035 + character.phase) * 0.16;
        character.vx += (character.baseX + ambientX - character.x) * 0.018;
        character.vy += (character.baseY + ambientY - character.y) * 0.018;

        let highlight = 0;
        if (!reducedMotion && pointer.active) {
          const dx = pointer.x - character.x;
          const dy = pointer.y - character.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < influenceRadius) {
            const influence = 1 - distance / influenceRadius;
            character.vx -= (dx / Math.max(distance, 1)) * influence * 0.8;
            character.vy -= (dy / Math.max(distance, 1)) * influence * 0.8;
            highlight = influence;
          }
        }

        character.vx *= 0.82;
        character.vy *= 0.82;
        character.x += character.vx;
        character.y += character.vy;

        context.font = `${character.size}px "JetBrains Mono", monospace`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = `hsl(${character.accent ? accent : muted} / ${Math.min(0.75, character.alpha + highlight * 0.55)})`;
        context.fillText(character.char, character.x, character.y);
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
};

export default CodeCometField;
