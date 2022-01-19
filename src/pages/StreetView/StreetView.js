import React from "react";
import { useSelector } from "react-redux";
import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";
import { useLoadScript } from "@react-google-maps/api";

import PlayerDashbord from "../../components/PlayerDashbord/PlayerDashbord";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

import classes from "./StreetView.module.css";

const libraries = ["places"];

const mapContainerStyle = {
  height: "calc(100vh - 100px) ",
  width: "100vw",
};

const Street = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPsYGzXGaPJlX7k_PAfilNo2gfNdW7GJI",
    libraries,
  });
  const streetViewCoords = useSelector((state) => state.map.streetViewCoords);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "error loading map";
  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className={classes.container}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={streetViewCoords}
        zoom={10}
        heading={false}
        onLoad={onMapLoad}
      >
        <StreetViewPanorama
          position={streetViewCoords}
          visible={true}
          options={{
            enableCloseButton: false,
            fullscreenControl: false,
            imageDateControl: false,
            addressControl: false,
            disableDefaultUI: false,
            showRoadLabels: false,
          }}
        />
      </GoogleMap>

      <PlayerDashbord />
    </div>
  );
};

export default React.memo(Street);
