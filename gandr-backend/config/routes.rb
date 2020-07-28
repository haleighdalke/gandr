Rails.application.routes.draw do
  resources :tags
  resources :artworks_tags
  resources :comments
  resources :likes
  resources :users
  resources :artworks
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
