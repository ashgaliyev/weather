Rails.application.routes.draw do
  root to: 'forecasts#current'

  get 'auth/:provider/callback', to: 'sessions#create'

  get '/login', to: redirect('/auth/google_oauth2')
  delete '/logout', to: 'sessions#destroy'
  put '/update_temp_unit', to: 'sessions#update_temp_unit'

  get '/forecasts/current', to: 'forecasts#current'
  get '/forecasts/five_days/:place_id', to: 'forecasts#five_days'
end
