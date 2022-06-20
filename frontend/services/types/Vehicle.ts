export type Vehicle = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  licensePlate: string;
  renavan: string;
  chassi: string;
  modelYear: string;
  createdYear: string;
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
