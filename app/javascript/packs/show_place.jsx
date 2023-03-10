import * as React from "react";
import { fiveDaysForecastShape, placeShape } from "./utils/types";
import { deletePlace } from "./utils/api";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import { SettingsContext } from "./components/SettingsProvider";
import TempSwitcher from "./components/TempSwitcher/TempSwitcher";
import Page from "./components/Page";
import Navigation from "./components/Navigation";
import renderApp from "./utils/renderApp";

function PlaceContent({ forecast }) {
  if (!forecast.fiveDays) {
    return <div>No forecast available.</div>;
  }

  const days = forecast.fiveDays.reduce((acc, weather) => {
    const date = new Date(weather.date);
    date.setHours(0, 0, 0, 0);
    const day = date.toISOString();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(weather);
    return acc;
  }, {});

  const sortedDays = Object.keys(days).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return sortedDays.map(day => {
    const date = new Date(day);
    const formattedDate = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    return (
      <div key={day}>
        <h2>
          {formattedDate}
        </h2>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))"
          }}
        >
          {days[day].map(weather => {
            const time = new Date(weather.date);
            const formattedTime = time.toLocaleTimeString("en-GB", {
              hour: "numeric",
              minute: "numeric"
            });

            return (
              <PlaceCard key={time} heading={formattedTime} weather={weather} />
            );
          })}
        </div>
      </div>
    );
  });
}

PlaceContent.propTypes = {
  forecast: fiveDaysForecastShape.isRequired
};

function ShowPlace({ place, forecast }) {
  const { buildUrl } = React.useContext(SettingsContext);

  return (
    <Page
      heading={place.name}
      topBlockLeft={
        <Navigation
          links={[
            { name: "??? Back", url: buildUrl.rootUrl() },
            {
              name: "Edit",
              url: buildUrl.editPlaceUrl(place.id)
            },
            {
              name: "Delete",
              dataTestId: "delete-place",
              onClick: () => {
                // eslint-disable-next-line no-restricted-globals, no-alert
                if (confirm("Are you sure?")) {
                  deletePlace(place).then(() => {
                    window.location.href = buildUrl.rootUrl();
                  });
                }
              }
            }
          ]}
        />
      }
      topBlockRight={<TempSwitcher />}
      content={<PlaceContent forecast={forecast} />}
    />
  );
}

ShowPlace.propTypes = {
  forecast: fiveDaysForecastShape,
  place: placeShape.isRequired
};

ShowPlace.defaultProps = {
  forecast: {}
};

renderApp(ShowPlace);
