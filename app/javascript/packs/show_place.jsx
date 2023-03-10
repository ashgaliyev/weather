import * as React from "react";
import PropTypes from "prop-types";
import { fiveDaysForecastShape, placeShape } from "./utils/types";
import { deletePlace } from "./utils/api";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import { SettingsContext } from "./components/SettingsProvider";
import TempSwitcher from "./components/TempSwitcher/TempSwitcher";
import Page from "./components/Page";
import Navigation from "./components/Navigation";
import renderApp from "./utils/renderApp";

const ShowPlace = (props) => {
  const { buildUrl } = React.useContext(SettingsContext);

  const days = props.forecast.fiveDays.reduce((acc, weather) => {
    const date = new Date(weather.date);
    date.setHours(0, 0, 0, 0);
    const day = date.toISOString();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(weather);
    return acc;
  }, {});

  const sortedDays = Object.keys(days).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return (
    <Page
      heading={props.place.name}
      topBlockLeft={
        <Navigation
          links={[
            { name: "← Back", url: buildUrl.rootUrl() },
            {
              name: "Edit",
              url: buildUrl.editPlaceUrl(props.place.id),
            },
            {
              name: "Delete",
              dataTestId: "delete-place",
              onClick: () => {
                if (confirm("Are you sure?")) {
                  deletePlace(props.place).then(() => {
                    window.location.href = buildUrl.rootUrl();
                  });
                }
              },
            },
          ]}
        />
      }
      topBlockRight={<TempSwitcher />}
      content={
        <>
          {sortedDays.map((day) => {
            const date = new Date(day);
            const formattedDate = date.toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            });

            return (
              <div key={day}>
                <h2>{formattedDate}</h2>
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(360px, 1fr))",
                  }}
                >
                  {days[day].map((weather, i) => {
                    const time = new Date(weather.date);
                    const formattedTime = time.toLocaleTimeString("en-GB", {
                      hour: "numeric",
                      minute: "numeric",
                    });

                    return (
                      <PlaceCard
                        key={i}
                        heading={formattedTime}
                        weather={weather}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      }
    />
  );
};

ShowPlace.propTypes = {
  forecast: fiveDaysForecastShape,
  place: placeShape,
};

renderApp(ShowPlace);
