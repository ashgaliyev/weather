Rails.application.routes.draw do
  root to: 'forecasts#current'

  get 'auth/:provider/callback', to: 'sessions#create'

  get '/login', to: redirect('/auth/google_oauth2')
  delete '/logout', to: 'sessions#destroy'

  get '/forecasts/current', to: 'forecasts#current'
  get '/forecasts/five_days/:place_id', to: 'forecasts#five_days'
end
