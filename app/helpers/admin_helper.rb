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

  def sub_item_active?(sub_c_names = [])
    class_names = 'sidebar-item'

    if controller_name.in?(sub_c_names)
      class_names += ' active'
    end

    class_names
  end

  def sidebar_item_classes(c_names, *a_names)
    class_names = 'sidebar-item'

    if a_names.any?
      class_names += ' selected' if controller_name.in?(c_names) && action_name.in?(a_names)
    else
      class_names += ' selected' if controller_name.in? c_names
    end

    class_names
  end

  def sidebar_item_link_classes(c_names, *a_names)
    class_names = 'sidebar-link waves-effect waves-dark sidebar-link'

    if a_names.any?
      class_names += ' active' if controller_name.in?(c_names) && action_name.in?(a_names)
    else
      class_names += ' active' if controller_name.in? c_names
    end

    class_names
  end
end
