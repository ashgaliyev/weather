import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Map from "./Map";
import { createPlace, updatePlace } from "../api";
import { placeFormShape } from "../utils/types";

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  place: placeFormShape,
};

const LABEL = {
  name: "Name",
  lat: "Latitude",
  lng: "Longitude",
};

const PlaceForm = ({ onSubmit, place }) => {
  const [form, setForm] = useState({
    name: place === undefined ? "" : place.name,
    lat: place === undefined ? "" : place.lat,
    lng: place === undefined ? "" : place.lng,
  });

  const [invalidFields, setInvalidFields] = useState({
    name: null,
    lat: null,
    lng: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleGeoCode = ({ lat, lng, address }) => {
    setForm({
      lat,
      lng,
      name: address,
    });
  };

  const handleFormSubmit = () => {
    const { name, lat, lng } = form;
    if (place !== undefined) {
      updatePlace({
        id: place.id,
        name,
        lat,
        lng,
      }).then((response) => {
        if (response.status === 422) {
          setInvalidFields(response.data);
        } else {
          onSubmit(response.place);
        }
      });
    } else {
      createPlace({
        name,
        lat,
        lng,
      }).then((response) => {
        if (response.status === 422) {
          setInvalidFields(response.data);
        } else {
          onSubmit(response.place);
        }
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <form
        className="flex flex-row mb-5"
        onSubmit={(e) => {
          e.preventDefault();
          setInvalidFields({
            name: null,
            lat: null,
            lng: null,
          });
          handleFormSubmit();
        }}
      >
        {["name", "lat", "lng"].map((key) => {
          const value = form[key];
          return (
            <div className="flex flex-col mr-3">
              <label htmlFor={key}>{LABEL[key]}</label>
              <input
                type="text"
                name={key}
                id={key}
                value={value}
                onChange={handleInputChange}
              />
              {invalidFields[key] !== null && (
                <span className="text-red-500 text-sm">
                  {invalidFields[key].join(", ")}
                </span>
              )}
            </div>
          );
        })}

        <div className="flex flex-col justify-start mt-6">
          <button className="bg-blue-500 text-white p-2 rounded" type="submit">
            {place === undefined ? "Create" : "Update"}
          </button>
        </div>
      </form>
      <Map
        apiKey=""
        onGeocode={handleGeoCode}
        defaultCenter={
          place === undefined
            ? null
            : {
                lat: place.lat,
                lng: place.lng,
              }
        }
      />
    </div>
  );
};

PlaceForm.propTypes = propTypes;

export default PlaceForm;
