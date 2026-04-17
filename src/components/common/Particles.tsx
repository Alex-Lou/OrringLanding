import { useMemo } from 'react';

const PARTICLE_COUNT = 20;

/** Ambient floating dots in the background. Randomized once per mount. */
export function Particles({ count = PARTICLE_COUNT }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${6 + Math.random() * 8}s`,
        width: `${3 + Math.random() * 6}px`,
        height: `${3 + Math.random() * 6}px`,
        opacity: 0.15 + Math.random() * 0.2,
      })),
    [count],
  );

  return (
    <div className="particles">
      {particles.map((style, i) => (
        <div key={i} className="particle" style={style} />
      ))}
    </div>
  );
}
