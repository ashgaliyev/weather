import PropTypes from "prop-types";
import React from "react";
import { SettingsContext } from "../SettingsProvider";
import placeholder from "./icon_placeholder.png";
import { weatherShape } from "../../utils/types";

function PlaceLink({ children, onClick }) {
  if (onClick) {
    return (
      <div
        className="bg-white rounded-lg shadow-lg flex flex-row p-4 pl-0 max-w-sm hover:cursor-pointer"
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
        data-test-id="place-card"
      >
        {children}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-row p-4 pl-0 max-w-sm">
      {children}
    </div>
  );
}

PlaceLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

PlaceLink.defaultProps = {
  onClick: null,
};

function PlaceCard({ heading, weather, onClick }) {
  if (!weather) {
    return (
      <PlaceLink onClick={onClick}>
        <div className="flex-none w-24">
          <img src={placeholder} alt="No data" />
        </div>
        <div className="flex-1 w-32">
          <div className="text-2xl">{heading.slice(0, 20)}</div>
          <div className="text-xs text-right text-slate-400">Updating...</div>
        </div>
      </PlaceLink>
    );
  }

  const { tempMin, tempMax, windSpeed, icon, description } = weather;

  const { tempType } = React.useContext(SettingsContext);

  const tempMinC = Math.round(tempMin - 273.15);
  const tempMaxC = Math.round(tempMax - 273.15);

  const tempMinF = Math.round((tempMin - 273.15) * (9 / 5) + 32);
  const tempMaxF = Math.round((tempMax - 273.15) * (9 / 5) + 32);

  const tempRange =
    tempType === "Celsius"
      ? `${tempMinC}°C..${tempMaxC}°C`
      : `${tempMinF}°F..${tempMaxF}°F`;

  return (
    <PlaceLink onClick={onClick}>
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
      </div>
    </PlaceLink>
  );
}

PlaceCard.propTypes = {
  heading: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  weather: weatherShape,
};

PlaceCard.defaultProps = {
  weather: null,
  onClick: null,
};

export default PlaceCard;
