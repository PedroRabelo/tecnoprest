import useSWR from "swr";
import { api } from "../lib/axios/apiClient";
import { PageInfo } from "../services/types/PagedEntityResponse";

export type Tenant = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
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

type TenantEdge = {
  cursor: string;
  node: Tenant;
};

type TenantPagedResponse = {
  pageInfo: PageInfo;
  totalCount: number;
  edges: TenantEdge[];
};

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function useTenant() {
  const { data, error } = useSWR("tenants/page", fetcher);
  // const response: TenantPagedResponse = await api.get("tenants/page");

  return {
    tenants: data.nodes,
    pageInfo: data.pageInfo,
    totalCount: data.totalCount,
    isLoading: !error && !data,
    isError: error,
  };
}
