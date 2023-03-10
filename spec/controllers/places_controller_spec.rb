# frozen_string_literal: true

require "rails_helper"

RSpec.describe(PlacesController, type: :controller) do
  describe "Logged In" do
    let(:user) { create(:user) }

    before do
      user.places << create(:place, :with_forecast)
      session[:user_id] = user.id
    end

    describe "POST #create" do
      it "returns http success" do
        post :create, params: { place: { name: "Amsterdam2", lat: 52.370216, lng: 4.895168 } }
        expect(user.places.count).to(eq(2))
        expect(response).to(have_http_status(:success))
      end
    end

    describe "PUT #update" do
      it "returns http success" do
        put :update, params: { id: user.places.first.id, place: { name: "Amsterdam2" } }
        expect(user.places.first.name).to(eq("Amsterdam2"))
        expect(response).to(have_http_status(:success))
      end
    end

    describe "DELETE #destroy" do
      it "returns http success" do
        delete :destroy, params: { id: user.places.first.id }
        expect(user.places.count).to(eq(0))
        expect(Place.count).to(eq(0))
        expect(response).to(have_http_status(:success))
      end
    end
  end

  describe "Logged Out" do
    describe "POST #create" do
      it "creates a new place" do
        post :create, params: { place: { name: "Amsterdam2", lat: 52.370216, lng: 4.895168 } }
        expect(Place.count).to(eq(1))
        session[:places] = [Place.first.id]
        expect(response).to(have_http_status(:success))
      end
    end

    describe "PUT #update" do
      it "returns http success" do
        place = create(:place, :with_forecast)
        session[:places] = [place.id]
        put :update, params: { id: place.id, place: { name: "Amsterdam2" } }
        expect(place.reload.name).to(eq("Amsterdam2"))
        expect(response).to(have_http_status(:success))
      end
    end

    describe "DELETE #destroy" do
      it "returns http success" do
        place = create(:place, :with_forecast)
        session[:places] = [place.id]
        delete :destroy, params: { id: place.id }
        expect(Place.count).to(eq(0))
        expect(response).to(have_http_status(:success))
      end
    end
  end
end
