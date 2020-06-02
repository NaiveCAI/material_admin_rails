/*
 * @params:
 *   1. jQuery selector
 * @select data options parameters
 *   2. hide_search_box
 *   3. tags
 */
function initSelect2(selector) {
  let opts = {};
  let $select = $(selector);

  if ($select.data('hide-search-box')) {
    opts.minimumResultsForSearch = Infinity;
  }
  if ($select.data('tags')) {
    opts.tags = true;
  }
  if ($select.data('placeholder')) {
    opts.placeholder = $select.data('placeholder');
  }

  $select.select2(Object.assign(opts, {
    language: 'zh-CN'
  }));
}

export { initSelect2 };
