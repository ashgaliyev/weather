class Place < ApplicationRecord
  has_and_belongs_to_many :users, join_table: :users_places
  belongs_to :forecast, optional: true

  validates :name, presence: true
  validates :lat, presence: true
  validates :lng, presence: true

  validates :lat, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }
  validates :lng, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }

  before_create :set_forecast

  def set_forecast
    forecast = Forecast.within(10, origin: [lat, lng]).first
    if forecast.present?
      self.forecast = forecast
    else
      self.forecast = Forecast.create(lat: lat, lng: lng)
    end
  end
end
