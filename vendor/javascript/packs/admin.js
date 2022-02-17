import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'

import Rails from '@rails/ujs'
import Turbolinks from 'turbolinks'

// NOTE:
// Import order here must not be changed after it works well
// If style went wrong, try change import order randomly🙃
import 'datatables.net-responsive'
// import 'datatables.net-fixedheader'
import 'datatables.net-bs5'
import 'datatables.net-buttons'
import 'datatables.net-select-bs5'
import 'select2'
import 'daterangepicker'
import 'bootstrap-datepicker'

import '../vendor/rails_material_admin/material_admin'

import bootstrap from '../vendor/rails_material_admin/js/bootstrap.min'
window.bootstrap = bootstrap

import Swal from '../vendor/rails_material_admin/js/sweetalert2.min'
window.Swal = Swal

import '../src/javascripts/lib/utils_datatables.js'
import '../src/javascripts/admin/common/scaffold.js'

Rails.start()
Turbolinks.start()

const application = Application.start()
// const context = require.context("../src/javascripts/admin/controllers/", true, /\.js$/)

// application.load(definitionsFromContext(context))
