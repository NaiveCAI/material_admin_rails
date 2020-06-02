import { initSelect2 } from '../common/common.js';

$(document).on('turbolinks:load', () => {
  $('select.select2').each(function(_i, ele) {
    initSelect2(ele);
  })
})

$(document).on('turbolinks:before-cache', () => {
  $('select.select2').select2('destroy');
  destroyDataTables();
})

function destroyDataTables() {
  let $dts = $('.dataTable');
  if ($dts.length) {
    $dts.each(function(_i, dt) {
      $(dt).DataTable().destroy();
    })
  }
}
