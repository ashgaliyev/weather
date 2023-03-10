json.place do
  json.partial! 'places/place', place: @place
end
json.forecast do
  json.(@forecast, :id)
  json.five_days do
    if @forecast.five_days.nil?
      nil
    else
      json.array! @forecast.five_days['list'] do |data|
        json.partial! 'places/weather_data', data: data
      end
    end
  end
end
