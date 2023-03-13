import * as React from "react";
import PropTypes from "prop-types";
import { currentForecastShape, placeShape } from "./utils/types";
import Page from "./components/Page";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import { SettingsContext } from "./components/SettingsProvider";
import TempSwitcher from "./components/TempSwitcher/TempSwitcher";
import AddPlace from "./components/AddPlace";
import EmptyPlaces from "./components/EmptyPlaces";
import renderApp from "./utils/renderApp";

function Places({ places, forecasts }) {
  const { buildUrl } = React.useContext(SettingsContext);

  const placesForecasts = places.map((place) => {
    const forecast = forecasts.find((f) => f.id === place.forecastId);
    return { ...place, weather: forecast.weather };
  });

  return (
    <Page
      heading="My Places"
      topBlockRight={<TempSwitcher />}
      content={
        placesForecasts.length === 0 ? (
          <EmptyPlaces />
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            }}
          >
            {placesForecasts.map(({ id, name, weather }) => (
              <PlaceCard
                key={id}
                heading={name}
                weather={weather}
                onClick={() => {
                  window.location.href = buildUrl.placeUrl(id);
                }}
              />
            ))}
            <AddPlace
              onClick={() => {
                window.location.href = buildUrl.newPlaceUrl();
              }}
            />
          </div>
        )
      }
    />
  );
}

Places.propTypes = {
  forecasts: PropTypes.arrayOf(currentForecastShape).isRequired,
  places: PropTypes.arrayOf(placeShape).isRequired,
};

renderApp(Places);
