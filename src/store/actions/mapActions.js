import randomStreetView from "random-streetview";

export const setRandomLocation = () => {
  return async (dispatch) => {
    const setRandomLocation = async () => {
      console.log("map action");
      const locations = await randomStreetView.getRandomLocations(1);
      dispatch({
        type: "SET_STREET_VIEW_COORDS",
        coords: { lat: locations[0][0], lng: locations[0][1] },
      });
    };

    try {
      await setRandomLocation();
    } catch (err) {}
  };
};
