import { useEffect, useState } from "react";

export type DrawingProps = {
  onPolygonComplete?: ((polygon: google.maps.Polygon) => void) | undefined;
} & google.maps.drawing.DrawingManagerOptions;

export function Drawing({ onPolygonComplete, ...options }: DrawingProps) {
  const [drawing, setDrawing] = useState<google.maps.drawing.DrawingManager>();

  const [polygoncompleteListener, setPolygonCompleteListener] =
    useState<google.maps.MapsEventListener | null>(null);

  useEffect(() => {
    if (drawing) {
      drawing.setOptions(options);
    }
  }, [drawing, options]);

  useEffect(() => {
    if (!drawing) {
      setDrawing(
        new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON],
          },
        })
      );
    }

    return () => {
      if (drawing) {
        if (polygoncompleteListener) {
          google.maps.event.removeListener(polygoncompleteListener);
        }

        drawing.setMap(null);
      }
    };
  }, [drawing, polygoncompleteListener]);

  useEffect(() => {
    if (drawing && onPolygonComplete) {
      if (polygoncompleteListener !== null) {
        google.maps.event.removeListener(polygoncompleteListener);
      }

      setPolygonCompleteListener(
        google.maps.event.addListener(
          drawing,
          "polygoncomplete",
          onPolygonComplete
        )
      );
    }
  }, [drawing, onPolygonComplete]);

  return null;
}
