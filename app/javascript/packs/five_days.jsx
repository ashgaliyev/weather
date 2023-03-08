import ReactDOM from "react-dom";
import * as React from "react";
import PropTypes from "prop-types";
import { fiveDaysForecastShape, placeShape } from "./utils/types";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import TempProvider from "./components/TempProvider";
import TempSwitcher from "./components/TempSwitcher/TempSwitcher";

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
    <>
      <TempProvider>
        <div className="flex flex-col w-full">
          <TempSwitcher />
          <h1>{props.place.name}</h1>
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
                        tempMax={weather.tempMax}
                        tempMin={weather.tempMin}
                        windSpeed={weather.windSpeed}
                        weatherIcon={weather.icon}
                        weatherDescription={weather.description}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </TempProvider>
    </>
  );
};

FiveDays.propTypes = {
  weatherType: PropTypes.string.isRequired,
  forecast: fiveDaysForecastShape,
  place: placeShape,
};

document.addEventListener("DOMContentLoaded", () => {
  const props = JSON.parse(window.props);

  ReactDOM.render(
    <FiveDays {...props} />,
    document.getElementsByTagName("main")[0]
  );
});
