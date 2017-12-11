export function RoutesConfig ($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/layout/${layout}.page.html`
  }

  var getFrontLayout = (layout) => {
    return `./views/app/pages/front-layout/${layout}.page.html`
  }

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('special', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('layout')
        },
        'header@special': {},
        'footer@special': {},
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('layout')
        },
        'header@app': {
          templateUrl: getView('header')
        },
        'footer@app': {
          templateUrl: getView('footer')
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('app.landing', {
      url: '/admin',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-appointment-lists></car-appointment-lists>'
        }
      }
    })
    .state('app.tablessimple', {
      url: '/tables-simple',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<tables-simple></tables-simple>'
        }
      }
    })
    .state('app.uiicons', {
      url: '/ui-icons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-icons></ui-icons>'
        }
      }
    })
    .state('app.uimodal', {
      url: '/ui-modal',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-modal></ui-modal>'
        }
      }
    })
    .state('app.uitimeline', {
      url: '/ui-timeline',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-timeline></ui-timeline>'
        }
      }
    })
    .state('app.uibuttons', {
      url: '/ui-buttons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-buttons></ui-buttons>'
        }
      }
    })
    .state('app.uigeneral', {
      url: '/ui-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-general></ui-general>'
        }
      }
    })
    .state('app.formsgeneral', {
      url: '/forms-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<forms-general></forms-general>'
        }
      }
    })
    .state('app.chartjs', {
      url: '/charts-chartjs',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<charts-chartjs></charts-chartjs>'
        }
      }
    })
    .state('app.comingsoon', {
      url: '/comingsoon',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<coming-soon></coming-soon>'
        }
      }
    })
    .state('app.profile', {
      url: '/admin/profile',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-profile></user-profile>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.carcustomerlists', {
      url: '/admin/car-customer-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-customer-lists></car-customer-lists>'
        }
      }
    })
    .state('app.carcustomerappointments', {
      url: '/admin/car-customer-appointments/:customerId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-customer-appointments></car-customer-appointments>'
        }
      }
    })
    .state('app.caradvisorlists', {
      url: '/admin/car-advisor-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-advisor-lists></car-advisor-lists>'
        }
      }
    })
    .state('app.caradvisorappointments', {
      url: '/admin/car-advisor-appointments/:advisorId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-advisor-appointments></car-advisor-appointments>'
        }
      }
    })
    .state('app.carappointmentlists', {
      url: '/admin/car-appointment-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-appointment-lists></car-appointment-lists>'
        }
      }
    })
    .state('app.carappointmentdetail', {
      url: '/admin/car-appointment-detail/:appointmentId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-appointment-detail></car-appointment-detail>'
        }
      }
    })
    .state('app.carappointmentreport', {
      url: '/admin/car-appointment-report/:appointmentId',
      data: {
        auth: true,
        bodyClass: 'hold-transition sidebar-collapse'
      },
      views: {
        'main@app': {
          template: '<car-appointment-report></car-appointment-report>'
        }
      }
    })
    .state('app.carservicelists', {
      url: '/admin/car-service-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-service-lists></car-service-lists>'
        }
      }
    })
    .state('app.carservicemainadd', {
      url: '/admin/car-service-main-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-service-main-add></car-service-main-add>'
        }
      }
    })
    .state('app.carservicemainedit', {
      url: '/admin/car-service-main-edit/:serviceId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-service-main-edit></car-service-main-edit>'
        }
      }
    })
    .state('app.caroptionservicelists', {
      url: '/admin/car-option-service-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-option-service-lists></car-option-service-lists>'
        }
      }
    })
    .state('app.caroptionserviceadd', {
      url: '/admin/car-option-service-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-option-service-add></car-option-service-add>'
        }
      }
    })
    .state('app.caroptionserviceedit', {
      url: '/admin/car-option-service-edit/:serviceId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-option-service-edit></car-option-service-edit>'
        }
      }
    })
    .state('app.carservicesubadd', {
      url: '/admin/car-service-sub-add/:serviceId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-service-sub-add></car-service-sub-add>'
        }
      }
    })
    .state('app.carservicesubedit', {
      url: '/admin/car-service-sub-edit/:serviceId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<car-service-sub-edit></car-service-sub-edit>'
        }
      }
    })
    .state('app.userlist', {
      url: '/user-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-lists></user-lists>'
        }
      }
    })
    .state('app.useredit', {
      url: '/user-edit/:userId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-edit></user-edit>'
        }
      },
      params: {
        alerts: null,
        userId: null
      }
    })
    .state('app.userroles', {
      url: '/user-roles',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles></user-roles>'
        }
      }
    })
    .state('app.userpermissions', {
      url: '/user-permissions',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions></user-permissions>'
        }
      }
    })
    .state('app.userpermissionsadd', {
      url: '/user-permissions-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-add></user-permissions-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userpermissionsedit', {
      url: '/user-permissions-edit/:permissionId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-edit></user-permissions-edit>'
        }
      },
      params: {
        alerts: null,
        permissionId: null
      }
    })
    .state('app.userrolesadd', {
      url: '/user-roles-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-add></user-roles-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userrolesedit', {
      url: '/user-roles-edit/:roleId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-edit></user-roles-edit>'
        }
      },
      params: {
        alerts: null,
        roleId: null
      }
    })
    .state('app.widgets', {
      url: '/widgets',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<widgets></widgets>'
        }
      }
    })
    .state('login', {
      url: '/admin/login',
      views: {
        'layout': {
          templateUrl: getView('login')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
    .state('loginloader', {
      url: '/login-loader',
      views: {
        'layout': {
          templateUrl: getView('login-loader')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('register', {
      url: '/register',
      views: {
        'layout': {
          templateUrl: getView('register')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition register-page'
      }
    })
    .state('userverification', {
      url: '/userverification/:status',
      views: {
        'layout': {
          templateUrl: getView('user-verification')
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        status: null
      }
    })
    .state('forgot_password', {
      url: '/forgot-password',
      views: {
        'layout': {
          templateUrl: getView('forgot-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('reset_password', {
      url: '/reset-password/:email/:token',
      views: {
        'layout': {
          templateUrl: getView('reset-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function ($rootScope, $scope, $auth, $state, AclService) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
              $state.go('login')
            })
          }
        }
      }
    })
    .state('front', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getFrontLayout('front-layout')
        },
        'header@front': {
          templateUrl: getView('front-header')
        },
        'footer@front': {
          templateUrl: getView('front-footer')
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue'
      }
    })
    .state('app.carappointmentaccept', {
      url: '/admin/car-appointment-accept/:appointmentId',
      data: {
        auth: true,
        bodyClass: 'hold-transition sidebar-collapse'
      },
      views: {
        'main@app': {
          template: '<car-appointment-accept></car-appointment-accept>'
        }
      }
    })
    .state('special.acceptform', {
      url: '/accept-form/:formId',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@special': {
          template: '<front-accept-form></front-accept-form>'
        }
      }
    })
    .state('special.reportform', {
      url: '/report-form/:reportId',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@special': {
          template: '<front-report-form></front-report-form>'
        }
      }
    })
    .state('front.home', {
      url: '/',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@front': {
          template: '<front-home></front-home>'
        }
      }
    })
    .state('front.whatcar', {
      url: '/whatcar',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@front': {
          template: '<front-what-car></front-what-car>'
        }
      }
    })
    .state('front.step1', {
      url: '/step1',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@front': {
          template: '<front-step1></front-step1>'
        }
      }
    })

    .state('front.step2', {
      url: '/step2',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@front': {
          template: '<front-step2></front-step2>'
        }
      }
    })

    .state('front.step3', {
      url: '/step3',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@front': {
          template: '<front-step3></front-step3>'
        }
      }
    })

    .state('front.step4', {
      url: '/step4',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@front': {
          template: '<front-step4></front-step4>'
        }
      }
    })

    .state('front.step5', {
      url: '/step5',
      data: {
        bodyClass: 'hold-transition login-page sidebar-collapse'
      },
      views: {
        'main@front': {
          template: '<front-step5></front-step5>'
        }
      }
    })
}
