class Place < ApplicationRecord
  has_and_belongs_to_many :users, join_table: :users_places
  belongs_to :forecast, optional: true

  validates :name, presence: true
  validates :lat, presence: true
  validates :lng, presence: true

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
