import Cleave from "cleave.js/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Pagination } from "../../../components";
import Alert from "../../../components/alert/alert";
import { DataTableHeader } from "../../../components/data-table";
import useGet from "../../../hooks/useGet";
import { Tenant } from "../../../services/types/Tenant";

export function Clients() {
  const router = useRouter();
  const { data } = useGet("/tenants/page");

  useEffect(() => {
    if (data && router) {
      if (data.nodes.length === 0) {
        router.push(`/admin/clients`);
      }
    }
  }, [data, router]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <DataTableHeader title="Clientes" link="/admin/clients/create" />

      {data && data?.nodes?.length === 0 && (
        <Alert>Nenhum Cliente cadastrado</Alert>
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
                        Nome
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        CNPJ
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
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
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data &&
                      data?.nodes?.map((tenant: Tenant, index: number) => (
                        <tr
                          key={tenant.email}
                          className={index % 2 === 0 ? undefined : "bg-gray-50"}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {tenant.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Cleave
                              value={tenant.cnpj}
                              disabled
                              className="border-none bg-transparent p-0"
                              options={{
                                delimiters: [".", ".", "/", "-"],
                                blocks: [2, 3, 3, 4, 2],
                                numericOnly: true,
                              }}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {tenant.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              Ativo
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Editar
                              <span className="sr-only">{tenant.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
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

export default Clients;
