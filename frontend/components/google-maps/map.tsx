import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type DirectionsResult = google.maps.DirectionsResult;

type MapsProps = {
  originPosition?: LatLngLiteral;
  destinationPosition?: LatLngLiteral;
  directions?: DirectionsResult;
  onLoad: (map: google.maps.Map) => void;
};

export function Map({
  originPosition,
  destinationPosition,
  directions,
  onLoad,
}: MapsProps) {
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -9.148933007262677, lng: -56.041542722767474 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  return (
    <GoogleMap
      zoom={5}
      center={center}
      mapContainerStyle={{ flexGrow: "1", height: "100%" }}
      options={options}
      onLoad={onLoad}
    >
      {originPosition && <Marker position={originPosition} />}
      {destinationPosition && <Marker position={destinationPosition} />}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#1976D2",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}

export default Map;
