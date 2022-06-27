import { Dialog, Transition } from "@headlessui/react";
import { ChevronDoubleLeftIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useRef, useState } from "react";
import { Button, FormInput, SelectInput } from "../../../components";
import { GoBackButton } from "../../../components/button/go-back-button";

import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Drawing, Map } from "../../../components/map";
import { Marker } from "../../../components/map/marker";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../lib/axios/apiClient";
import { useRouter } from "next/router";
import { TextAreaInput } from "../../../components/form/form-textarea";
import { setEmptyOrStr } from "../../../lib/lodash";
import { mapLocationType } from "../../../services/types";

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <h1>Carregando</h1>;
    case Status.FAILURE:
      return <h1>Erro</h1>;
    case Status.SUCCESS:
      return <CreateMapLocation />;
  }
};

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
};

const requiredText = "Campo obrigatório";

const mapLocationSchema = yup.object({
  title: yup.string().required(requiredText),
  type: yup.string().required(requiredText),
});

export function CreateMapLocation() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(4); // initial zoom
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -9.148933007262677,
    lng: -56.041542722767474,
  });
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [bounds, setBounds] = useState<Bound[]>();

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
    setValue,
  } = useForm<NewMapLocationForm>({
    resolver: yupResolver(mapLocationSchema),
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
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
    if (!bounds) {
      alert("Informe uma posição no mapa");
      return;
    }

    data.lat = [];
    data.long = [];
    await bounds.map((position) => {
      data.lat.push(position.lat);
      data.long.push(position.lng);
    });

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

  return (
    <>
      <div className="flex justify-between">
        <GoBackButton />
        <Button
          title=""
          icon={ChevronDoubleLeftIcon}
          type="button"
          color="primary"
          onClick={() => setOpen(true)}
        />
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
                                <label
                                  htmlFor="description"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  Posições
                                </label>
                                {bounds?.map((item) => {
                                  return (
                                    <span key={item.lat}>
                                      lat: {item.lat} long: {item.lng}
                                    </span>
                                  );
                                })}
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
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
          render={render}
          libraries={["drawing"]}
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
            {clicks.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))}
            <Drawing onPolygonComplete={onPolygonComplete} />
          </Map>
        </Wrapper>
      </div>
    </>
  );
}

export default CreateMapLocation;
