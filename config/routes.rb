# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "places#index"

  get "auth/:provider/callback", to: "sessions#create"

  get "/login", to: redirect("/auth/google_oauth2")
  delete "/logout", to: "sessions#destroy"
  put "/update_temp_unit", to: "sessions#update_temp_unit"

  resources :places
end
