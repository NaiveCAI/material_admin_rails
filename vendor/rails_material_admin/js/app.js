'use strict'

function msg_receive(a) {
  var e = new Date()
  return (
    "<li class='msg_receive'><div class='chat-content'><div class='box bg-light-info'>" +
    a +
    "</div></div><div class='chat-time'>" +
    e.getHours() +
    ':' +
    e.getMinutes() +
    '</div></li>'
  )
}

function msg_sent(a) {
  var e = new Date()
  return (
    "<li class='odd msg_sent'><div class='chat-content'><div class='box bg-light-info'>" +
    a +
    "</div><br></div><div class='chat-time'>" +
    e.getHours() +
    ':' +
    e.getMinutes() +
    '</div></li>'
  )
}

$.fn.AdminSettings = function (t) {
  var miniSidebarToggled = localStorage.getItem('miniSidebarToggled')

  var i = this.attr('id'),
    a =
      ((t = $.extend(
        {},
        {
          Theme: !0,
          Layout: 'vertical',
          LogoBg: 'skin1',
          NavbarBg: 'skin6',
          SidebarType: 'full',
          SidebarColor: 'skin1',
          SidebarPosition: !1,
          HeaderPosition: !1,
          BoxedLayout: !1
        },
        t
      )),
      {
        AdminSettingsInit: function () {
          a.ManageTheme(),
            a.ManageThemeLayout(),
            a.ManageThemeBackground(),
            a.ManageSidebarType(),
            a.ManageSidebarColor(),
            a.ManageSidebarPosition(),
            a.ManageBoxedLayout()
        },
        ManageTheme: function () {
          var a = t.Theme
          switch (t.Layout) {
            case 'vertical':
              1 == a
                ? ($('body').attr('data-theme', 'dark'), $('#theme-view').prop('checked', !0))
                : ($('#' + i).attr('data-theme', 'light'), $('body').prop('checked', !1))
          }
        },
        ManageThemeLayout: function () {
          switch (t.Layout) {
            case 'horizontal':
              $('#' + i).attr('data-layout', 'horizontal')
              var a = function () {
                ;(0 < window.innerWidth ? window.innerWidth : this.screen.width) < 768
                  ? $('.scroll-sidebar').perfectScrollbar({})
                  : $('.scroll-sidebar').perfectScrollbar('destroy')
              }
              $(window).ready(a), $(window).on('resize', a)
              break
            case 'vertical':
              $('#' + i).attr('data-layout', 'vertical'), $('.scroll-sidebar').perfectScrollbar({})
          }
        },
        ManageThemeBackground: function () {
          var a, e
          null != (a = t.LogoBg) && '' != a
            ? $('#' + i + ' .topbar .top-navbar .navbar-header').attr('data-logobg', a)
            : $('#' + i + ' .topbar .top-navbar .navbar-header').attr('data-logobg', 'skin1'),
            null != (e = t.NavbarBg) && '' != e
              ? ($('#' + i + ' .topbar .navbar-collapse').attr('data-navbarbg', e),
                $('#' + i + ' .topbar').attr('data-navbarbg', e),
                $('#' + i).attr('data-navbarbg', e))
              : ($('#' + i + ' .topbar .navbar-collapse').attr('data-navbarbg', 'skin1'),
                $('#' + i + ' .topbar').attr('data-navbarbg', 'skin1'),
                $('#' + i).attr('data-navbarbg', 'skin1'))
        },
        ManageSidebarType: function () {
          switch (t.SidebarType) {
            case 'full':
              $('#' + i).attr('data-sidebartype', 'full')

              if (!miniSidebarToggled || miniSidebarToggled === 'false') {
                $('#main-wrapper').attr('data-sidebartype', 'mini-sidebar')
                $('#main-wrapper').addClass('mini-sidebar')
              } else {
                $('#main-wrapper').attr('data-sidebartype', 'full')
                $('#main-wrapper').removeClass('mini-sidebar')
              }

              $('.sidebartoggler').on('click', function () {
                if (!miniSidebarToggled || miniSidebarToggled === 'false') {
                  localStorage.setItem('miniSidebarToggled', 'true')
                } else {
                  localStorage.setItem('miniSidebarToggled', 'false')
                }

                $('#main-wrapper').toggleClass('mini-sidebar'),
                  $('#main-wrapper').hasClass('mini-sidebar')
                    ? ($('.sidebartoggler').prop('checked', !0),
                      $('#main-wrapper').attr('data-sidebartype', 'mini-sidebar'))
                    : ($('.sidebartoggler').prop('checked', !1), $('#main-wrapper').attr('data-sidebartype', 'full'))
              })
              break
            case 'mini-sidebar':
              $('#' + i).attr('data-sidebartype', 'mini-sidebar'),
                $('.sidebartoggler').on('click', function () {
                  $('#main-wrapper').toggleClass('mini-sidebar'),
                    $('#main-wrapper').hasClass('mini-sidebar')
                      ? ($('.sidebartoggler').prop('checked', !0), $('#main-wrapper').attr('data-sidebartype', 'full'))
                      : ($('.sidebartoggler').prop('checked', !1),
                        $('#main-wrapper').attr('data-sidebartype', 'mini-sidebar'))
                })
              break
            case 'iconbar':
              $('#' + i).attr('data-sidebartype', 'iconbar')
              a = function () {
                ;(0 < window.innerWidth ? window.innerWidth : this.screen.width) < 1170
                  ? ($('#main-wrapper').attr('data-sidebartype', 'mini-sidebar'),
                    $('#main-wrapper').addClass('mini-sidebar'))
                  : ($('#main-wrapper').attr('data-sidebartype', 'iconbar'),
                    $('#main-wrapper').removeClass('mini-sidebar'))
              }
              $(window).ready(a),
                $(window).on('resize', a),
                $('.sidebartoggler').on('click', function () {
                  $('#main-wrapper').toggleClass('mini-sidebar'),
                    $('#main-wrapper').hasClass('mini-sidebar')
                      ? ($('.sidebartoggler').prop('checked', !0),
                        $('#main-wrapper').attr('data-sidebartype', 'mini-sidebar'))
                      : ($('.sidebartoggler').prop('checked', !1),
                        $('#main-wrapper').attr('data-sidebartype', 'iconbar'))
                })
              break
            case 'overlay':
              $('#' + i).attr('data-sidebartype', 'overlay')
              a = function () {
                ;(0 < window.innerWidth ? window.innerWidth : this.screen.width) < 767
                  ? ($('#main-wrapper').attr('data-sidebartype', 'mini-sidebar'),
                    $('#main-wrapper').addClass('mini-sidebar'))
                  : ($('#main-wrapper').attr('data-sidebartype', 'overlay'),
                    $('#main-wrapper').removeClass('mini-sidebar'))
              }
              $(window).ready(a),
                $(window).on('resize', a),
                $('.sidebartoggler').on('click', function () {
                  $('#main-wrapper').toggleClass('show-sidebar'), $('#main-wrapper').hasClass('show-sidebar')
                })
          }
        },
        ManageSidebarColor: function () {
          var a
          null != (a = t.SidebarColor) && '' != a
            ? $('#' + i + ' .left-sidebar').attr('data-sidebarbg', a)
            : $('#' + i + ' .left-sidebar').attr('data-sidebarbg', 'skin1')
        },
        ManageSidebarPosition: function () {
          var a = t.SidebarPosition,
            e = t.HeaderPosition
          switch (t.Layout) {
            case 'vertical':
            case 'horizontal':
              1 == a
                ? ($('#' + i).attr('data-sidebar-position', 'fixed'), $('#sidebar-position').prop('checked', !0))
                : ($('#' + i).attr('data-sidebar-position', 'absolute'), $('#sidebar-position').prop('checked', !1)),
                1 == e
                  ? ($('#' + i).attr('data-header-position', 'fixed'), $('#header-position').prop('checked', !0))
                  : ($('#' + i).attr('data-header-position', 'relative'), $('#header-position').prop('checked', !1))
          }
        },
        ManageBoxedLayout: function () {
          var a = t.BoxedLayout
          switch (t.Layout) {
            case 'vertical':
            case 'horizontal':
              1 == a
                ? ($('#' + i).attr('data-boxed-layout', 'boxed'), $('#boxed-layout').prop('checked', !0))
                : ($('#' + i).attr('data-boxed-layout', 'full'), $('#boxed-layout').prop('checked', !1))
          }
        }
      })
  a.AdminSettingsInit()
}

$(document).on('turbolinks:load', function () {
  $('#chat')
  $('#chat .message-center a').on('click', function () {
    var a = $(this).find('.mail-contnet h5').text(),
      e = $(this).find('.user-img img').attr('src'),
      t = $(this).attr('data-user-id'),
      i = $(this).find('.profile-status').attr('data-status')
    if ($(this).hasClass('active')) $(this).toggleClass('active'), $('.chat-windows #user-chat' + t).hide()
    else if (($(this).toggleClass('active'), $('.chat-windows #user-chat' + t).length))
      $('.chat-windows #user-chat' + t)
        .removeClass('mini-chat')
        .show()
    else {
      var r = msg_receive('I watched the storm, so beautiful yet terrific.'),
        s = "<div class='user-chat' id='user-chat" + t + "' data-user-id='" + t + "'>"
      ;(s +=
        "<div class='chat-head'><img src='" +
        e +
        "' data-user-id='" +
        t +
        "'><span class='status " +
        i +
        "'></span><span class='name'>" +
        a +
        "</span><span class='opts'><i class='ti-close closeit' data-user-id='" +
        t +
        "'></i><i class='ti-minus mini-chat' data-user-id='" +
        t +
        "'></i></span></div>"),
        (s +=
          "<div class='chat-body'><ul class='chat-list'>" +
          (r += msg_sent('That is very deep indeed!')) +
          '</ul></div>'),
        (s +=
          "<div class='chat-footer'><input type='text' data-user-id='" +
          t +
          "' placeholder='Type & Enter' class='form-control'></div>"),
        (s += '</div>'),
        $('.chat-windows').append(s)
    }
  }),
    $(document).on('click', '.chat-windows .user-chat .chat-head .closeit', function (a) {
      var e = $(this).attr('data-user-id')
      $('.chat-windows #user-chat' + e).hide(),
        $('#chat .message-center .user-info#chat_user_' + e).removeClass('active')
    }),
    $(document).on(
      'click',
      '.chat-windows .user-chat .chat-head img, .chat-windows .user-chat .chat-head .mini-chat',
      function (a) {
        var e = $(this).attr('data-user-id')
        $('.chat-windows #user-chat' + e).hasClass('mini-chat')
          ? $('.chat-windows #user-chat' + e).removeClass('mini-chat')
          : $('.chat-windows #user-chat' + e).addClass('mini-chat')
      }
    ),
    $(document).on('keypress', '.chat-windows .user-chat .chat-footer input', function (a) {
      if (13 == a.keyCode) {
        var e = $(this).attr('data-user-id'),
          t = $(this).val()
        ;(t = msg_sent(t)),
          $('.chat-windows #user-chat' + e + ' .chat-body .chat-list').append(t),
          $(this).val(''),
          $(this).focus()
      }
      $('.chat-windows #user-chat' + e + ' .chat-body').perfectScrollbar({
        suppressScrollX: !0
      })
    }),
    $('.page-wrapper').on('click', function (a) {
      $('.chat-windows').addClass('hide-chat'), $('.chat-windows').removeClass('show-chat')
    }),
    $('.service-panel-toggle').on('click', function (a) {
      $('.chat-windows').addClass('show-chat'), $('.chat-windows').removeClass('hide-chat')
    })
})

$(document).on('turbolinks:load', function () {
  $('#main-wrapper').AdminSettings({
    Theme: false, // this can be true or false ( true means dark and false means light ),
    Layout: 'vertical',
    LogoBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
    NavbarBg: 'skin1', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
    SidebarType: 'full', // You can change it full / mini-sidebar / iconbar / overlay
    SidebarColor: 'skin6', // You can change the Value to be skin1/skin2/skin3/skin4/skin5/skin6
    SidebarPosition: true, // it can be true / false ( true means Fixed and false means absolute )
    HeaderPosition: true, // it can be true / false ( true means Fixed and false means absolute )
    BoxedLayout: false // it can be true / false ( true means Boxed and false means Fluid )
  })
})

$(document).on('turbolinks:load', function () {
  //****************************
  /* Left header Theme Change function Start */
  //****************************
  function handlelogobg() {
    $('.theme-color .theme-item .theme-link').on('click', function () {
      var logobgskin = $(this).attr('data-logobg')
      $('.topbar .top-navbar .navbar-header').attr('data-logobg', logobgskin)
    })
  }
  handlelogobg()
  //****************************
  /* Top navbar Theme Change function Start */
  //****************************
  function handlenavbarbg() {
    if ($('#main-wrapper').attr('data-navbarbg') == 'skin6') {
      // do this
      $('.topbar .navbar').addClass('navbar-light')
      $('.topbar .navbar').removeClass('navbar-dark')
    } else {
      // do that
    }
    $('.theme-color .theme-item .theme-link').on('click', function () {
      var navbarbgskin = $(this).attr('data-navbarbg')
      $('#main-wrapper').attr('data-navbarbg', navbarbgskin)
      $('.topbar .navbar-collapse').attr('data-navbarbg', navbarbgskin)
      if ($('#main-wrapper').attr('data-navbarbg') == 'skin6') {
        // do this
        $('.topbar .navbar').addClass('navbar-light')
        $('.topbar .navbar').removeClass('navbar-dark')
      } else {
        // do that
        $('.topbar .navbar').removeClass('navbar-light')
        $('.topbar .navbar').addClass('navbar-dark')
      }
    })
  }

  handlenavbarbg()

  //****************************
  // ManageSidebar Type
  //****************************
  function handlesidebartype() {}
  handlesidebartype()

  //****************************
  /* Manage sidebar bg color */
  //****************************
  function handlesidebarbg() {
    $('.theme-color .theme-item .theme-link').on('click', function () {
      var sidebarbgskin = $(this).attr('data-sidebarbg')
      $('.left-sidebar').attr('data-sidebarbg', sidebarbgskin)
    })
  }
  handlesidebarbg()
  //****************************
  /* sidebar position */
  //****************************
  function handlesidebarposition() {
    $('#sidebar-position').change(function () {
      if ($(this).is(':checked')) {
        $('#main-wrapper').attr('data-sidebar-position', 'fixed')
        $('.topbar .top-navbar .navbar-header').attr('data-navheader', 'fixed')
      } else {
        $('#main-wrapper').attr('data-sidebar-position', 'absolute')
        $('.topbar .top-navbar .navbar-header').attr('data-navheader', 'relative')
      }
    })
  }
  handlesidebarposition()
  //****************************
  /* Header position */
  //****************************
  function handleheaderposition() {
    $('#header-position').change(function () {
      if ($(this).is(':checked')) {
        $('#main-wrapper').attr('data-header-position', 'fixed')
      } else {
        $('#main-wrapper').attr('data-header-position', 'relative')
      }
    })
  }
  handleheaderposition()
  //****************************
  /* sidebar position */
  //****************************
  function handleboxedlayout() {
    $('#boxed-layout').change(function () {
      if ($(this).is(':checked')) {
        $('#main-wrapper').attr('data-boxed-layout', 'boxed')
      } else {
        $('#main-wrapper').attr('data-boxed-layout', 'full')
      }
    })
  }
  handleboxedlayout()
  //****************************
  /* Header position */
  //****************************
  function handlethemeview() {
    $('#theme-view').change(function () {
      if ($(this).is(':checked')) {
        $('body').attr('data-theme', 'dark')
      } else {
        $('body').attr('data-theme', 'light')
      }
    })
  }
  handlethemeview()
})
