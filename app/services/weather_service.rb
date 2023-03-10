# frozen_string_literal: true

require "net/http"
require "json"

class WeatherService
  class WeatherServiceError < StandardError; end

  def self.conn
    Net::HTTP.new("api.openweathermap.org", 443).tap do |http|
      http.use_ssl = true
    end
  end

  def self.forecast(lat, lon)
    response = conn.get("/data/2.5/forecast?lat=#{lat}&lon=#{lon}&appid=#{ENV.fetch('WEATHER_API_KEY', nil)}")

    handle_error(response)

    JSON.parse(response.body, symbolize_names: true)
  end

  def self.current(lat, lon)
    response = conn.get("/data/2.5/weather?lat=#{lat}&lon=#{lon}&appid=#{ENV.fetch('WEATHER_API_KEY', nil)}")

    handle_error(response)

    JSON.parse(response.body, symbolize_names: true)
  end

  def self.handle_error(response)
    unless response.is_a?(Net::HTTPSuccess)
      message = JSON.parse(response.body)["message"]
      raise(WeatherServiceError(message))
    end
  rescue JSON::ParserError
    raise(WeatherServiceError("Invalid response from API"))
  end
end
