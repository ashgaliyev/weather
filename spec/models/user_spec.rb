# frozen_string_literal: true

require "rails_helper"

RSpec.describe(User, type: :model) do
  describe "validations" do
    it "is invalid without a name" do
      user = build(:user, name: nil)
      expect(user).to(be_invalid)
    end
  end

  describe ".create_from_omniauth" do
    it "creates a user" do
      user_info = { 'info' => { 'name' => 'John Smith', 'email' => 'foo@bar.com' } }
      user = described_class.create_from_omniauth(user_info)
      expect(user.name).to(eq('John Smith'))
      expect(user.email).to(eq('foo@bar.com'))
    end
  end

  describe "#save_places" do
    it "saves places" do
      user = create(:user)
      place = create(:place, :with_forecast)
      user.save_places([place.id])
      expect(user.places).to(include(place))
    end

    it "does not save duplicate places" do
      user = create(:user)
      place = create(:place, :with_forecast)
      user.places << place
      user.save_places([place.id])
      expect(user.places.count).to(eq(1))
    end
  end
end
