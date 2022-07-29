import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import ComboBox from "../../../components/combobox/combobox";
import { Map } from "../../../components/google-maps";
import { Places } from "../../../components/google-maps/places";

export const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

export function CreateRoute() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: libraries,
  });

  const mapRef = useRef<GoogleMap>();

  const [originSelected, setOriginSelected] =
    useState<google.maps.LatLngLiteral>();
  const [destinationSelected, setDestinationSelected] =
    useState<google.maps.LatLngLiteral>();

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div className="w-full rounded-md h-40 bg-white shadow-md">
        <div className="grid grid-cols-4 pl-4 h-full items-center">
          <div className="flex flex-col gap-2 pr-4">
            <ComboBox label="Origem" placeholder="Selecion um local" />
            <span className="text-center text-xs">OU</span>
            <Places
              setSelected={(position) => {
                setOriginSelected(position);
                mapRef.current?.panTo(position);
              }}
            />
          </div>
          <div className="flex flex-col gap-2 pr-4">
            <ComboBox label="Destino" placeholder="Selecion um local" />
            <span className="text-center text-xs">OU</span>
            <Places
              setSelected={(position) => {
                setDestinationSelected(position);
                mapRef.current?.panTo(position);
              }}
            />
          </div>
          <div className="flex flex-col justify-around">
            <button>Calcular Rota</button>
            <button>Finalizar</button>
          </div>
          <div>
            <span>Distância</span>
          </div>
        </div>
      </div>
      <div className="flex h-[70vh] pt-4">
        <Map onLoad={onLoad} originPosition={originSelected} />
      </div>
    </div>
  );
}

export default CreateRoute;
