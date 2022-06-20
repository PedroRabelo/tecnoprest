import {
  PencilAltIcon,
  StatusOnlineIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Pagination } from "../../../components";
import Alert from "../../../components/alert/alert";
import { DataTableHeader } from "../../../components/data-table";
import { useGet } from "../../../hooks/useGet";
import { VehiclePage } from "../../../services/types/Vehicle";

export function Vehicles() {
  const router = useRouter();
  const { data } = useGet("/vehicles");

  useEffect(() => {
    if (data && router) {
      if (data.nodes.length === 0) {
        router.push(`/app/vehicles`);
      }
    }
  }, [data, router]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <DataTableHeader title="Veículos" link="/app/vehicles/create" />

      {data && data?.nodes?.length === 0 && (
        <Alert>Nenhum Veículo cadastrado</Alert>
      )}
      {data && data?.nodes.length > 0 && (
        <div className="mt-8 flex flex-col">
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
                        Placa
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Marca
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Modelo
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Situação
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Editar</span>
                        <span className="sr-only">Excluir</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data &&
                      data?.nodes?.map(
                        (vehicle: VehiclePage, index: number) => (
                          <tr
                            key={vehicle.id}
                            className={
                              index % 2 === 0 ? undefined : "bg-gray-50"
                            }
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {vehicle.licensePlate}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {vehicle?.make?.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {vehicle?.model?.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {vehicle.active ? (
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
                                  <a className="text-indigo-600 hover:text-indigo-900 mr-3">
                                    <PencilAltIcon
                                      className="-ml-1 mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Link>
                                <Link href="/app/vehicles/trackers">
                                  <a
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    placeholder="Vincular Rastreador"
                                  >
                                    <StatusOnlineIcon
                                      className="-ml-1 mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </Link>
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
                        )
                      )}
                  </tbody>
                </table>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicles;