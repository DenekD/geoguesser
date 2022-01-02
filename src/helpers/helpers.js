import randomStreetView from "random-streetview";

export const haversine_distance = (mk1, mk2) => {
  // const R = 6371.071; // Radius of the Earth in kilometers
  const R = 3958.75;
  const rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  const d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
};

export const getRandomLocation = async () => {
  const locations = await randomStreetView.getRandomLocations(1);
  return { lat: locations[0][0], lng: locations[0][1] };
};
