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

const Places = (props) => {
  const { buildUrl } = React.useContext(SettingsContext);

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
            </>
          )}
        </>
      }
    />
  );
};

Places.propTypes = {
  forecasts: PropTypes.arrayOf(currentForecastShape),
  places: PropTypes.arrayOf(placeShape),
};

renderApp(Places);
