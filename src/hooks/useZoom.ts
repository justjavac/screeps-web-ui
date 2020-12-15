import { useState } from "react";

export default function useZoom(initialZoom = 1.0) {
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = () => setZoom(zoom + 0.1);
  const zoomOut = () => setZoom(zoom - 0.1);

  return [zoom, zoomIn, zoomOut] as const;
}
