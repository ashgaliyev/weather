# frozen_string_literal: true

FactoryBot.define do
  factory :place do
    name { Faker::Address.city }
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }

    trait :with_forecast do
      association :forecast, factory: :forecast
    end
  end
end
