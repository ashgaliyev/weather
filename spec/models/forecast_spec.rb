require 'rails_helper'

RSpec.describe Forecast, type: :model do
  describe "associations" do
    it "belongs to a place" do
      forecast = create(:forecast)
      forecast.places << build(:place)
      forecast.save
      expect(forecast.places).to be_present
    end
  end
end
