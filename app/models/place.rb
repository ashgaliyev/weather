class Place < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :forecast, optional: true

  validates :name, presence: true
  validates :lat, presence: true
  validates :lng, presence: true

  validates :lat, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }
  validates :lng, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }

  before_create :set_forecast
  after_update :set_forecast
  after_destroy :destroy_forecast

  def set_forecast
    forecast = Forecast.within(10, origin: [lat, lng]).first
    if forecast.present?
      self.forecast = forecast
    else
      self.forecast = Forecast.create(lat: lat, lng: lng)
    end
  end

  def destroy_forecast
    forecast.destroy if forecast.places.empty?
  end
end
