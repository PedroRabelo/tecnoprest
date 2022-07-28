export class VehiclePageEntity {
  id: string;
  active: boolean;
  licensePlate: string;
  make: Maker;
  model: Model;

  constructor(partial: Partial<VehiclePageEntity>) {
    Object.assign(this, partial);
  }
}

type Maker = {
  name: string;
};

type Model = {
  name: string;
};
