import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/** Reads an HSL design token (e.g. "347 77% 50%") and converts it to a THREE-friendly color string. */
const readToken = (name: string) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [h, s, l] = raw.split(/\s+/);
  return h && s && l ? `hsl(${h}, ${s}, ${l})` : "hsl(0, 0%, 50%)";
};

const readPalette = () => ({
  primary: readToken("--primary"),
  accent: readToken("--accent"),
  foreground: readToken("--foreground"),
});

type Palette = ReturnType<typeof readPalette>;

const pointer = { x: 0, y: 0 };
const scroll = { y: 0 };

const Orb = ({ palette }: { palette: Palette }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const wide = viewport.width > 8;
  // Desktop: sits behind the portrait. Phones: tucked into the top-right so text stays readable.
  const position: [number, number, number] = wide
    ? [viewport.width * 0.24, 0.05, -1]
    : [viewport.width * 0.5, viewport.height * 0.4, -3];
  const scale = wide ? 1.65 : 1;

  useFrame((_, dt) => {
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.12;
      mesh.current.rotation.x += dt * 0.04;
    }
    if (group.current) {
      group.current.rotation.z += dt * 0.08;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 1.15 + pointer.y * 0.15, 0.05);
    }
  });

  return (
    <group position={position}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh ref={mesh} scale={scale}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color={palette.primary}
            emissive={palette.primary}
            emissiveIntensity={0.1}
            roughness={0.28}
            metalness={0.85}
            distort={0.38}
            speed={1.6}
          />
        </mesh>
      </Float>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[scale * 1.55, 0.008, 12, 200]} />
          <meshBasicMaterial color={palette.accent} transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[scale * 1.9, 0.005, 12, 200]} />
          <meshBasicMaterial color={palette.foreground} transparent opacity={0.22} />
        </mesh>
      </group>
    </group>
  );
};

const Rig = () => {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    target.set(pointer.x * 0.7, pointer.y * 0.45 - scroll.y * 0.0015, 7 + scroll.y * 0.002);
    camera.position.lerp(target, 0.04);
    camera.lookAt(0, -scroll.y * 0.0015, 0);
  });
  return null;
};

const HeroScene = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [palette, setPalette] = useState<Palette>(readPalette);
  const [compact, setCompact] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => (scroll.y = window.scrollY);
    const onResize = () => setCompact(window.innerWidth < 768);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    if (wrapper.current) io.observe(wrapper.current);

    // Re-read colors when the light/dark theme toggles.
    const mo = new MutationObserver(() => setPalette(readPalette()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[-4, 5, 5]} intensity={2.2} color={palette.foreground} />
        <pointLight position={[4, -2, 3]} intensity={40} distance={14} color={palette.primary} />
        <pointLight position={[-3, -3, 2]} intensity={18} distance={12} color={palette.accent} />
        <Orb palette={palette} />
        <Sparkles count={compact ? 40 : 90} scale={[14, 8, 6]} size={2.2} speed={0.35} color={palette.accent} opacity={0.7} />
        <Rig />
      </Canvas>
    </div>
  );
};

export default HeroScene;
