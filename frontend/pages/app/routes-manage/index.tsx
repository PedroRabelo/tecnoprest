import { DataTableHeader } from "../../../components/data-table";

export function RoutesManage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <DataTableHeader
        title="Controle de Rotas"
        link="/app/routes-manage/create"
      />
    </div>
  );
}

export default RoutesManage;
