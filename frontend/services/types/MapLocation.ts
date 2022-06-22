export type MapLocation = {
  id: string;
  title: string;
  type: "MATRIZ" | "FILIAL";
  lat: string[];
  long: string[];
  description: string;
  active: boolean;
};
