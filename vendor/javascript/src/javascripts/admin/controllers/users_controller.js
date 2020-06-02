import { Controller } from "stimulus";
import initDatatable from '../../lib/utils_datatables.js';

export default class extends Controller {
  connect() {
    if (!$('body').hasClass('admin-users')) return false;
    if (!$('table#users-datatable').hasClass('dataTable')) {
      initDatatable($('#users-datatable'), { searching: true });
    }
  }
}
