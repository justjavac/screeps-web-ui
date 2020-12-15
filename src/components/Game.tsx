import Canvas from "./Canvas";

import useZoom from "../hooks/useZoom";

type Props = {
  room: string;
};

export default function Game({ room }: Props) {
  const [zoom, zoomIn, zoomOut] = useZoom(0.2);

  return <div>
    <Canvas
      zoomLevel={zoom}
      room={room}
    />
    <div
      style={{
        position: "relative",
        "zIndex": 1,
        background: "rgba(0,0,0,0.3)",
        color: "white",
        padding: "10px",
      }}
    >
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
    </div>
  </div>;
}
