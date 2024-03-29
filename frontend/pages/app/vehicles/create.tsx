import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Button,
  FormInput,
  FormInputMask,
  SelectInput,
} from "../../../components";
import { GoBackButton } from "../../../components/button/go-back-button";
import { useGet, useGetDependent } from "../../../hooks/useGet";
import { api } from "../../../lib/axios/apiClient";
import { setEmptyOrStr } from "../../../lib/lodash";
import { Vehicle } from "../../../services/types/Vehicle";

type NewVehicleForm = {
  licensePlate: string;
  renavan: string;
  chassi: string;
  modelYear: string;
  createdYear: string;
  ownerCpf: string;
  owner: string;
  categoryId: string;
  makeId: string;
  modelId: string;
};

const requiredText = "Campo obrigatório";

const vehicleSchema = yup.object({
  licensePlate: yup.string().required(requiredText),
});

export function CreateVehicle() {
  const router = useRouter();

  const [makerSelected, setMakerSelected] = useState<string>("");
  const [vehicle, setVehicle] = useState<Vehicle>();

  const { data: categories } = useGet("vehicle-categories");
  const { data: makers } = useGet("vehicle-makers");
  const { data: models } = useGetDependent(
    "vehicle-models/maker/" + makerSelected
  );

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
    setValue,
  } = useForm<NewVehicleForm>({
    resolver: yupResolver(vehicleSchema),
    defaultValues: {
      categoryId: undefined,
      makeId: undefined,
      modelId: undefined,
    },
  });

  const onSubmit: SubmitHandler<NewVehicleForm> = async (data) => {
    await api
      .post("/vehicles", data)
      .then(() => {
        alert("Salvo com sucesso");
        router.push("/app/vehicles");
      })
      .catch((e) => {
        console.log(e.response.data.message);
        alert(e.message);
      });
  };

  function handleChangeMaker(event: any) {
    setMakerSelected(event.target.value);
  }

  async function handleSearchLicensePlate(licensePlate: string) {
    await api
      .get("/vehicles/" + licensePlate)
      .then((response) => {
        setVehicle(response.data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
        alert(e.message);
      });
  }

  useEffect(() => {
    setValue("makeId", vehicle?.makeId ? vehicle.makeId : "");
    setValue("modelId", vehicle?.modelId ? vehicle.modelId : "");
    setValue("modelYear", vehicle?.modelYear ? vehicle.modelYear : "");
    setValue("createdYear", vehicle?.createdYear ? vehicle.createdYear : "");
    setValue("categoryId", vehicle?.categoryId ? vehicle.categoryId : "");
    setValue("chassi", vehicle?.chassi ? vehicle.chassi : "");
    setValue("renavan", vehicle?.renavan ? vehicle.renavan : "");
    setValue("owner", vehicle?.owner ? vehicle.owner : "");
  }, [vehicle, setValue]);

  return (
    <>
      <GoBackButton />
      <form
        className="space-y-6 mt-4"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Cadastro de Veículo
              </h3>
              <p className="text-sm text-gray-500">
                Comece informando a placa, para verificar se o veículo já está
                cadastrado
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Placa
                  </label>
                  <div className="mt-1 flex rounded-md">
                    <Controller
                      control={control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormInputMask<NewVehicleForm>
                          id="licensePlate"
                          type="text"
                          name="licensePlate"
                          className="mb-2"
                          options={{
                            delimiters: ["-"],
                            blocks: [3, 4],
                            uppercase: true,
                          }}
                          errors={errors}
                          onChange={(e) => field.onChange(e.target.rawValue)}
                          onBlur={(e) => handleSearchLicensePlate(field.value)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Dados do veículo
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Informações do veículo
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marca
                  </label>
                  <SelectInput<NewVehicleForm>
                    id="maker"
                    name="makeId"
                    options={makers}
                    className="mb-2"
                    register={register}
                    errors={errors}
                    onChange={(e) => handleChangeMaker(e)}
                    rules={{ required: false, setValueAs: setEmptyOrStr }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modelo
                  </label>
                  <SelectInput<NewVehicleForm>
                    id="model"
                    name="modelId"
                    options={models}
                    className="mb-2"
                    register={register}
                    errors={errors}
                    rules={{ required: false, setValueAs: setEmptyOrStr }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ano Modelo
                  </label>
                  <Controller
                    control={control}
                    name="modelYear"
                    render={({ field }) => (
                      <FormInputMask<NewVehicleForm>
                        id="modelYear"
                        type="text"
                        name="modelYear"
                        className="mb-2"
                        options={{
                          blocks: [4],
                          numericOnly: true,
                        }}
                        errors={errors}
                        onChange={(e) => field.onChange(e.target.rawValue)}
                      />
                    )}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ano Fabricação
                  </label>
                  <Controller
                    control={control}
                    name="createdYear"
                    render={({ field }) => (
                      <FormInputMask<NewVehicleForm>
                        id="createdYear"
                        type="text"
                        name="createdYear"
                        className="mb-2"
                        options={{
                          blocks: [4],
                          numericOnly: true,
                        }}
                        errors={errors}
                        onChange={(e) => field.onChange(e.target.rawValue)}
                      />
                    )}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <SelectInput<NewVehicleForm>
                    id="category"
                    name="categoryId"
                    options={categories}
                    className="mb-2"
                    register={register}
                    errors={errors}
                    rules={{ required: false, setValueAs: setEmptyOrStr }}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chassi
                  </label>
                  <FormInput<NewVehicleForm>
                    id="chassi"
                    type="text"
                    name="chassi"
                    label="Chassi"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Renavan
                  </label>
                  <FormInput<NewVehicleForm>
                    id="renavan"
                    type="text"
                    name="renavan"
                    label="Renavan"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner
                  </label>
                  <FormInput<NewVehicleForm>
                    id="owner"
                    type="text"
                    name="owner"
                    label="Owner"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    CPF
                  </label>
                  <Controller
                    control={control}
                    name="ownerCpf"
                    render={({ field }) => (
                      <FormInputMask<NewVehicleForm>
                        id="ownerCpf"
                        type="text"
                        name="ownerCpf"
                        className="mb-2"
                        options={{
                          delimiters: [".", ".", "-"],
                          blocks: [3, 3, 3, 2],
                          numericOnly: true,
                        }}
                        errors={errors}
                        onChange={(e) => field.onChange(e.target.rawValue)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button title="Salvar" color="primary" type="submit" />
        </div>
      </form>
    </>
  );
}

export default CreateVehicle;
