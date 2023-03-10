import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Map from "./Map";
import { createPlace, updatePlace } from "../utils/api";
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
  const placeIsSet = place !== undefined;

  const [form, setForm] = useState({
    name: placeIsSet ? place.name : "",
    lat: placeIsSet ? place.lat : "",
    lng: placeIsSet ? place.lng : "",
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
    if (placeIsSet) {
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
        {["name", "lat", "lng"].map((key, i) => {
          const value = form[key];
          return (
            <div key={i} className="flex flex-col mr-3">
              <label htmlFor={key}>{LABEL[key]}</label>
              <input
                type="text"
                name={key}
                id={key}
                value={value}
                onChange={handleInputChange}
              />
              {invalidFields[key] && (
                <span className="text-red-500 text-sm">
                  {invalidFields[key].join(", ")}
                </span>
              )}
            </div>
          );
        })}

        <div className="flex flex-col justify-start mt-6">
          <button
            className="bg-blue-500 text-white p-2 rounded"
            type="submit"
            data-test-id="submit-place"
          >
            {placeIsSet ? "Update" : "Create"}
          </button>
        </div>
      </form>
      <Map
        onGeocode={handleGeoCode}
        defaultCenter={
          placeIsSet
            ? {
                lat: place.lat,
                lng: place.lng,
              }
            : null
        }
      />
    </div>
  );
};

PlaceForm.propTypes = propTypes;

export default PlaceForm;
