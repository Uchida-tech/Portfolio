# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://my-portfolio-five-lovat-o9u46t7cag.vercel.app"

    resource "*",
             headers: :any,
             expose: ["access-token", "uid", "client"],
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
