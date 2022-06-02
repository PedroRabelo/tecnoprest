import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Button,
  FormErrorMessage,
  FormInput,
  FormInputMask,
  SelectInput,
} from "../../../components";
import { api } from "../../../lib/axios/apiClient";

type NewClientForm = {
  slug: string;
  logoUrl: string;
  cnpj: string;
  name: string;
  email: string;
  contactName: string;
  contactNumber: string;
  postalCode: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
};

const requiredText = "Campo obrigatório";

const clientSchema = yup
  .object({
    slug: yup.string().required(requiredText),
    cnpj: yup.string().required(requiredText),
    name: yup.string().required(requiredText),
    email: yup.string().email("E-mail inválido").required(),
    contactName: yup.string().required(requiredText),
    contactNumber: yup.string().required(requiredText),
    postalCode: yup.string().required(requiredText),
    streetAddress: yup.string().required(requiredText),
    city: yup.string().required(requiredText),
    state: yup.string().required(requiredText),
    country: yup.string().required(requiredText),
  })
  .required();

const options: string[] = ["Brasil", "Argentina", "Paraguai"];

export function CreateClient() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
  } = useForm<NewClientForm>({
    resolver: yupResolver(clientSchema),
  });

  useEffect(() => {
    setFocus("slug");
  }, [setFocus]);

  const onSubmit: SubmitHandler<NewClientForm> = async (data) => {
    await api
      .post("/tenants", data)
      .then(() => alert("Salvo com sucesso"))
      .catch((e) => alert(e));

    router.push("/admin/clients");
  };

  return (
    <>
      <div className="pb-5 ">
        <h2 className="text-xl leading-6 font-bold text-gray-900">
          Cadastrar Cliente
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
                Perfil
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Informações para acessar o sistema
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700"
                  >
                    URL de acesso
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      tecnoprest.com/
                    </span>
                    <input
                      type="text"
                      className={classNames([
                        "flex-1 block p-3 text-base w-full rounded-r-md leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 bg-gray-50 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30",
                        errors.slug &&
                          "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600",
                      ])}
                      {...register("slug")}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="slug"
                    render={({ message }) => (
                      <FormErrorMessage className="mt-1">
                        {message}
                      </FormErrorMessage>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Dados da empresa
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Informações de cadastro da empresa
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    CNPJ
                  </label>
                  <Controller
                    control={control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormInputMask<NewClientForm>
                        id="cnpj"
                        type="text"
                        name="cnpj"
                        className="mb-2"
                        options={{
                          delimiters: [".", ".", "/", "-"],
                          blocks: [2, 3, 3, 4, 2],
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
                    Nome da empresa
                  </label>
                  <FormInput<NewClientForm>
                    id="name"
                    type="text"
                    name="name"
                    label="Nome da empresa"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <FormInput<NewClientForm>
                    id="email"
                    type="email"
                    name="email"
                    label="E-mail"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Nome do responsável
                  </label>
                  <FormInput<NewClientForm>
                    id="contactName"
                    type="text"
                    name="contactName"
                    label="Nome Responsável"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Telefone de contato(Whatsapp)
                  </label>
                  <Controller
                    control={control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormInputMask<NewClientForm>
                        id="contactNumber"
                        type="text"
                        name="contactNumber"
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

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    CEP
                  </label>
                  <Controller
                    control={control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormInputMask<NewClientForm>
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
                  <FormInput<NewClientForm>
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
                  <FormInput<NewClientForm>
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
                  <FormInput<NewClientForm>
                    id="state"
                    type="text"
                    name="state"
                    label="Estado"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    País
                  </label>
                  <SelectInput<NewClientForm>
                    id="country"
                    name="country"
                    options={options}
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button title="Salvar" style="primary" type="submit" />
        </div>
      </form>
    </>
  );
}

export default CreateClient;
