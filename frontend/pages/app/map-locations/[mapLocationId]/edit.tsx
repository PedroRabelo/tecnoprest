import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { FormInput, SelectInput } from "../../../../components";
import { GoBackButton } from "../../../../components/button/go-back-button";
import { TextAreaInput } from "../../../../components/form/form-textarea";
import {
  Drawing,
  Map,
  Marker,
  PlacesAutocomplete,
} from "../../../../components/map";
import Toggle from "../../../../components/toggle/toggle";
import { useGet } from "../../../../hooks/useGet";
import { setEmptyOrStr } from "../../../../lib/lodash";
import { mapLocationType } from "../../../../services/types";

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <h1>Carregando</h1>;
    case Status.FAILURE:
      return <h1>Erro</h1>;
    case Status.SUCCESS:
      return <EditMapLocation />;
  }
};

type MapLocationForm = {
  title: string;
  type: string;
  description: string;
  lat: string[];
  long: string[];
  isRoute: boolean;
  isPolygon: boolean;
};

const placeType = [{ name: "Ponto" }, { name: "Polígono" }];

type Bound = {
  lat: string;
  lng: string;
};

const requiredText = "Campo obrigatório";

const mapLocationSchema = yup.object({
  title: yup.string().required(requiredText),
  type: yup.string().required(requiredText),
});

export default function EditMapLocation() {
  const router = useRouter();

  const [zoom, setZoom] = useState(5); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -9.148933007262677,
    lng: -56.041542722767474,
  });
  const [polygon, setPolygon] = useState<google.maps.Polygon>();
  const [bounds, setBounds] = useState<Bound[]>();
  const [placeSelected, setPlaceSelected] =
    useState<google.maps.LatLngLiteral>();
  const [typeSelected, setTypeSelected] = useState(placeType[0]);

  const [isRoute, setIsRoute] = useState(false);

  const { data: mapLocation } = useGet(
    `/map-locations/${router.query.mapLocationId}`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MapLocationForm>({
    resolver: yupResolver(mapLocationSchema),
  });

  useEffect(() => {
    setValue("title", mapLocation?.title);
    setValue("type", mapLocation?.type);
    setValue("description", mapLocation?.description);

    setIsRoute(mapLocation?.isRoute);

    if (mapLocation) {
      setZoom(9);
      if (mapLocation.isPolygon) {
        console.log(mapLocation?.lat);
        console.log(mapLocation?.long);
      } else {
        setPlaceSelected({
          lat: parseFloat(mapLocation.lat),
          lng: parseFloat(mapLocation.long),
        });
        setCenter({
          lat: parseFloat(mapLocation.lat),
          lng: parseFloat(mapLocation.long),
        });
      }
    }
  }, [mapLocation, setValue]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setPlaceSelected(e.latLng?.toJSON()!);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    setPolygon(polygon);
    var polygonBounds = polygon.getPath();
    var bounds: Bound[] = [];
    for (var i = 0; i < polygonBounds.getLength(); i++) {
      var point: Bound = {
        lat: polygonBounds.getAt(i).lat().toString(),
        lng: polygonBounds.getAt(i).lng().toString(),
      };
      bounds.push(point);
    }

    setBounds(bounds);
  };

  const onSubmit: SubmitHandler<MapLocationForm> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <GoBackButton />
      <div className="flex pt-4 gap-3">
        <div className="flex h-[77vh] w-2/3">
          <Wrapper
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
            render={render}
            libraries={["drawing", "places"]}
          >
            <Map
              center={center}
              onIdle={onIdle}
              onClick={onClick}
              zoom={zoom}
              streetViewControl={false}
              fullscreenControl={false}
              style={{ flexGrow: "1", height: "100%" }}
            >
              <div className="absolute m-4 w-72">
                <PlacesAutocomplete setSelected={setPlaceSelected} />
              </div>

              {mapLocation && !mapLocation.isPolygon && (
                <Marker position={placeSelected} />
              )}

              {mapLocation && mapLocation.isPolygon && (
                <Drawing onPolygonComplete={onPolygonComplete} />
              )}
            </Map>
          </Wrapper>
        </div>
        <div className="w-1/3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
          >
            <div className="h-0 flex-1 overflow-y-auto">
              <div className="flex flex-1 flex-col justify-between">
                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                  <div className="space-y-6 pt-6 pb-5">
                    <div>
                      <label
                        htmlFor="project-name"
                        className="block text-sm font-medium mb-1 text-gray-900"
                      >
                        Título
                      </label>
                      <FormInput<MapLocationForm>
                        id="title"
                        type="text"
                        name="title"
                        label="Título"
                        className="mb-2"
                        register={register}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="project-name"
                        className="block text-sm font-medium mb-1 text-gray-900"
                      >
                        Tipo
                      </label>
                      <SelectInput<MapLocationForm>
                        id="type"
                        name="type"
                        options={mapLocationType}
                        className="mb-2"
                        register={register}
                        errors={errors}
                        rules={{
                          required: false,
                          setValueAs: setEmptyOrStr,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Descrição
                      </label>
                      <div className="mt-1">
                        <TextAreaInput<MapLocationForm>
                          id="description"
                          name="description"
                          className="mb-2"
                          register={register}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div>
                      <Toggle
                        label="Exibir no controle de rotas?"
                        enabled={isRoute}
                        onChange={setIsRoute}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 justify-end px-4 py-4">
              <button
                type="submit"
                className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
