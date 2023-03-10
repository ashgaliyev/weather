class Forecast < ApplicationRecord
  has_many :places
  acts_as_mappable default_units: :kms, default_formula: :sphere, distance_field_name: :distance, lat_column_name: :lat, lng_column_name: :lng
  after_commit :fetch_weather, on: :create

  def fetch_weather
    UpdateForecastWeatherJob.perform_later(id)
  end
end
