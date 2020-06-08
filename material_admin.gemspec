# frozen_string_literal: true

$LOAD_PATH.push File.expand_path('lib', __dir__)

# Maintain your gem's version:
require 'material_admin/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = 'rails_material_admin'
  spec.version     = MaterialAdmin::VERSION
  spec.authors     = ['Tracy Cai']
  spec.email       = ['835010809@qq.com']
  spec.summary     = 'Quickly start admin page using Material Admin Pro theme.'
  spec.description = 'Quickly start admin page using Material Admin Pro theme.'
  spec.homepage    = 'https://github.com/NaiveCAI/material_admin_rails'
  spec.license     = 'MIT'

  spec.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  spec.add_dependency 'rails', '~> 5.2.4', '>= 5.2.4.3'
end
