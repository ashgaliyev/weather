# frozen_string_literal: true

FactoryBot.define do
  factory :forecast do
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }
  end
end
