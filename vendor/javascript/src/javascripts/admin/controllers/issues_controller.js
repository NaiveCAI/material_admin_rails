import { Controller } from "stimulus";
import initDatatable from '../../lib/utils_datatables.js';

export default class extends Controller {
  connect() {
    if (!$('body').hasClass('admin-issues')) return false;
    if (!$('table#issues-datatable').hasClass('dataTable')) {
      initDatatable($('#issues-datatable'), { searching: true });
    }
  }
}
