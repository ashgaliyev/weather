import ReactDOM from "react-dom";
import * as React from "react";
import PropTypes from "prop-types";
import { currentForecastShape, placeShape } from "./utils/types";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import TempProvider from "./components/TempProvider";
import TempSwitcher from "./components/TempSwitcher/TempSwitcher";
import AddPlace from "./components/AddPlace";

const Weather = (props) => {
  const places = props.places.map((place) => {
    const forecast = props.forecasts.find(
      (forecast) => forecast.id === place.forecastId
    );
    return { ...place, weather: forecast.weather };
  });

  return (
    <>
      <TempProvider>
        <div className="flex flex-col w-full">
          {places.length === 0 ? (
            <>
              <div class="flex flex-col items-center justify-center my-10">
                <span class="text-2xl mb-5">
                  You have no places added. Add a place to get started.
                </span>
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(360px, 1fr))",
                  }}
                >
                  <AddPlace />
                </div>
              </div>
            </>
          ) : (
            <>
              <TempSwitcher />
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
                    tempMax={weather.tempMax}
                    tempMin={weather.tempMin}
                    windSpeed={weather.windSpeed}
                    weatherIcon={weather.icon}
                    weatherDescription={weather.description}
                    dateUpdated={weather.date}
                    onClick={() => {
                      window.location.href = `/forecasts/five_days/${id}`;
                    }}
                  />
                ))}
                <AddPlace />
              </div>
            </>
          )}
        </div>
      </TempProvider>
    </>
  );
};

Weather.propTypes = {
  weatherType: PropTypes.string.isRequired,
  forecasts: PropTypes.arrayOf(currentForecastShape),
  places: PropTypes.arrayOf(placeShape),
};

document.addEventListener("DOMContentLoaded", () => {
  const props = JSON.parse(window.props);

  ReactDOM.render(
    <Weather {...props} />,
    document.getElementsByTagName("main")[0]
  );
});
