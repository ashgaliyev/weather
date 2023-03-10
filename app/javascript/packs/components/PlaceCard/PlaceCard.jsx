import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { SettingsContext } from "../SettingsProvider";
import placeholder from "./icon_placeholder.png";
import { weatherShape } from "../../utils/types";

const PlaceCard = ({ heading, weather, onClick }) => {
  if (!weather)
    return (
      <div className="bg-white rounded-lg shadow-lg flex flex-row p-4 pl-0 max-w-sm">
        <div className="flex-none w-24">
          <img src={placeholder} alt="No data" />
        </div>
        <div className="flex-1 w-32">
          <div className="text-2xl">{heading.slice(0, 20)}</div>
          <div className="text-xs text-right text-slate-400">Updating...</div>
        </div>
      </div>
    );

  const { tempMin, tempMax, windSpeed, icon, description, date } = weather;

  const { tempType } = useContext(SettingsContext);

  const tempMinC = Math.round(tempMin - 273.15);
  const tempMaxC = Math.round(tempMax - 273.15);

  const tempMinF = Math.round((tempMin - 273.15) * (9 / 5) + 32);
  const tempMaxF = Math.round((tempMax - 273.15) * (9 / 5) + 32);

  const tempRange =
    tempType === "Celsius"
      ? `${tempMinC}°C..${tempMaxC}°C`
      : `${tempMinF}°F..${tempMaxF}°F`;

  return (
    <div
      className="bg-white rounded-lg shadow-lg flex flex-row p-4 pl-0 max-w-sm hover:cursor-pointer"
      onClick={onClick}
      data-test-id="place-card"
    >
      <div className="flex-none w-24">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
      </div>
      <div className="flex-1 w-32">
        <div className="text-2xl">{heading.slice(0, 20)}</div>
        <span>{tempRange}</span>
        <div>{windSpeed} m/s</div>
        {date ? (
          <div className="text-xs text-right text-slate-400">{date}</div>
        ) : null}
      </div>
    </div>
  );
};

PlaceCard.propTypes = {
  heading: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  weather: weatherShape,
};

export default PlaceCard;
