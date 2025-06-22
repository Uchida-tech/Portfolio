# -*- encoding: utf-8 -*-
# stub: rubocop-faker 1.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "rubocop-faker".freeze
  s.version = "1.2.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "homepage_uri" => "https://github.com/koic/rubocop-faker", "rubygems_mfa_required" => "true" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Koichi ITO".freeze]
  s.bindir = "exe".freeze
  s.date = "2024-10-21"
  s.description = "A RuboCop extension for Faker.".freeze
  s.email = ["koic.ito@gmail.com".freeze]
  s.homepage = "https://github.com/koic/rubocop-faker".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7.0".freeze)
  s.rubygems_version = "3.1.6".freeze
  s.summary = "A RuboCop extension for Faker.".freeze

  s.installed_by_version = "3.6.3".freeze

  s.specification_version = 4

  s.add_runtime_dependency(%q<faker>.freeze, [">= 2.12.0".freeze])
  s.add_runtime_dependency(%q<rubocop>.freeze, [">= 1.13.0".freeze])
end
