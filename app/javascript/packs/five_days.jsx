import ReactDOM from "react-dom";
import * as React from "react";
import PropTypes from "prop-types";
import { fiveDaysForecastShape, placeShape } from "./utils/types";
import { deletePlace } from "./api";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import TempProvider from "./components/TempProvider";
import TempSwitcher from "./components/TempSwitcher/TempSwitcher";
import Page from "./components/Page";
import Navigation from "./components/Navigation";

const FiveDays = (props) => {
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
      tempUnit={props.tempUnit}
      topBlockLeft={
        <Navigation
          links={[
            { name: "← Back", url: "/" },
            {
              name: "Edit",
              url: `/places/${props.place.id}/edit`,
            },
            {
              name: "Delete",
              onClick: () => {
                if (confirm("Are you sure?")) {
                  deletePlace(props.place).then(() => {
                    window.location.href = "/";
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

FiveDays.propTypes = {
  weatherType: PropTypes.string.isRequired,
  forecast: fiveDaysForecastShape,
  place: placeShape,
  tempUnit: PropTypes.string.isRequired,
};

document.addEventListener("DOMContentLoaded", () => {
  const props = JSON.parse(window.props);
  const settings = JSON.parse(window.settings);

  ReactDOM.render(
    <FiveDays {...props} {...settings} />,
    document.getElementsByTagName("main")[0]
  );
});
