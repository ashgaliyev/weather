json.(forecast, :id)

if weather_type == 'current'
  json.current do
    json.partial! 'forecasts/weather_data', data: forecast.current
  end
else
  json.five_days do
    json.array! forecast.five_days do |data|
      json.partial! 'forecasts/weather_data', data: data
    end
  end
end
