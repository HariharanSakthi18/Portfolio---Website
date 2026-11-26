import { useEffect, useRef } from "react";

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  activation: number;
  neighbors: number[];
}

interface SynapticPulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

/**
 * Interactive Neural Synaptic Network.
 * Simulates a deep neural network with synaptic connections, active token pulses,
 * and mouse-driven transformer attention weighting.
 */
const CyberParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const isMobile = width < 768;
    const neuronCount = isMobile ? 26 : 48;
    const maxConnectDist = isMobile ? 120 : 160;

    const neurons: Neuron[] = [];
    for (let i = 0; i < neuronCount; i++) {
      neurons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 1.6,
        activation: Math.random() * 0.4 + 0.2,
        neighbors: [],
      });
    }

    // Active synaptic pulses (data tokens traveling along connections)
    const pulses: SynapticPulse[] = [];

    let mouseX = -9999;
    let mouseY = -9999;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let isLight = document.documentElement.classList.contains("light");
    const mo = new MutationObserver(() => {
      isLight = document.documentElement.classList.contains("light");
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let lastPulseTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update neuron positions
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        else if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        else if (n.y > height) n.y = 0;

        // Mouse attention: increase activation if near cursor
        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          n.activation = Math.min(1, n.activation + (1 - dist / 180) * 0.08);
        } else {
          n.activation = Math.max(0.18, n.activation - 0.005);
        }

        n.neighbors = [];
      }

      // 2. Find synaptic connections
      for (let i = 0; i < neurons.length; i++) {
        const n1 = neurons[i];
        for (let j = i + 1; j < neurons.length; j++) {
          const n2 = neurons[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            n1.neighbors.push(j);
            n2.neighbors.push(i);

            const weight = (1 - dist / maxConnectDist);
            const lineAlpha = weight * (Math.max(n1.activation, n2.activation)) * (isLight ? 0.16 : 0.28);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isLight
              ? `rgba(37, 99, 235, ${lineAlpha})`
              : `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = weight * (isLight ? 1 : 1.2);
            ctx.stroke();
          }
        }
      }

      // 3. Spawn synaptic transmission pulses (neural firing)
      const now = Date.now();
      if (now - lastPulseTime > (isMobile ? 260 : 160)) {
        lastPulseTime = now;
        // Pick a random neuron with connections
        const activeCandidates = neurons
          .map((n, idx) => ({ idx, count: n.neighbors.length }))
          .filter((c) => c.count > 0);

        if (activeCandidates.length > 0) {
          const from = activeCandidates[Math.floor(Math.random() * activeCandidates.length)];
          const fromNeuron = neurons[from.idx];
          const toIndex = fromNeuron.neighbors[Math.floor(Math.random() * fromNeuron.neighbors.length)];

          pulses.push({
            fromIndex: from.idx,
            toIndex,
            progress: 0,
            speed: Math.random() * 0.02 + 0.015,
          });
        }
      }

      // 4. Update and render synaptic pulses (data tokens in flight)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          // Pulse arrived, trigger flash in destination neuron
          if (neurons[p.toIndex]) {
            neurons[p.toIndex].activation = Math.min(1, neurons[p.toIndex].activation + 0.4);
          }
          pulses.splice(i, 1);
          continue;
        }

        const n1 = neurons[p.fromIndex];
        const n2 = neurons[p.toIndex];
        if (!n1 || !n2) {
          pulses.splice(i, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * p.progress;
        const py = n1.y + (n2.y - n1.y) * p.progress;

        // Draw glowing token pulse
        ctx.beginPath();
        ctx.arc(px, py, isLight ? 2 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? "#2563eb" : "#06b6d4";
        ctx.shadowColor = isLight ? "rgba(37, 99, 235, 0.8)" : "rgba(6, 182, 212, 0.9)";
        ctx.shadowBlur = isLight ? 6 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Draw neurons (synaptic nodes)
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        const r = n.radius * (1 + (n.activation - 0.2) * 0.4);

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);

        if (isLight) {
          ctx.fillStyle = `rgba(37, 99, 235, ${0.4 + n.activation * 0.5})`;
          ctx.shadowColor = "rgba(37, 99, 235, 0.5)";
          ctx.shadowBlur = n.activation * 8;
        } else {
          ctx.fillStyle = `rgba(6, 182, 212, ${0.4 + n.activation * 0.6})`;
          ctx.shadowColor = "rgba(6, 182, 212, 0.7)";
          ctx.shadowBlur = n.activation * 12;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner nucleus dot for high-activation neurons
        if (n.activation > 0.6) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
};

export default CyberParticles;
