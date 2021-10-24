/*
 * Create datatables which use AJAX to fetch data, cooperated with datatables_helper.rb:
 *   read the 'dt_col' method in datatables_helper to specific the columns attributes used by datatables
 *   read the 'dt' method in datatables_helper, generate 'data-url' attribute of table and use these values as the source for datatables remote data sources
 *   If there isn't any ajax data attribute set manually, then 'input.filter-input' 'data-props' values in current page will be used as default data filter to remote

 @param {String} container of datatable，html table tag
 @param {Object} opts, datatable's additional params，[datatables] (http://datatables.net/reference/option), nil by default.
 @return {Object} datatable.api() object
*/

export default function initDatatable(container, opts = {}) {
  // generate columns according to th in table
  let $container = $(container);
  let columns = [];
  let method;
  
  if (opts.method) {
    method = opts.method
  } else {
    method = 'GET'
  }

  for (let th of $container.find('th')) {
    let col;
    let data = $(th).data();
    let keys = Object.keys(data);

    if (keys.length > 1 && keys.includes('data')) {
      col = { data: {} };
    } else {
      col = {};
    }

    for (let k of keys) {
      let newKey = k.split('_').map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');
      newKey = newKey[0].toLowerCase() + newKey.slice(1);
      if (keys.length > 1) {
        switch(k) {
          case 'data':
            col['data']['_'] = data[k];
          default:
            col['data'][newKey] = data[k];
        }
      } else {
        col[newKey] = data[k];
      }
    }
    columns.push(col);
  }

  let newOpts = {
    columns: columns,
    destroy: true,
    serverSide: true,
    ajax: {
      method: method,
      url: $container.data('url'),
      cache: false,
      data: (d) => {
        for (let i = 0; i < $('.filter-input').length; i++) {
          let fi = $('.filter-input')[i];
          d[$(fi).data('prop')] = $(fi).val();
        }
        return d;
      }
    }
  };

  $.extend(newOpts, opts);
  return $container.addClass('nowrap').dataTable(newOpts).api();
};

$.extend($.fn.dataTable.defaults, {
  paging: true,
  pageLength: 25,
  lengthChange: true,
  info: true,
  // stateSave: true,
  scrollX: true,
  searching: false,
  dom: "<'row'<'col-sm-6'l><'col-sm-6 text-right'f>><'row'<'col-sm-12't>><'row'<'col-sm-6'i><'col-sm-6'p>>",
  processing: true,
  language: {
    "sProcessing": "<span class='fa-stack fa-lg'>\n\
      <i class='fa fa-spinner fa-spin fa-stack-2x fa-fw'></i>\n\
      </span>&emsp;Processing ...",
    "sLengthMenu":   "每页 _MENU_ 条",
    "sZeroRecords":  "没有匹配结果",
    "sInfo":         "第_PAGE_页 共_PAGES_页",   // "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项"
    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix":  "",
    "sSearch":       "搜索:",
    "sUrl":          "",
    "sEmptyTable":     "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands":  ",",
    "oPaginate": {
      "sFirst":    "首页",
      "sPrevious": "上页",
      "sNext":     "下页",
      "sLast":     "末页",
    },
    "oAria": {
      "sSortAscending":  ": 以升序排列此列",
      "sSortDescending": ": 以降序排列此列",
    }
  }
})
