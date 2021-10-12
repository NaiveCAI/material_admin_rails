import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'

import Rails from '@rails/ujs'
import Turbolinks from 'turbolinks'

import 'datatables.net'
import 'datatables.net-responsive-bs5'
import 'select2'

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
