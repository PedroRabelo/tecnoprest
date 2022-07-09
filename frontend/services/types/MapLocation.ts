export type MapLocation = {
  id: string;
  title: string;
  type: LocationType;
  lat: string[];
  long: string[];
  description: string;
  active: boolean;
  isRoute: boolean;
  isPolygon: boolean;
};

enum LocationType {
  MATRIZ,
  FILIAL,
  POSTO,
  OFICINA,
  PEDAGIO,
}
