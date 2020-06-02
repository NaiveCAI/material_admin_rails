# frozen_string_literal: true

$LOAD_PATH.push File.expand_path('lib', __dir__)

# Maintain your gem's version:
require 'material_admin/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = 'material_admin'
  spec.version     = MaterialAdmin::VERSION
  spec.authors     = ['Tracy Cai']
  spec.email       = ['tracy.cai@openapply.com']
  spec.summary     = 'Quickly start admin page using SimplifyAdmin theme.'
  spec.description = 'Quickly start admin page using SimplifyAdmin theme.'
  spec.homepage    = 'https://github.com/NaiveCAI/simplify_admin_template'
  spec.license     = 'MIT'

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise 'RubyGems 2.0 or newer is required to protect against ' \
      'public gem pushes.'
  end

  spec.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  spec.add_dependency 'rails', '~> 5.2.4', '>= 5.2.4.3'

  spec.add_development_dependency 'sqlite3'
end
