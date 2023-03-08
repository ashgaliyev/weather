json.weather_type 'five_days'
json.place do
  json.partial! 'places/place', place: @place
end
json.forecast do
  json.(@forecast, :id)
  json.five_days do
    json.array! @forecast.five_days['list'] do |data|
      json.partial! 'forecasts/weather_data', data: data
    end
  end
end
