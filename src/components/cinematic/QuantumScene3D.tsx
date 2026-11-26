import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Reads an HSL design token and returns a THREE-friendly color.
 */
const readToken = (name: string, fallback = "hsl(217, 91%, 60%)") => {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [h, s, l] = raw.split(/\s+/);
  return h && s && l ? `hsl(${h}, ${s}, ${l})` : fallback;
};

const readPalette = () => ({
  primary: readToken("--primary", "hsl(217, 91%, 60%)"),
  accent: readToken("--accent", "hsl(188, 95%, 52%)"),
  glow: readToken("--primary-glow", "hsl(188, 95%, 52%)"),
});

type Palette = ReturnType<typeof readPalette>;

const pointer = { x: 0, y: 0 };

/** 3D Geometric Floating Quantum Wireframe Sculpture */
const FloatingSculpture = ({ palette, isLight }: { palette: Palette; isLight: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const isWide = viewport.width > 8;
  const scale = isWide ? 1.4 : 0.9;
  const position: [number, number, number] = isWide
    ? [viewport.width * 0.32, -0.2, -1.5]
    : [viewport.width * 0.35, 0.5, -2.5];

  useFrame((_, dt) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += dt * 0.15;
      meshRef.current.rotation.y += dt * 0.22;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.12;
      ringRef.current.rotation.x = THREE.MathUtils.lerp(
        ringRef.current.rotation.x,
        0.8 + pointer.y * 0.2,
        0.05
      );
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= dt * 0.3;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Outer Wireframe Icosahedron */}
        <mesh ref={meshRef} scale={scale}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial
            color={palette.accent}
            wireframe
            wireframeLinewidth={1.5}
            emissive={palette.accent}
            emissiveIntensity={isLight ? 0.2 : 0.6}
            transparent
            opacity={isLight ? 0.35 : 0.75}
          />
        </mesh>

        {/* Inner Solid Floating Core with Specular Glow */}
        <mesh ref={coreRef} scale={scale * 0.55}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={palette.primary}
            emissive={palette.primary}
            emissiveIntensity={isLight ? 0.2 : 0.5}
            roughness={0.2}
            metalness={0.9}
            wireframe={false}
            transparent
            opacity={isLight ? 0.4 : 0.85}
          />
        </mesh>
      </Float>

      {/* Orbital Quantum Energy Rings */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[scale * 1.8, 0.012, 16, 120]} />
          <meshBasicMaterial
            color={palette.primary}
            transparent
            opacity={isLight ? 0.3 : 0.6}
          />
        </mesh>
        <mesh rotation={[0.6, 0.4, 0]}>
          <torusGeometry args={[scale * 2.2, 0.008, 16, 120]} />
          <meshBasicMaterial
            color={palette.accent}
            transparent
            opacity={isLight ? 0.2 : 0.45}
          />
        </mesh>
      </group>
    </group>
  );
};

const Rig = () => {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    target.set(pointer.x * 0.4, pointer.y * 0.3, 6);
    camera.position.lerp(target, 0.04);
  });
  return null;
};

/**
 * 3D Quantum Scene:
 * Interactive 3D background sculpture with rotating wireframe polyhedron,
 * orbital energy rings, and volumetric stardust sparkles.
 * Pauses rendering when off-screen for maximum performance.
 */
const QuantumScene3D = () => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [palette, setPalette] = useState<Palette>(readPalette);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const checkLight = () => setIsLight(document.documentElement.classList.contains("light"));
    checkLight();

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    if (wrapper.current) io.observe(wrapper.current);

    const mo = new MutationObserver(() => {
      setPalette(readPalette());
      checkLight();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div ref={wrapper} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "never"}
      >
        <ambientLight intensity={isLight ? 0.6 : 0.4} />
        <directionalLight position={[-3, 4, 4]} intensity={isLight ? 1.5 : 2.2} color={palette.primary} />
        <pointLight position={[3, -2, 2]} intensity={25} distance={12} color={palette.accent} />
        
        <FloatingSculpture palette={palette} isLight={isLight} />
        <Sparkles
          count={isLight ? 25 : 55}
          scale={[12, 8, 6]}
          size={isLight ? 1.5 : 2.5}
          speed={0.4}
          color={palette.accent}
          opacity={isLight ? 0.4 : 0.75}
        />
        <Rig />
      </Canvas>
    </div>
  );
};

export default QuantumScene3D;

