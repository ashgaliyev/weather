FactoryBot.define do
  factory :forecast do
    lat { Faker::Address.latitude }
    lng { Faker::Address.longitude }
  end
end
