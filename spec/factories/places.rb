# frozen_string_literal: true

FactoryBot.define do
  factory :place do
    name { Faker::Address.city }
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }
  end
end
