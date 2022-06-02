import { PageInfo } from "./PagedEntityResponse";

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
