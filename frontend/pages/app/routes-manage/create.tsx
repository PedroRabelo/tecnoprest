import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "../../../components";
import ComboBox, {
  ComboBoxOption,
} from "../../../components/combobox/combobox";
import { Places } from "../../../components/google-maps/places";
import { useGet } from "../../../hooks/useGet";

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type DirectionsResult = google.maps.DirectionsResult;

export function CreateRoute() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: libraries,
  });

  const mapRef = useRef<GoogleMap>();

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

  const [originPlaceSelected, setOriginPlaceSelected] =
    useState<LatLngLiteral>();
  const [destinationPlaceSelected, setDestinationPlaceSelected] =
    useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const { data: routes } = useGet("/map-locations/routes");

  const comboOptions = useMemo(() => {
    if (routes) {
      const options: { id: string; title: string; description?: string }[] = [];
      routes.map((a: any) => {
        options.push({ id: a.id, title: a.title, description: a.type });
      });

      return options;
    }
    return [];
  }, [routes]);

  function filterSelectedPosition(option: ComboBoxOption) {
    const route: any = (routes as []).find((local: any) => {
      if (local.id === option.id) return local;
    });

    const selectedPosition: LatLngLiteral = {
      lat: Number(route.isPolygon ? route?.lat[0] : route?.lat),
      lng: Number(route.isPolygon ? route?.long[0] : route?.long),
    };

    return selectedPosition;
  }

  function getOptionOriginSelectedPosition(option: ComboBoxOption) {
    const position = filterSelectedPosition(option);

    setOriginPlaceSelected(position);
    mapRef.current?.panTo(position);
  }

  function getOptionDestinationSelectedPosition(option: ComboBoxOption) {
    const position = filterSelectedPosition(option);

    setDestinationPlaceSelected(position);
    mapRef.current?.panTo(position);
  }

  function fetchDirections() {
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: originPlaceSelected!,
        destination: destinationPlaceSelected!,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          console.log(result);
        }
      }
    );
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div className="w-full rounded-md h-40 bg-white shadow-md">
        <div className="grid grid-cols-4 pl-4 h-full items-center">
          <div className="flex flex-col gap-2 pr-4">
            <ComboBox
              label="Origem"
              placeholder="Selecione um local"
              options={comboOptions}
              setOptionSelected={(option) => {
                getOptionOriginSelectedPosition(option);
              }}
            />
            <span className="text-center text-xs">OU</span>
            <Places
              setSelected={(position) => {
                setOriginPlaceSelected(position);
                mapRef.current?.panTo(position);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 pr-4">
            <ComboBox
              label="Destino"
              placeholder="Selecione um local"
              options={comboOptions}
              setOptionSelected={(option) => {
                getOptionDestinationSelectedPosition(option);
              }}
            />
            <span className="text-center text-xs">OU</span>
            <Places
              setSelected={(position) => {
                setDestinationPlaceSelected(position);
                mapRef.current?.panTo(position);
              }}
            />
          </div>
          <div className="flex flex-col justify-around">
            <Button
              color="primary"
              title="Traçar Rota"
              onClick={fetchDirections}
              disabled={
                originPlaceSelected === undefined &&
                destinationPlaceSelected === undefined
              }
            />
            <button>Finalizar</button>
          </div>
          <div>
            <span>Distância</span>
          </div>
        </div>
      </div>
      <div className="flex h-[70vh] pt-4">
        <GoogleMap
          zoom={5}
          center={center}
          mapContainerStyle={{ flexGrow: "1", height: "100%" }}
          options={options}
          onLoad={onLoad}
        >
          {originPlaceSelected && <Marker position={originPlaceSelected} />}
          {destinationPlaceSelected && (
            <Marker position={destinationPlaceSelected} />
          )}

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
      </div>
    </div>
  );
}

export default CreateRoute;
