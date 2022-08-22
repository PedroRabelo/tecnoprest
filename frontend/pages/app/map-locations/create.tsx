import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { ChevronDoubleLeftIcon, XIcon } from "@heroicons/react/outline";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, FormInput, SelectInput } from "../../../components";
import { GoBackButton } from "../../../components/button/go-back-button";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  DrawingManager,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { TextAreaInput } from "../../../components/form/form-textarea";
import Toggle from "../../../components/toggle/toggle";
import { api } from "../../../lib/axios/apiClient";
import { setEmptyOrStr } from "../../../lib/lodash";
import { mapLocationType } from "../../../services/types";
import { Places } from "../../../components/google-maps/places";

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places", "drawing"];

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

type Bound = {
  lat: string;
  lng: string;
};

type NewMapLocationForm = {
  title: string;
  type: string;
  description: string;
  lat: string[];
  long: string[];
  isRoute: boolean;
  isPolygon: boolean;
};

const requiredText = "Campo obrigatório";

const mapLocationSchema = yup.object({
  title: yup.string().required(requiredText),
  type: yup.string().required(requiredText),
});

const placeType = [{ name: "Ponto" }, { name: "Polígono" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function CreateMapLocation() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: libraries,
  });

  const mapRef = useRef<GoogleMap>();

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -9.148933007262677, lng: -56.041542722767474 }),
    []
  );
  const zoom = useMemo(() => 4, []); // initial zoom
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [polygon, setPolygon] = useState<google.maps.Polygon>();
  const [bounds, setBounds] = useState<Bound[]>();
  const [placeSelected, setPlaceSelected] =
    useState<google.maps.LatLngLiteral>();
  const [typeSelected, setTypeSelected] = useState(placeType[0]);

  const [isRoute, setIsRoute] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMapLocationForm>({
    resolver: yupResolver(mapLocationSchema),
  });

  useEffect(() => {
    if (placeSelected) {
      mapRef.current?.panTo(placeSelected);
    }
  }, [placeSelected]);

  useEffect(() => {
    if (typeSelected === placeType[1]) {
      setPlaceSelected(undefined);
    }

    if (typeSelected === placeType[0]) {
      polygon?.setMap(null);
      setBounds([]);
    }
  }, [typeSelected, polygon]);

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setPlaceSelected(e.latLng?.toJSON()!);
    setOpen(true);
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
    setOpen(true);
  };

  const onSubmit: SubmitHandler<NewMapLocationForm> = async (data) => {
    if (!bounds && !placeSelected) {
      alert("Informe uma posição no mapa");
      return;
    }

    data.lat = [];
    data.long = [];
    if (bounds) {
      bounds.map((position) => {
        data.lat.push(position.lat);
        data.long.push(position.lng);
      });
    }

    if (placeSelected) {
      data.lat.push(placeSelected.lat.toString());
      data.long.push(placeSelected.lng.toString());
    }

    data = {
      ...data,
      isRoute,
      isPolygon: typeSelected === placeType[1],
    };

    await api
      .post("/map-locations", data)
      .then(() => {
        alert("Salvo com sucesso");
        router.push("/app/map-locations");
      })
      .catch((e) => {
        console.log(e.response.data.message);
        alert(e.message);
      });
  };

  const onLoadDrawing = (drawingManager: any) => {
    console.log(drawingManager);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <GoBackButton />
        </div>
        <div>
          <RadioGroup value={typeSelected} onChange={setTypeSelected}>
            <RadioGroup.Label className="sr-only">
              Escolha o tipo de local
            </RadioGroup.Label>
            <div className="grid grid-cols-2 gap-3">
              {placeType.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className={({ active, checked }) =>
                    classNames(
                      active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                      checked
                        ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                      "cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                    )
                  }
                >
                  <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div>
          <Button
            title=""
            icon={ChevronDoubleLeftIcon}
            type="button"
            color="primary"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      autoComplete="off"
                      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    >
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-lg font-medium text-white">
                              {" "}
                              Informações do Local{" "}
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-indigo-300">
                              Preencha os campos abaixo.
                            </p>
                          </div>
                        </div>
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
                                <FormInput<NewMapLocationForm>
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
                                <SelectInput<NewMapLocationForm>
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
                                  <TextAreaInput<NewMapLocationForm>
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
                          type="button"
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          Fechar
                        </button>
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Salvar
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex h-[78vh] pt-4">
        <GoogleMap
          zoom={5}
          center={center}
          mapContainerStyle={{ flexGrow: "1", height: "100%" }}
          options={options}
          onLoad={onLoad}
          onClick={onClick}
        >
          <div className="absolute m-4 w-72">
            <Places setSelected={setPlaceSelected} />
          </div>

          {typeSelected === placeType[0] && placeSelected && (
            <Marker position={placeSelected} />
          )}

          {typeSelected === placeType[1] && (
            <DrawingManager
              onPolygonComplete={onPolygonComplete}
              onLoad={onLoadDrawing}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default CreateMapLocation;
