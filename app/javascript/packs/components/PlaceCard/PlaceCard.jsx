import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { TempContext } from "../TempProvider";
import placeholder from "./icon_placeholder.png";

const PlaceCard = ({
  heading,
  tempMin,
  tempMax,
  windSpeed,
  weatherIcon,
  weatherDescription,
  dateUpdated,
  onClick,
}) => {
  const { tempType } = useContext(TempContext);

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
      class="bg-white rounded-lg shadow-lg flex flex-row p-4 pl-0 max-w-sm"
      onClick={onClick}
    >
      <div>
        {weatherIcon ? (
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={weatherDescription}
          />
        ) : (
          <img src={placeholder} alt="No data" />
        )}
      </div>
      <div>
        <div class="text-2xl">{heading}</div>
        {tempMax && tempMin && windSpeed ? (
          <>
            <d>{tempRange}</d>
            <div>{windSpeed} m/s</div>
            {dateUpdated ? (
              <div class="text-xs text-right text-slate-400">{dateUpdated}</div>
            ) : null}
          </>
        ) : (
          <div class="text-xs text-right text-slate-400">Updating...</div>
        )}
      </div>
    </div>
  );
};

PlaceCard.propTypes = {
  heading: PropTypes.string.isRequired,
  tempMax: PropTypes.number,
  tempMin: PropTypes.number,
  windSpeed: PropTypes.number,
  weatherIcon: PropTypes.string,
  weatherDescription: PropTypes.string,
  dateUpdated: PropTypes.string,
  onClick: PropTypes.func,
};

export default PlaceCard;
