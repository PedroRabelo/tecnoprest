export type Vehicle = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  licensePlate: string;
  renavan: string;
  chassi: string;
  modelYear: number;
  createdYear: number;
  ownerCpf: string;
  owner: string;
  categoryId: string;
  makeId: string;
  modelId: string;
};

export type VehiclePage = {
  id: string;
  active: boolean;
  licensePlate: string;
  make: Maker;
  model: Model;
};

type Maker = {
  name: string;
};

type Model = {
  name: string;
};
