export class Map {
  public map: google.maps.Map;

  constructor(element: Element, options: google.maps.MapOptions) {
    this.map = new google.maps.Map(element, options);
  }
}
