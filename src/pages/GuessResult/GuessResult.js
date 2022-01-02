import React from "react";
import { useDispatch, useSelector } from "react-redux";
import randomStreetView from "random-streetview";
import { useHistory } from "react-router";
import Map from "../../components/Map.js/Map";
import { Marker, Polyline } from "@react-google-maps/api";
import classes from "./GuessResult.module.css";

const lineOptions = {
  strokeColor: "#00ff00",
  strokeOpacity: 0.8,
  strokeWeight: 5,
  fillColor: "#0f0",
  fillOpacity: 0.35,
  clickable: false,
  draggable: true,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

const GuessResult = ({ onLoad }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const distance = useSelector((state) => state.map.distance);
  const userCoords = useSelector((state) => state.map.userCoords);
  const streetViewCoords = useSelector((state) => state.map.streetViewCoords);

  const isStreetViewMarkerVisible = useSelector(
    (state) => state.map.isStreetViewMarkerVisible
  );

  const clickHandler = async () => {
    const locations = await randomStreetView.getRandomLocations(1);
    dispatch({
      type: "SET_STREET_VIEW_COORDS",
      coords: { lat: locations[0][0], lng: locations[0][1] },
    });
    dispatch({ type: "TOGGLE_STREET_VIEW_MARKER_VISIBILITY" });
    history.push("newGame");
  };

  return (
    <div className={classes.container}>
      <p>mapa guess result</p>
      <p>distance: {distance.toFixed(2)} kilometers</p>

      <button className={classes.next} onClick={clickHandler}>
        nastepna mapa
      </button>
      {}
      <Map onClickHandler={console.log("nic")} onLoad={onLoad}>
        <Marker onLoad={onLoad} position={userCoords} />
        <Marker
          onLoad={onLoad}
          position={streetViewCoords}
          visible={isStreetViewMarkerVisible}
        />
        <Polyline path={[streetViewCoords, userCoords]} options={lineOptions} />
      </Map>
    </div>
  );
};

export default GuessResult;
