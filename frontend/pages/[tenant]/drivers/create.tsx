import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Button,
  FormInput,
  FormInputMask,
  SelectInput,
} from "../../../components";
import { DateInput } from "../../../components/form/form-date-input";
import { api } from "../../../lib/axios/apiClient";
import {
  countryOptions,
  driverLicenseCategories,
  ufOptions,
} from "../../../services/types";

type NewDriverForm = {
  name: string;
  cpf: string;
  rg: string;
  rgUf: string;
  driverLicense: string;
  driverLicenseCategory: string;
  driverLicenseDate: string;
  driverLicenseExpires: string;
  phoneNumber: string;
  email: string;
  postalCode: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
};

const requiredText = "Campo obrigatório";

const driverSchema = yup
  .object({
    name: yup.string().required(requiredText),
    cpf: yup.string().required(requiredText),
    rg: yup.string().required(requiredText),
    rgUf: yup.string().required(requiredText),
    driverLicense: yup.string().required(requiredText),
    driverLicenseCategory: yup.string().required(requiredText),
    driverLicenseDate: yup.string().required(requiredText),
    driverLicenseExpires: yup.string().required(requiredText),
    phoneNumber: yup.string().required(requiredText),
    email: yup.string().email("E-mail inválido").required(),
    postalCode: yup.string(),
    streetAddress: yup.string(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string(),
  })
  .required();

export function CreateDriver() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
  } = useForm<NewDriverForm>({
    resolver: yupResolver(driverSchema),
  });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const onSubmit: SubmitHandler<NewDriverForm> = async (data) => {
    await api
      .post("/drivers", data)
      .then(() => alert("Salvo com sucesso"))
      .catch((e) => alert(e));

    router.push("/tenant/drivers");
  };

  return (
    <>
      <div className="pb-5 ">
        <h2 className="text-xl leading-6 font-bold text-gray-900">
          Cadastrar Motorista
        </h2>
      </div>

      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Dados Pessoais
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Informações necessárias para o cadastro do motorista
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Nome do motorista
                  </label>
                  <FormInput<NewDriverForm>
                    id="name"
                    type="text"
                    name="name"
                    label="Nome do motorista"
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
                    name="cpf"
                    render={({ field }) => (
                      <FormInputMask<NewDriverForm>
                        id="cpf"
                        type="text"
                        name="cpf"
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
                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    RG
                  </label>
                  <Controller
                    control={control}
                    name="rg"
                    render={({ field }) => (
                      <FormInputMask<NewDriverForm>
                        id="rg"
                        type="text"
                        name="rg"
                        className="mb-2"
                        options={{
                          blocks: [15],
                          numericOnly: true,
                        }}
                        errors={errors}
                        onChange={(e) => field.onChange(e.target.rawValue)}
                      />
                    )}
                  />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    UF Emissão
                  </label>
                  <SelectInput<NewDriverForm>
                    id="uf"
                    name="rgUf"
                    options={ufOptions}
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    CNH
                  </label>
                  <Controller
                    control={control}
                    name="driverLicense"
                    render={({ field }) => (
                      <FormInputMask<NewDriverForm>
                        id="driverLicense"
                        type="text"
                        name="driverLicense"
                        className="mb-2"
                        options={{
                          blocks: [15],
                          numericOnly: true,
                        }}
                        errors={errors}
                        onChange={(e) => field.onChange(e.target.rawValue)}
                      />
                    )}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Categoria
                  </label>
                  <SelectInput<NewDriverForm>
                    id="categoria"
                    name="driverLicenseCategory"
                    options={driverLicenseCategories}
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    1ª Emissão
                  </label>
                  <DateInput
                    id="driverLicenseDate"
                    name="driverLicenseDate"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Validade
                  </label>
                  <DateInput
                    id="driverLicenseExpires"
                    name="driverLicenseExpires"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Celular
                  </label>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormInputMask<NewDriverForm>
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        className="mb-2"
                        options={{
                          numericOnly: true,
                          blocks: [2, 1, 4, 4],
                          delimiter: " ",
                        }}
                        errors={errors}
                        onChange={(e) => field.onChange(e.target.rawValue)}
                      />
                    )}
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <FormInput<NewDriverForm>
                    id="email"
                    type="email"
                    name="email"
                    label="E-mail"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button title="Salvar" style="primary" type="submit" />
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Endereço
              </h3>
              <p className="mt-1 text-sm text-gray-500"></p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-2 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    CEP
                  </label>
                  <Controller
                    control={control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormInputMask<NewDriverForm>
                        id="postalCode"
                        type="text"
                        name="postalCode"
                        className="mb-2"
                        options={{
                          delimiters: [".", "-"],
                          blocks: [2, 3, 3],
                          numericOnly: true,
                        }}
                        errors={errors}
                        onChange={(e) => field.onChange(e.target.rawValue)}
                      />
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Endereço
                  </label>
                  <FormInput<NewDriverForm>
                    id="streetAddress"
                    type="text"
                    name="streetAddress"
                    label="Endereço"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Cidade
                  </label>
                  <FormInput<NewDriverForm>
                    id="city"
                    type="text"
                    name="city"
                    label="Cidade"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <SelectInput<NewDriverForm>
                    id="state"
                    name="state"
                    options={ufOptions}
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    País
                  </label>
                  <SelectInput<NewDriverForm>
                    id="country"
                    name="country"
                    options={countryOptions}
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button title="Salvar" style="primary" type="submit" />
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateDriver;
