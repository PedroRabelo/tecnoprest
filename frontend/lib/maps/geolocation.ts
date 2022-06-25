export function getCurrentPosition(
  options?: PositionOptions
): Promise<google.maps.LatLngLiteral> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (error) => reject(error),
      options
    );
  });
}
