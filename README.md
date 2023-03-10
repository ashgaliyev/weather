# Weather Tracker

This is a simple weather tracker that uses the [OpenWeatherMap API](https://openweathermap.org/api) to get the current weather for a given city. It also uses the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) to find the latitude and longitude when creating a new tracker for a place.
It allows to login using google auth and save previously created trackers.

## Prerequisites

- Docker
- Docker Compose
- Ruby 3.1.2

Keys:

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
- Configure OAuth on [Google Cloud Platform](https://console.cloud.google.com/apis/credentials/consent)

## Setup and run

- Clone the repository
- Copy `.env.example` to `.env` and fill the keys
- `bundle install`
- `yarn install`
- Run `docker-compose up` to start the database and redis
- In another terminal, run `./bin/dev` to start the server
- Open `http://localhost:3000` in your browser

## Tests

- `bundle exec rspec`
- `yarn test`
