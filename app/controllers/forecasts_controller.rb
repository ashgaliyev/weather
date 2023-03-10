class ForecastsController < ApplicationController
  def current
    @places = current_user.places.includes(:forecast).order(:id)
    @forecasts = @places.map(&:forecast)
  end

  def five_days
    @place = current_user.places.find(params[:place_id])
    @forecast = @place.forecast
  end
end
