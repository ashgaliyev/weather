# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.first

if user
  if user.places.exists?(name: "Uralsk")
    Rails.logger.debug("User already has Uralsk\n")
    exit
  end

  Rails.logger.debug { "Seeding user #{user.name}..." }
  forecast_contents = JSON.parse(File.read("spec/fixtures/forecast.json"))
  weather_contents = JSON.parse(File.read("spec/fixtures/weather.json"))

  Rails.logger.debug("Creating forecast... ")
  forecast = Forecast.create!(
    lat: weather_contents["coord"]["lat"],
    lng: weather_contents["coord"]["lon"],
    current: weather_contents,
    five_days: forecast_contents
  )

  Rails.logger.debug("Creating place... ")
  place = Place.create!(
    name: "Uralsk",
    lat: weather_contents["coord"]["lat"],
    lng: weather_contents["coord"]["lon"],
    forecast:
  )

  Rails.logger.debug("Creating user place... ")
  user.places << place
  Rails.logger.debug("Done!")
else
  Rails.logger.debug("No users found")
end
