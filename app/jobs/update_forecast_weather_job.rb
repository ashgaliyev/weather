# frozen_string_literal: true

class UpdateForecastWeatherJob < ApplicationJob
  queue_as :default

  def perform(forecast_id)
    forecast = Forecast.find(forecast_id)
    current = WeatherService.current(forecast.lat, forecast.lng)
    five_days = WeatherService.forecast(forecast.lat, forecast.lng)
    forecast.update!(current:, five_days:)
  end
end
