# frozen_string_literal: true

class Place < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :forecast, optional: true

  validates :name, presence: true
  validates :lat, presence: true
  validates :lng, presence: true

  validates :lat, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }
  validates :lng, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }

  before_create :create_forecast
  after_update :update_forecast
  after_destroy :destroy_forecast

  def update_forecast
    set_forecast
  end

  def create_forecast
    return if forecast

    set_forecast
  end

  def set_forecast
    self.forecast = (nearest_forecast || Forecast.create!(lat:, lng:))
  end

  def nearest_forecast
    Forecast.within(10, origin: [lat, lng]).first
  end

  def destroy_forecast
    forecast.destroy! if forecast.places.empty?
  end
end
