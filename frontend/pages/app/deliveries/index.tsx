import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatRelative } from "date-fns";
import { ptBR } from 'date-fns/locale'
import Alert from "../../../components/alert/alert";
import { DataTableHeader } from "../../../components/data-table";
import { DataTableActions } from "../../../components/data-table/data-table-actions";
import { useGet } from "../../../hooks/useGet";
import { Delivery } from "../../../services/types/Delivery";

export function Deliveries() {
  const { data } = useGet("/deliveries");

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <DataTableHeader
        title="Entregas"
        link="/app/deliveries/create"
      />

      {data && data?.length === 0 && <Alert>Nenhum Local cadastrado</Alert>}
      {data && data?.length > 0 && (
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
                        Data Entrega
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Nome da Rota
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Origem
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
                      data?.map((delivery: Delivery, index: number) => (
                        <tr
                          key={delivery?.id}
                          className={index % 2 === 0 ? undefined : "bg-gray-50"}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {formatRelative(
                              new Date(delivery.startDate),
                              new Date(),
                              { locale: ptBR }
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {delivery?.routeName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {delivery?.origin}
                          </td>
                          <td className="relative whitespace-nowrap py-3 pl-2 pr-2 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end gap-4">
                              <DataTableActions
                                href={`/app/map-locations/${delivery.id}/edit`}
                                Icon={PencilIcon}
                                color="primary"
                                title="Editar"
                              />

                              <DataTableActions
                                href="#"
                                Icon={TrashIcon}
                                color="danger"
                                title="Remover"
                              />
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
      )}
    </div>
  )
}

export default Deliveries;