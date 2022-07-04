import { PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, FormInput, SelectInput } from "../../../../components";
import { GoBackButton } from "../../../../components/button/go-back-button";
import { useGet } from "../../../../hooks/useGet";
import { api } from "../../../../lib/axios/apiClient";
import { trackerTechnologies } from "../../../../services/types";
import { Tracker } from "../../../../services/types/Tracker";

type NewTrackerForm = {
  trackNumber: string;
  technology: string;
};

const requiredText = "Campo obrigatório";

const trackerSchema = yup.object({
  trackNumber: yup.string().required(requiredText),
  technology: yup.string().required(requiredText),
});

export default function Trackers() {
  const router = useRouter();

  const { data: trackers, mutate } = useGet(
    `/vehicles/${router.query.vehicleId}/trackers`
  );
  const { data: vehicle } = useGet(`/vehicles/get/${router.query.vehicleId}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewTrackerForm>({
    resolver: yupResolver(trackerSchema),
  });

  const onSubmit: SubmitHandler<NewTrackerForm> = async (data) => {
    await api
      .post(`/trackers/vehicle/${router.query.vehicleId}`, data)
      .then(() => {
        alert("Salvo com sucesso");
        reset();
        mutate();
      })
      .catch((e) => {
        console.log(e.response.data.message);
        alert(e.message);
      });
  };

  return (
    <>
      <GoBackButton />
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt2">
            Dados do veículo
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Placa</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {vehicle?.licensePlate}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Marca/Modelo
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {vehicle?.make?.name} - {vehicle?.model?.name}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Chassi</dt>
              <dd className="mt-1 text-sm text-gray-900">{vehicle?.chassi}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Categoria</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {vehicle?.category?.name}
              </dd>
            </div>
          </dl>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Rastreadores
          </h3>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="mt-5">
              <div className="md:grid md:grid-cols-4 md:gap-6">
                <div className="col-span-6 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nº Rastreador
                  </label>
                  <FormInput<NewTrackerForm>
                    id="trackNumber"
                    type="text"
                    name="trackNumber"
                    label="trackNumber"
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tecnologia
                  </label>
                  <SelectInput<NewTrackerForm>
                    id="technology"
                    name="technology"
                    value="name"
                    options={trackerTechnologies}
                    className="mb-2"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6 sm:col-span-1">
                  <div className="flex justify-start mt-6">
                    <Button
                      title="Adicionar"
                      color="primary"
                      type="submit"
                      icon={PlusIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-6 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Nº Rastreador
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tecnologia
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Data última posição
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Ultima referência
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Excluir</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {trackers &&
                        trackers.length > 0 &&
                        trackers?.map((tracker: Tracker, index: number) => (
                          <tr
                            key={tracker.id}
                            className={
                              index % 2 === 0 ? undefined : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {tracker.trackNumber}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {tracker.technology}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {tracker.active ? (
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                  Ativo
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                  Inativo
                                </span>
                              )}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="flex justify-end">
                                <Link href="#">
                                  <a className="text-red-600 hover:text-red-900">
                                    <TrashIcon
                                      className="-ml-1 mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
