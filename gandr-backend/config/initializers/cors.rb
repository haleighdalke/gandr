# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
<<<<<<< HEAD

    origins '*'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
        :max_age => 0
=======
    origins '*'
    resource '*',
      :headers => :any,
      :methods => [:get, :post, :delete, :put, :patch, :options, :head],
      :max_age => 0
>>>>>>> d49921334e02218e4829135cccd27ab9581b9cfb
  end
end
