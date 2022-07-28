import { useEffect, useState } from "react";

export function Polygon({ ...options }: google.maps.PolygonOptions) {
  const [polygon, setPolygon] = useState<google.maps.Polygon>();

  useEffect(() => {
    if (!polygon) {
      setPolygon(new google.maps.Polygon());
    }

    // remove marker from map on unmount
    return () => {
      if (polygon) {
        polygon.setMap(null);
      }
    };
  }, [polygon]);

  useEffect(() => {
    if (polygon) {
      polygon.setOptions(options);
    }
  }, [polygon, options]);

  return null;
}
