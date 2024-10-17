Rails.application.routes.draw do
  scope '/api/v1' do
    devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
    resources :users, only: [:show, :index]do
      collection do
        get 'users'
        get 'admins'
      end
    end
    resources :articles do
      collection do
        get 'blogs'
      end
    end
    resources :comments
    resources :likes
  end
end
 





