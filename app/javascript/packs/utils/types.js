import PropTypes from "prop-types";

export const weatherShape = PropTypes.shape({
  tempMin: PropTypes.number.isRequired,
  tempMax: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  windSpeed: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
});

export const fiveDaysForecastShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  fiveDays: PropTypes.arrayOf(weatherShape),
});

export const currentForecastShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  weather: weatherShape,
});

export const placeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  forecastId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});
