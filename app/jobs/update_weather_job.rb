class UpdateWeatherJob < ApplicationJob
  queue_as :default

  def perform
    Place.where.not(user_id: nil).includes(:forecast).pluck(:forecast_id).uniq.each do |forecast_id|
      UpdateForecastWeatherJob.perform_later(forecast_id)
    end
  end
end
