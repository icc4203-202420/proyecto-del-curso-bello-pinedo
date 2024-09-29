Rails.application.routes.draw do
  get 'current_user', to: 'current_user#index'
  
  devise_for :users, path: '', path_names: {
    sign_in: 'api/v1/login',
    sign_out: 'api/v1/logout',
    registration: 'api/v1/signup'
  },
  controllers: {
    sessions: 'api/v1/sessions',
    registrations: 'api/v1/registrations'
  }

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :bars do
        resources :events do
          resources :images, only: [:create, :index], controller: 'event_pictures'
        end
      end
      resources :beers do
        member do
          get :bars 
        end
      end
      resources :users do
        resources :reviews, only: [:index, :create, :update, :destroy]
      end
      resources :events do
        resources :attendances, only: [:index, :show], action: 'indexAttendances'
      end
      
      resources :reviews, only: [:index, :show, :create, :update, :destroy]
      resources :events
      resources :attendances, only: [:index, :show, :create, :update, :destroy]
    end
  end
end