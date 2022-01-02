import React from "react";
import { GoogleMap } from "@react-google-maps/api";
import mapstyles from "../../mapStyles";
// import classes from "./GuessMap.module.css";

const center = {
  lat: 50.0708,
  lng: 19.9036,
};

const options = {
  styles: mapstyles,
  disableDefaultUI: true,
};

// const onLoad = (marker) => {
//   // console.log("marker: ", marker);
// };

const Map = ({ children, onClickHandler, onLoad }) => {
  return (
    <GoogleMap
      // mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      options={options}
      onClick={(e) => {
        onClickHandler(e);
      }}
      onLoad={onLoad}
    >
      {children}
    </GoogleMap>
  );
};

export default Map;
