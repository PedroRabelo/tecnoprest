import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, DateInput, FormInput, SelectInput } from "../../../components";
import { GoBackButton } from "../../../components/button/go-back-button";
import { useGet } from "../../../hooks/useGet";
import { api } from "../../../lib/axios/apiClient";
import { setEmptyOrStr } from "../../../lib/lodash";
import { MapLocation } from "../../../services/types/MapLocation";

type NewDeliveryForm = {
  startDate: Date;
  routeName: string;
  origin: string;
}

const requiredText = "Campo obrigatório";

const deliverySchema = yup.object({
  startDate: yup.date().required(requiredText),
  routeName: yup.string().required(requiredText),
  origin: yup.string().required(requiredText),
});

export function CreateDelivery() {
  const { data: routes } = useGet("/map-locations/routes");

  const [file, setFile] = useState<File>();
  const [originLatitude, setOriginLatitude] = useState("");
  const [originLongitude, setOriginLongitude] = useState("");
  const [originName, setOriginName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewDeliveryForm>({
    resolver: yupResolver(deliverySchema),
    defaultValues: {
      origin: undefined,
    },
  });

  function handleSelectFile(e: SyntheticEvent) {
    e.preventDefault();
    if (hiddenFileInput.current)
      hiddenFileInput.current.click();
  }

  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const fileUploaded = e.target.files[0];

      setFile(fileUploaded);
    }
  }

  const onSubmit: SubmitHandler<NewDeliveryForm> = async (data) => {
    setIsLoading(true);
    if (!file) {
      alert("Selecione um arquivo");
    }

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("startDate", data.startDate.toISOString());
    formData.append("routeName", data.routeName);
    formData.append("origin", originName);
    formData.append("originLatitude", originLatitude);
    formData.append("originLongitude", originLongitude);

    await api.post("/deliveries/upload-sheet", formData)
      .then(() => {
        alert("Salvo com sucesso");
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        alert(e.message);
      });
  }

  function handleChangeOrigin(event: any) {
    const mapLocations = routes as MapLocation[];
    mapLocations.filter(
      (location => {
        if (location.id === event.target.value) {
          setOriginName(location.title);
          setOriginLatitude(location.lat[0]);
          setOriginLongitude(location.long[0]);
        }
      })
    );
  }

  return (
    <>
      <GoBackButton />
      <form
        className="space-y-6 mt-4"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Dados da entrega
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Informações gerais da entrega
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Entrega
                  </label>
                  <div className="mt-1 flex rounded-md">
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field }) => (
                        <DateInput
                          id="startDate"
                          name="startDate"
                          className="mb-2"
                          errors={errors}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Rota
                  </label>
                  <FormInput<NewDeliveryForm>
                    id="routeName"
                    type="text"
                    name="routeName"
                    label="Nome da Rota"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origem
                  </label>
                  <SelectInput<NewDeliveryForm>
                    id="origin"
                    name="origin"
                    options={routes}
                    className="mb-2"
                    register={register}
                    errors={errors}
                    value={"id"}
                    onChange={(e) => handleChangeOrigin(e)}
                    rules={{ required: false, setValueAs: setEmptyOrStr }}
                  />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center col-span-2 sm:col-span-2 border-2 rounded-lg">
                  <input
                    className="hidden"
                    type="file"
                    accept=".xlsx, .xls"
                    ref={hiddenFileInput}
                    onChange={handleFileInput}
                  />
                  <Button
                    color="secondary"
                    title="Selecione o arquivo"
                    icon={ArrowUpOnSquareIcon}
                    onClick={handleSelectFile}
                  />
                  <label className="text-sm font-medium text-gray-700 pl-4">
                    {file?.name}
                  </label>
                </div>

              </div>

            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button title="Gerar pedido" color="primary" type="submit" disabled={isLoading} />
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateDelivery;