Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"
      namespace :user do
        resource :confirmations, only: [:update]
      end
      namespace :current do
        resource :user, only: [:show]
        resources :active_recalls, only: [:index, :show, :create, :update] do
          resources :recalls, only: [:index, :create, :show]
        end
      end
      resources :active_recalls, only: [:index, :show]
    end
  end
end
