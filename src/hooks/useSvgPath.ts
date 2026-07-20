import React, { useEffect, useState } from 'react';

export function useSvgPath(
  svgRef: React.RefObject<SVGSVGElement | null>,
  pathId: string
) {
  
  const [path, setPath] = useState<SVGPathElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const el = svgRef.current.querySelector(`#${pathId}`);

    if (el instanceof SVGPathElement) {
      setPath(el);
    }
  }, [svgRef, pathId]);

  return path;
}