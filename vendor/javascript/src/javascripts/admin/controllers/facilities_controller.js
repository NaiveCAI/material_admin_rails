import { Controller } from "stimulus";
import initDatatable from '../../lib/utils_datatables.js';

export default class extends Controller {
  connect() {
    if (!$('body').hasClass('admin-facilities')) return false;
    if (!$('table#facilities-datatable').hasClass('dataTable')) {
      initDatatable($('#facilities-datatable'), { searching: true });
    }
  }
}
