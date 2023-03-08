Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'

  get '/login', to: redirect('/auth/google_oauth2')
  delete '/logout', to: 'sessions#destroy'
end
