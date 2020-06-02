# frozen_string_literal: true

class MaterialAdminGenerator < Rails::Generators::NamedBase
  include Rails::Generators::Actions

  GEM_NAME = 'material_admin'
  GEM_PATH = Gem.loaded_specs[GEM_NAME].full_gem_path

  # TODO: customize dir prefix
  WEBPACKER_DIR_PREFIX = 'javascript'

  # source_root File.expand_path('templates', __dir__)
  class_option :layout_name, type: :string, default: 'admin'
  class_option :options, type: :string, default: []

  def import_files
    p 'import material admin theme files...'

    webpacker_dir = "#{Rails.root}/app/#{WEBPACKER_DIR_PREFIX}"

    FileUtils.copy_entry("#{GEM_PATH}/vendor/#{GEM_NAME}", webpacker_dir)
  end

  def create_js_manifest
    p "create #{layout_name} js manifest..."

    src = "#{GEM_PATH}/vendor/javascript/packs/admin.js"
    dest = "#{Rails.root}/app/#{WEBPACKER_DIR_PREFIX}/packs/#{layout_name}.js"

    FileUtils.cp src, dest
  end

  def create_style_manifest
    p "create #{layout_name} style js manifest..."

    src = "#{GEM_PATH}/vendor/javascript/packs/admin_style.js"
    dest = "#{Rails.root}/app/#{WEBPACKER_DIR_PREFIX}/packs/#{layout_name}_style.js"

    FileUtils.cp src, dest
  end

  def create_layout
    p "create #{layout_name} layout..."

    layout_html_path = "#{Rails.root}/app/views/layouts/#{layout_name}.html.erb"
    File.rename(layout_html_path, "#{options['layout_name']}.html.slim") if File.exist?(layout_html_path)

    src = "#{GEM_PATH}/vendor/views/layouts/admin.html.slim"
    dest = "#{Rails.root}/app/views/layouts/#{layout_name}.html.slim"

    FileUtils.cp src, dest
  end

  def create_partials
    p "create #{layout_name} shared partials..."

    dest = "#{Rails.root}/app/views/#{layout_name}/shared"

    FileUtils.mkdir_p(dest) unless File.directory?(dest)

    FileUtils.copy_entry("#{GEM_PATH}/vendor/views/shared", dest)
  end

  # def create_dashboard_controller
  #  create_file "#{prefix('c')}/dashboard_controller.rb" do
  #    <<~dashboard_controller
  #      # frozen_string_literal: true

  #      class DashboardController < ApplicationController
  #        def index
  #        end
  #      end
  #    dashboard_controller
  #  end

  #  route "root 'dashboard#index'"
  # end

  # def create_dashboard_view
  #  create_file "#{prefix('v')}/dashboard/index.html.slim" do
  #    <<~dashboard_page
  #      .row.m-bottom-md
  #        .col-sm-6
  #          .page-title
  #            | Dashboard
  #          .page-sub-header
  #            | Welcome come back🙂
  #    dashboard_page
  #  end
  # end

  private

  def layout_name
    options['layout_name']
  end

  # def prefix(t)
  #  t = case t
  #      when 'm' then 'models'
  #      when 'v' then 'views'
  #      when 'c' then 'controllers'
  #      end
  #  layout_name == 'application' ? "app/#{t}/" : "app/#{t}/#{layout_name}"
  # end

  # def title
  #  attrs.fetch(:title)
  # end

  # def attrs
  #  options['options'].split(' ').map { |ele| ele.split(':') }.to_h.symbolize_keys
  # end
end
