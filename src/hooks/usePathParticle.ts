import { useEffect } from 'react';
import { useMotionValue, animate } from 'framer-motion';

export function usePathParticle(
  isActive: boolean,
  path: SVGPathElement | null,
  duration: number,
  delay = 0,
  repeat: number,
  repeatDelay: number
) {
  
  const progress = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(1);

  useEffect(() => {
    if (!isActive) return;

    if (!path) return;

    progress.set(0);

    const controls = animate(progress, 1, {
      duration,
      delay,
      ease: "linear",
      repeat,
      repeatDelay
    });

    const unsubscribe = progress.on("change", (value) => {
      const length = path.getTotalLength();
      const point = path.getPointAtLength(value * length);

      x.set(point.x);
      y.set(point.y);

      const fadeStart = 0.85;

      if (value > fadeStart) {
        const t = (value - fadeStart) / (1 - fadeStart);
        opacity.set(1 - t);
      } else {
        opacity.set(1);
      }
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [path, duration, delay, repeat, repeatDelay, isActive]);

  return { x, y, opacity };
}