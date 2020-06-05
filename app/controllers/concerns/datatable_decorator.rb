# frozen_string_literal: true

module DatatableDecorator
  extend ActiveSupport::Concern

  def decode_datatable_params
    row_start = params['start'].to_i
    rows_per_page = params['length'].to_i
    search_text = params['search']['value']

    # Convert hashed arrays into array
    columns = []
    params['columns'].each do |k, v|
      if v['data'].is_a? ActionController::Parameters
        v['data'].each do |kk, vv|
          v['name'] = v['data']['_'] if v['name'].blank?
          v[kk] = vv
        end
      else
        v['name'] = v['data'] if v['name'].blank?
      end
      columns[k.to_i] = v
    end

    order_columns = []
    include_columns = []
    order_expressions = []
    params['order'].each do |k, v|
      col = columns[v['column'].to_i]
      sort_params = col['sort']

      if sort_params.present?
        if sort_params.is_a? ActionController::Parameters
          order_expressions << "#{sort_params['model'].pluralize}.#{sort_params['column']} #{v['dir']}"
          include_columns << sort_params['model'].pluralize
        else
          order_expressions << "#{sort_params} #{v['dir']}"
        end
      else
        order_expressions << "#{col['name']} #{v['dir']}"
      end
      order_columns[k.to_i] = v
    end

    # Now let's rock it and do the processing
    {
      per_page: rows_per_page,
      page: row_start / rows_per_page + 1,
      columns: columns,
      order_columns: order_columns,
      sort_statement: order_expressions.join(','),
      search_text: search_text,
      include_columns: include_columns
    }
  end

  # 用JSON做一个表示操作成功的Response
  #
  # == Parameters:
  # options:: 选项
  #
  # == Options:
  # 在缺省情况下，调用这个函数给一个空的hash也可以，我会自动给回200为response code，错误信息和对象都为空，但是如果需要的，也可以传入一个带哈希作为选项，主要支持：
  # msg:: 需要显示的信息，缺省为空字符串
  # template:: 需要使用的JSON模板，缺省为common/api
  #
  def json_success_response(options = {})
    template = options.delete(:template) || 'common/api'
    msg = options.delete(:msg) || ''
    @code = 200
    @message = msg
    @errors = nil
    render template, layout: 'json_with_meta'
  end

  # 用JSON做一个表示操作失败的Response
  #
  # == Parameters:
  # msg:: 需要显示的错误信息
  # errors:: 错误对象
  def json_failed_response(msg, errors = nil, template = nil)
    @code = 500
    @message = msg
    @errors = errors
    template ||= 'common/api'
    render template, layout: 'json_with_meta', status: 400
  end

  def response_after_save_json(result, obj)
    if result
      json_success_response
    else
      json_failed_response(view_context.tv('message_save_failed_with_msg', msg: obj.errors.full_messages), obj.errors)
    end
  end
end
