Rails.application.routes.draw do
  resources :missions, only: [:index, :create]
  resources :planets, only: :index
  resources :scientists

  get '/pluto_specialist', to: "scientists#pluto_specialist"
  get '/greater_than_30', to: "missions#greater_than_30"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
