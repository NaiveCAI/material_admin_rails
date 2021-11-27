# frozen_string_literal: true

class MaterialAdminGenerator < Rails::Generators::NamedBase
  include Rails::Generators::Actions

  GEM_NAME = 'rails_material_admin'
  GEM_PATH = Gem.loaded_specs[GEM_NAME].full_gem_path
  JS_PKGS  =
    'datatables.net-bs5 datatables.net-responsive datatables.net-select-bs5 datatables.net-buttons'\
    ' expose-loader@1.0.3 file-loader url-loader resolve-url-loader'\
    ' @rails/ujs @rails/activestorage'\
    ' stimulus turbolinks'\
    ' jquery popper.js select2 @popperjs/core webpack-cli'\
    ' daterangepicker bootstrap-datepicker'
  ESLINT_JS_PKGS =
    'eslint prettier eslint-plugin-prettier eslint-config-prettier'\
    ' stylelint stylelint-config-prettier stylelint-config-recommended stylelint-scss'

  # TODO: Warning! Add reset project.

  # TODO: customize dir prefix
  WEBPACKER_DIR_PREFIX = 'javascript'

  class_option :layout_name, type: :string, default: 'admin'
  class_option :options, type: :string, default: []

  def add_gems
    p 'Add gems...'

    gem 'slim'
    gem 'devise'
    gem 'kaminari'

    system('bundle install')
  end

  def import_files
    p 'Import material admin theme files...'

    webpacker_dir = "#{Rails.root}/app/#{WEBPACKER_DIR_PREFIX}"

    FileUtils.mkdir_p("#{webpacker_dir}/vendor") unless File.directory?("#{webpacker_dir}/vendor")

    FileUtils.copy_entry("#{GEM_PATH}/vendor/#{GEM_NAME}", "#{webpacker_dir}/vendor/#{GEM_NAME}/")

    # p 'Import package.json...'

    # FileUtils.cp "#{GEM_PATH}/package.json", "#{Rails.root}/package.json"

    p 'Import js source files...'

    FileUtils.copy_entry("#{GEM_PATH}/vendor/javascript", webpacker_dir)

    p 'Import datatable files...'

    FileUtils.cp(
      "#{GEM_PATH}/app/controllers/concerns/datatable_decorator.rb",
      "#{Rails.root}/app/controllers/concerns/datatable_decorator.rb"
    )

    FileUtils.cp(
      "#{GEM_PATH}/app/helpers/datatables_helper.rb",
      "#{Rails.root}/app/helpers/datatables_helper.rb"
    )
  end

  def yarn_install
    system("yarn add #{JS_PKGS}")
    system("yarn add #{ESLINT_JS_PKGS} --dev")
  end

  def create_helper
    p "Create #{layout_name} layout helper..."

    create_file "#{Rails.root}/app/helpers/#{layout_name}_helper.rb" do
      <<~helper
        # frozen_string_literal: true

        module #{layout_name.camelize}Helper
          def body_id
            ctrl_name = controller_path.gsub(%r{^v\d+/}, '').tr('/', '-')
            [ctrl_name, action_name].map(&:dasherize).join('-')
          end

          def body_class
            controller_path.gsub(%r{^v\d+/}, '').tr('/', '-').dasherize
          end

          def body_data_controller
            @body_data_controller ||= controller_name.tr('_', '-').split('/').join('-')
          end
        end
      helper
    end
  end

  def create_js_manifest
    p "Create #{layout_name} js manifest..."

    src = "#{GEM_PATH}/vendor/javascript/packs/admin.js"
    dest = "#{Rails.root}/app/#{WEBPACKER_DIR_PREFIX}/packs/#{layout_name}.js"

    FileUtils.cp src, dest
  end

  def create_style_manifest
    p "Create #{layout_name} style js manifest..."

    src = "#{GEM_PATH}/vendor/javascript/packs/admin_style.js"
    dest = "#{Rails.root}/app/#{WEBPACKER_DIR_PREFIX}/packs/#{layout_name}_style.js"

    FileUtils.cp src, dest
  end

  def create_layout
    p "Create #{layout_name} layout..."

    layout_html_path = "#{Rails.root}/app/views/layouts/#{layout_name}.html.erb"
    File.rename(layout_html_path, "#{options['layout_name']}.html.slim") if File.exist?(layout_html_path)

    src = "#{GEM_PATH}/app/views/layouts/admin.html.slim"
    dest = "#{Rails.root}/app/views/layouts/#{layout_name}.html.slim"

    FileUtils.cp src, dest

    src = "#{GEM_PATH}/app/views/layouts/unauthorized.html.slim"
    dest = "#{Rails.root}/app/views/layouts/unauthorized.html.slim"

    FileUtils.cp src, dest
  end

  def create_partials
    p "Create #{layout_name} shared partials..."

    dest = "#{Rails.root}/app/views/#{layout_name}/shared"

    FileUtils.mkdir_p(dest) unless File.directory?(dest)

    FileUtils.copy_entry("#{GEM_PATH}/app/views/shared", dest)
  end

  def create_base_controller
    p "Create base controller'"

    create_file "#{Rails.root}/app/controllers/#{layout_name}/base_controller.rb" do
      <<~dashboard_controller
        # frozen_string_literal: true

        class #{layout_name.camelize}::BaseController < ActionController::Base
          layout '#{layout_name}'

          include DatatableDecorator

          before_action :authenticate_#{layout_name}!
        end
      dashboard_controller
    end
  end

  def create_dashboard_controller
    p 'Create dashboard controller...'

    create_file "#{Rails.root}/app/controllers/#{layout_name}/dashboard_controller.rb" do
      <<~dashboard_controller
        # frozen_string_literal: true

        class #{layout_name.camelize}::DashboardController < #{layout_name.camelize}::BaseController
          def index
          end
        end
      dashboard_controller
    end
  end

  def create_sessions_controller
    p "Create #{layout_name} sessions controller..."

    create_file "#{Rails.root}/app/controllers/#{layout_name}/sessions_controller.rb" do
      <<~sessions_controller
        # frozen_string_literal: true

        class Admin::SessionsController < Devise::SessionsController
          layout 'unauthorized'
        end
      sessions_controller
    end
  end

  def create_dashboard_view
    p 'Create dashboard view...'

    create_file "#{Rails.root}/app/views/#{layout_name}/dashboard/index.html.slim" do
      <<~dashboard_page
        h1 Welcome come back🙂
      dashboard_page
    end
  end

  def create_new_session_file
    p 'Create sign_in template...'

    dir = "#{Rails.root}/app/views/#{layout_name}/sessions/"

    FileUtils.mkdir_p(dir) unless File.directory?(dir)

    FileUtils.cp(
      "#{GEM_PATH}/app/views/#{layout_name}/sessions/new.html.slim",
      "#{Rails.root}/app/views/#{layout_name}/sessions/new.html.slim"
    )
  end

  def init_db
    p 'Init db...'

    system('rake db:drop db:create')

    p 'Init devise...'
    system('rails g devise:install')
    system("rails generate model #{layout_name}")
    system("rails generate devise #{layout_name}")
    system('rake db:migrate')
  end

  def modify_webpacker_environment_file
    p 'Overwrite config webpack environment js file'

    src = "#{GEM_PATH}/config/webpack/environment.js"
    dest = "#{Rails.root}/config/webpack/environment.js"

    FileUtils.cp src, dest
  end

  def need_modify
    p '****************************************************'
    p '****************************************************'
  end

  def prompt_confit_route
    puts "Need change the devise default route to:\n"
    routes = <<~routes
      devise_for :#{layout_name},
        path: '#{layout_name}',
        controllers: { sessions: '#{layout_name}/sessions' }

      namespace :#{layout_name} do
        root 'dashboard#index'
      end
    routes
    puts routes
  end

  def prompt_extract_css
    puts "Need set extract_css to true in webpacker.yml\n"
    p 'extract_css: true'
  end

  def at_end
    p '****************************************************'
    p '****************************************************'
  end

  private

  def layout_name
    options['layout_name']
  end
end
