# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
require "spec_helper"
ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"
require "capybara/rails"
require "capybara/rspec"
require "webdrivers"
require "webmock/rspec"
require "sidekiq/testing"

Sidekiq::Testing.inline!
WebMock.disable_net_connect!(allow_localhost: true)

# Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
Dir[Rails.root.join("spec", "support", "**", "*.rb")].each { |f| require f }

Capybara.register_driver(:selenium_chrome) do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    'goog:loggingPrefs': { browser: "INFO", driver: "WARNING" },
    'goog:chromeOptions': { args: %w[headless disable-gpu], w3c: false }
  )
  Capybara::Selenium::Driver.new(app, browser: :chrome, desired_capabilities: capabilities)
end

Capybara.javascript_driver = :selenium_chrome_headless
Capybara.server = :puma, { Silent: true }
Capybara.run_server = true

# Checks for pending migrations and applies them before tests are run.
# If you are not using ActiveRecord, you can remove these lines.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort(e.to_s.strip)
end
RSpec.configure do |config|
  include PlaceHelpers

  config.before do
    stub_request(:get, %r{api.openweathermap.org/data/2.5/weather}).
      to_return(status: 200, body: Rails.root.join("spec", "fixtures", "weather.json").read, headers: {})

    stub_request(:get, %r{api.openweathermap.org/data/2.5/forecast}).
      to_return(status: 200, body: Rails.root.join("spec", "fixtures", "forecast.json").read, headers: {})
  end

  config.before(:each, type: :system) do
    driven_by :selenium_chrome
  end

  config.after(:each, type: :system) do
    console_errors = page.driver.browser.manage.logs.get(:browser).select { |m| m.level == "SEVERE" }
    console_errors.each do |error|
      # skip beginning of the error message until \" found
      msg = error.message[/".*$/]
      next if msg.nil? || msg.include?('Google Maps JavaScript API error: RefererNotAllowedMapError')

      expect(msg).to(eq("")) # just to print the error
    end
  end

  config.include(FactoryBot::Syntax::Methods)
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  # config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, type: :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  # config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")
end
