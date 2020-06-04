# frozen_string_literal: true

module ApplicationHelper
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

  def sort_opt(model, column)
    { model: model, column: column }.to_json
  end
end
