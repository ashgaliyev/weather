import { createRoot } from "react-dom/client";
import * as React from "react";
import PropTypes from "prop-types";
import { currentForecastShape, placeShape } from "./utils/types";
import Page from "./components/Page";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import TempProvider from "./components/TempProvider";
import TempSwitcher from "./components/TempSwitcher/TempSwitcher";
import AddPlace from "./components/AddPlace";
import EmptyPlaces from "./components/EmptyPlaces";

const Weather = (props) => {
  const places = props.places.map((place) => {
    const forecast = props.forecasts.find(
      (forecast) => forecast.id === place.forecastId
    );
    return { ...place, weather: forecast.weather };
  });

  return (
    <Page
      heading={"My Places"}
      topBlockLeft={null}
      topBlockRight={<TempSwitcher />}
      tempUnit={props.tempUnit}
      content={
        <>
          {places.length === 0 ? (
            <EmptyPlaces />
          ) : (
            <>
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                }}
              >
                {places.map(({ id, name, weather }) => (
                  <PlaceCard
                    key={id}
                    heading={name}
                    weather={weather}
                    onClick={() => {
                      window.location.href = `/forecasts/five_days/${id}`;
                    }}
                  />
                ))}
                <AddPlace
                  onClick={() => {
                    window.location.href = `/places/new`;
                  }}
                />
              </div>
            </>
          )}
        </>
      }
    />
  );
};

Weather.propTypes = {
  weatherType: PropTypes.string.isRequired,
  forecasts: PropTypes.arrayOf(currentForecastShape),
  places: PropTypes.arrayOf(placeShape),
  tempUnit: PropTypes.string.isRequired,
};

document.addEventListener("DOMContentLoaded", () => {
  const props = JSON.parse(window.props);
  const settings = JSON.parse(window.settings);

  const container = document.getElementsByTagName("main")[0];
  const root = createRoot(container);
  root.render(<Weather {...props} {...settings} />);
});
