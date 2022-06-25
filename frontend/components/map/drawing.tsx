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
          drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.POLYLINE,
              google.maps.drawing.OverlayType.RECTANGLE,
            ],
          },
          markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          },
          circleOptions: {
            fillColor: "#ffff00",
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1,
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
