import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import mapstyles from "../../mapStyles";
import classes from "./GuessMap.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import randomStreetView from "random-streetview";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

// const containerStyle = {
// width: "18vw",
// height: "12vw",
// position: "absolute",
// right: "20px",
// bottom: "20px",
// zIndex: "10",
// };

const mapOptions = {
  styles: mapstyles,
  disableDefaultUI: false,
  disableDefaultUI: true,
  zoomControl: true,
};

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

const onLoad = (marker) => {
  // console.log("marker: ", marker);
};

const GuessMap = () => {
  const [markerCoords, setMarkerCoords] = useState({ lat: 0, lng: 0 });
  const [isMarkerPalced, setIsMarkerPalced] = useState(false);
  const [isDistanceCalculated, setIsDistanceCalculated] = useState(false);
  const [center, setCenter] = useState({
    lat: 50.0708,
    lng: 19.9036,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const userCoords = useSelector((state) => state.map.userCoords);
  const streetViewCoords = useSelector((state) => state.map.streetViewCoords);

  const isGameOver = useSelector((state) => state.game.isGameOver);
  // const round = useSelector((state) => state.game.round);
  const distance = useSelector((state) => state.map.distance);

  const isStreetViewMarkerVisible = useSelector(
    (state) => state.map.isStreetViewMarkerVisible
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPsYGzXGaPJlX7k_PAfilNo2gfNdW7GJI",
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const guesseHandler = () => {
    dispatch({ type: "CALCULATE_DISTANCE" });
    dispatch({ type: "TOGGLE_STREET_VIEW_MARKER_VISIBILITY_ON" });
    setIsDistanceCalculated(true);
    const midPoint = {
      lat: (userCoords.lat + streetViewCoords.lat) / 2,
      lng: (userCoords.lng + streetViewCoords.lng) / 2,
    };

    setCenter(midPoint);

    let dist = 1;
    if (distance < 5000) {
      dist = 2;
    } else if (distance < 2400) {
      dist = 4;
    } else if (distance < 1400) {
      dist = 6;
    } else if (distance < 700) {
      dist = 8;
    }
    mapRef.current.setZoom(dist);
  };

  const goToNextRound = async () => {
    const locations = await randomStreetView.getRandomLocations(1);
    dispatch({
      type: "SET_STREET_VIEW_COORDS",
      coords: { lat: locations[0][0], lng: locations[0][1] },
    });
    dispatch({ type: "TOGGLE_STREET_VIEW_MARKER_VISIBILITY_OFF" });
    setIsDistanceCalculated(false);
    setIsMarkerPalced(false);
    setMarkerCoords(null);
    dispatch({
      type: "NEXT_ROUND",
    });
    dispatch({
      type: "ADD_SCORE",
      distance: distance.toFixed(2),
    });
  };

  const onClickHandler = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      setMarkerCoords({ lat, lng });
      setIsMarkerPalced(true);
      dispatch({ type: "SET_USER_COORDS", spot: { lat, lng } });
    },
    [dispatch]
  );

  const endGame = () => {
    dispatch({ type: "TOGGLE_STREET_VIEW_MARKER_VISIBILITY_OFF" });
    dispatch({
      type: "ADD_SCORE",
      distance: distance.toFixed(2),
    });
    history.push("gameResult");
  };

  if (loadError) return "error loading map";
  if (!isLoaded) return "loading map";

  return (
    <div className={classes.guessMap}>
      {isDistanceCalculated && (
        <p className={classes.result}>
          Your guess was: <span>{distance.toFixed(2)} km</span> from current
          location
        </p>
      )}
      <button
        className={classes.calculateBtn}
        onClick={
          isDistanceCalculated
            ? isGameOver
              ? endGame
              : goToNextRound
            : guesseHandler
        }
        disabled={!isMarkerPalced}
      >
        {isDistanceCalculated
          ? isGameOver
            ? "End Game"
            : "Go To Next Round"
          : isMarkerPalced
          ? "Guess"
          : "Place your pin on the map"}
      </button>
      <GoogleMap
        // mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
        options={mapOptions}
        onClick={(e) => {
          onClickHandler(e);
        }}
        onLoad={onMapLoad}
      >
        <Marker
          onLoad={onLoad}
          position={markerCoords}
          icon={{
            url: "./map-pin-solid.svg",
            origin: new window.google.maps.Point(0, 0),
            scaledSize: new window.google.maps.Size(20, 50),
          }}
        />
        <Marker
          onLoad={onLoad}
          position={streetViewCoords}
          visible={isStreetViewMarkerVisible}
          icon={{
            url: "./map-pin-solid.svg",
            origin: new window.google.maps.Point(0, 0),
            scaledSize: new window.google.maps.Size(20, 50),
          }}
        />
        <Polyline
          path={[streetViewCoords, userCoords]}
          options={lineOptions}
          visible={isStreetViewMarkerVisible}
        />
      </GoogleMap>
    </div>
  );
};

export default React.memo(GuessMap);
