import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByLatLng,
} from "react-google-places-autocomplete";
import { SettingsContext } from "./SettingsProvider";

const Marker = ({ lat, lng }) => (
  <div className="marker bg-red-500 w-[20px] h-[20px] rounded-full border-slate-900 border-2"></div>
);

const propTypes = {
  onGeocode: PropTypes.func.isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

const Map = ({ onGeocode, defaultCenter }) => {
  const { mapApiKey } = React.useContext(SettingsContext);
  if (mapApiKey === null) {
    return <span>No API key provided</span>;
  }

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(11);
  const [marker, setMarker] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [value, setValue] = useState(null);

  const handleGeocodeByPlaceId = (placeId) => {
    geocodeByPlaceId(placeId)
      .then((results) => {
        if (results.length > 0) {
          const location = results[0].geometry.location;
          const lng = location.lng();
          const lat = location.lat();
          setCenter({ lat, lng });
          setMarker({ lat, lng });
          onGeocode({
            lat,
            lng,
            address: results[0].formatted_address,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const handleGeocodeByLatLng = ({ lat, lng }) => {
    geocodeByLatLng({ lat, lng })
      .then((results) => {
        setMarker({ lat, lng });
        if (results.length > 0) {
          const location = results[0].geometry.location;
          const lng = location.lng();
          const lat = location.lat();
          onGeocode({
            lat,
            lng,
            address: results[0].formatted_address,
          });
          setValue(results[0].formatted_address);
        } else {
          onGeocode({
            lat,
            lng,
            address: value,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const handleApiLoaded = (map, maps) => {
    setApiLoaded(true);

    map.addListener("click", (e) => {
      handleGeocodeByLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
  };

  useEffect(() => {
    if (defaultCenter) {
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setZoom(14);
        },
        () => {
          // handle error
          setCenter({ lat: 37.7749, lng: -122.4194 }); // San Francisco - default center
          setZoom(11);
        }
      );
    } else {
      // handle error
      setCenter({ lat: 37.7749, lng: -122.4194 }); // San Francisco - default center
      setZoom(11);
    }
  }, []);

  return (
    <div style={{ height: "60vh", width: "100%", paddingBottom: "50px" }}>
      {apiLoaded && (
        <GooglePlacesAutocomplete
          selectProps={{
            value,
            placeholder:
              value === "" || value === null ? "Search Places..." : value,
            onChange: (e) => {
              setValue(e);
              handleGeocodeByPlaceId(e.value.place_id);
            },
          }}
        />
      )}
      {center && (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: mapApiKey,
            libraries: ["places"],
          }}
          defaultCenter={{ lat: center.lat, lng: center.lng }}
          center={{ lat: center.lat, lng: center.lng }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {marker && <Marker lat={marker.lat} lng={marker.lng} />}
        </GoogleMapReact>
      )}
    </div>
  );
};

Map.propTypes = propTypes;

export default Map;
