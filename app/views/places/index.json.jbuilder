json.places do
  json.array! @places do |place|
    json.partial! 'places/place', place: place
  end
end
json.forecasts do 
  json.array! @forecasts do |forecast|
    json.(forecast, :id)
    json.weather do
      json.partial! 'places/weather_data', data: forecast.current
    end
  end
end
