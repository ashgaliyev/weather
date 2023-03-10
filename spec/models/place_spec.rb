# frozen_string_literal: true

require "rails_helper"

RSpec.describe(Place, type: :model) do
  describe "validations" do
    it "is invalid without a name" do
      place = build(:place, name: nil)
      expect(place).to(be_invalid)
    end

    it "is invalid without a lat" do
      place = build(:place, lat: nil)
      expect(place).to(be_invalid)
    end

    it "is invalid without a lng" do
      place = build(:place, lng: nil)
      expect(place).to(be_invalid)
    end
  end

  describe "before_create" do
    let!(:forecast) { create(:forecast, lat: amsterdam_center[:lat], lng: amsterdam_center[:lng]) }

    context "when a forecast exists within 10 kms" do
      it "sets the forecast" do
        place = build(:place, lat: amsterdam_groenelaan[:lat], lng: amsterdam_groenelaan[:lng])
        place.save!
        expect(place.forecast).to(eq(forecast))
      end
    end

    context "when no forecast exists within 10 kms" do
      it "creates a new forecast" do
        place = build(:place, lat: amsterdam_hofland[:lat], lng: amsterdam_hofland[:lng])
        place.save!
        expect(place.forecast.lat).to(eq(amsterdam_hofland[:lat]))
      end
    end
  end

  describe "after_destroy" do
    let!(:place) { create(:place) }

    context "when the forecast has no other places" do
      it "destroys the forecast" do
        expect { place.destroy! }.
          to(change(Forecast, :count).
by(-1))
      end
    end

    context "when the forecast has other places" do
      it "does not destroy the forecast" do
        create(:place, forecast: place.forecast)
        expect { place.destroy! }.
          not_to(change(Forecast, :count))
      end
    end
  end
end
