import { haversine_distance } from "../../helpers/helpers";
// import randomStreetView from "random-streetview";
// import { getRandomLocation } from "../../helpers/helpers";

// const locations = getRandomLocation();

const initState = {
  streetViewCoords: {
    lat: 50.07056,
    lng: 18.90411,
  },
  distance: 0,
  userCoords: {
    lat: 50.07056,
    lng: 18.90411,
  },
  isStreetViewMarkerVisible: false,
};

const mapReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_STREET_VIEW_COORDS":
      return {
        ...state,
        streetViewCoords: action.coords,
      };
    case "CALCULATE_DISTANCE":
      const distance = haversine_distance(
        state.streetViewCoords,
        state.userCoords
      );
      return {
        ...state,
        distance: distance,
      };
    case "SET_USER_COORDS":
      return {
        ...state,
        userCoords: action.spot,
      };
    case "TOGGLE_STREET_VIEW_MARKER_VISIBILITY_ON":
      return {
        ...state,
        isStreetViewMarkerVisible: true,
      };
    case "TOGGLE_STREET_VIEW_MARKER_VISIBILITY_OFF":
      return {
        ...state,
        isStreetViewMarkerVisible: false,
      };

    default:
      return state;
  }
};
export default mapReducer;
