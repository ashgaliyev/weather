require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    it "is invalid without a name" do
      user = build(:user, name: nil)
      expect(user).to be_invalid
    end
  end

  describe "associations" do
    it "has many places" do
      user = create(:user)
      place = create(:place, :with_forecast)
      user.places << place
      expect(user.places).to include(place)
    end
  end
end
