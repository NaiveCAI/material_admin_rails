# frozen_string_literal: true

class CrudGenerator < Rails::Generators::NamedBase
  include Rails::Generators::Actions

  class_option :options, type: :string, default: ''

  # NOTE: Must use singular for resource param

  # TODO: customize dir prefix
  WEBPACKER_DIR_PREFIX = 'javascript'

  def create_files
    p 'Create js controller file...'

    create_file "#{Rails.root}/app/#{WEBPACKER_DIR_PREFIX}/src/javascripts/#{layout_name}/controllers/#{resource}_controller.js" do
      <<~js
        import { Controller } from "stimulus";
        import initDatatable from '../../lib/utils_datatables.js';

        export default class extends Controller {
          connect() {
            if (!$('body').hasClass('#{layout_name}-#{resource}')) return false;

            if (!$('table##{resource}-datatable').hasClass('dataTable')) {
              initDatatable($('##{resource}-datatable'), { searching: true });
            }
          }
        }
      js
    end

    p 'Create resource template files...'

    create_file "#{Rails.root}/app/views/#{layout_name}/#{resource}/index.html.slim" do
      <<~html
        = content_for :breadcrumb do
          = render '#{layout_name}/shared/breadcrumb',
            title: ''

        .col-12
          .card
            .card-body
              = dt id: '#{resource}-datatable', class: 'table', 'data-url': #{layout_name}_#{resource}_path do
                = dt_col('email', data: { data: 'email' })
                | TODO
      html
    end

    create_file "#{Rails.root}/app/views/#{layout_name}/#{resource}/new.html.slim" do
      <<~html
        = content_for :breadcrumb do
          = render 'admin/shared/breadcrumb',
            title: '#{resource.camelize}',
            links: [{ text: '#{resource.camelize}', link: admin_#{resource}_path }, { text: '添加' }]

        = render 'form', url: admin_#{resource}_path
      html
    end

    create_file "#{Rails.root}/app/views/#{layout_name}/#{resource}/edit.html.slim" do
      <<~html
        = content_for :breadcrumb do
          = render 'admin/shared/breadcrumb',
            title: '#{resource.camelize}',
            links: [{ text: '#{resource.camelize}', link: admin_#{resource}_path }, { text: '编辑' }]

        = render 'form', url: admin_#{name}_path
      html
    end

    create_file "#{Rails.root}/app/views/#{layout_name}/#{resource}/_form.html.slim" do
      <<~html
        .col-lg-12
          .card
            .card-body
              = form_for @#{name}, url: url, html: { class: 'form-horizontal' } do |f|
                .form-body
                  .form-group.row
                    // TODO:
                    // = f.label :'', '', class: 'control-label text-right col-md-3'
                    // .col-md-6
                    //   = f.text_field :'', class: 'form-control', required: true, placeholder: ''

                .form-actions.text-center
                  = f.submit '保存', class: 'btn btn-success waves-effect waves-light m-r-10'
                  = link_to '返回', admin_#{resource}_path, class: 'btn btn-inverse waves-effect waves-light'
      html
    end

    p 'Create resource index json file...'

    create_file "#{Rails.root}/app/views/#{layout_name}/#{resource}/index.json.jbuilder" do
      <<~html
        # frozen_string_literal: true

        datatable_json_response(json) do
          json.array! @rows do |row|
          end
        end
      html
    end

    p 'Create resource controller file...'

    create_file "#{Rails.root}/app/controllers/#{layout_name}/#{resource}_controller.rb" do
      <<~controller
        # frozen_string_literal: true

        class #{layout_name.camelize}::#{resource.camelize}Controller < #{layout_name.camelize}::BaseController

          include DatatableDecorator

          def index
            respond_to do |format|
              format.html
              format.json { fetch_#{resource} }
            end
          end

          def new
            @#{name} = #{name.camelize}.new
          end

          def edit
            @#{name} = #{name.camelize}.find(params[:id])
          end

          private

          def fetch_#{resource}
            dt = decode_datatable_params

            search_obj = { order: dt[:sort_statement] }

            search_text = dt[:search_text]

            #{resource} =
              if search_text.present?
                #{name.camelize}.where('nickname ilike ?', "%\#\{search_text\}\%")
              else
                #{name.camelize}.all
              end

            @total_rows = #{resource}.count

            @rows = users.page(dt[:page]).per(dt[:per_page])
            @rows = @rows.order(search_obj[:order])
          end
        end
      controller
    end

    p "Create #{name} model..."

    system("rails generate model #{name}")
  end

  def need_modify
    p '****************************************************'
    p '****************************************************'
  end

  def prompt_modify_migration
    p "Need change #{resource} migration file then run migration manually..."
  end

  def prompt_add_routes
    p "Need add routes for #{resource} in #{layout_name} namespace manually..."
  end

  def prompt_uncomment_stimulus_controllers
    p 'Remember to uncomment stimulus js controllers'
  end

  def end
    p '****************************************************'
    p '****************************************************'
  end

  private

  def resource
    name.pluralize
  end

  def layout_name
    opts.fetch(:layout_name, 'admin')
  end

  def opts
    options['options'].split(' ').map { |ele| ele.split(':') }.to_h.symbolize_keys
  end
end
