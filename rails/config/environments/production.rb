config.action_mailer.raise_delivery_errors = true

config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  address: ENV.fetch("SMTP_ADDRESS", nil),
  port: ENV.fetch("SMTP_PORT", nil),
  domain: "onrender.com",
  user_name: ENV.fetch("SENDGRID_USERNAME", nil),
  password: ENV.fetch("SENDGRID_PASSWORD", nil),
  authentication: :plain,
  enable_starttls_auto: true,
}

config.action_mailer.default_url_options = {
  host: "your-app-name.onrender.com",
  protocol: "https",
}
