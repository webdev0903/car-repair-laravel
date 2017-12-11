class FrontHomeController {
  constructor ($rootScope, $location, $scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
	  this.$rootScope = $rootScope
    this.$location = $location

    this.$rootScope.whatCar = {'make': '', 'year': 2017, 'model': '', 'trim': ''};
    this.$rootScope.services = [];
    this.$rootScope.optionServices = [];
    this.$rootScope.optionAllServices = [];
    this.$rootScope.appointmentDate = "";
    this.$rootScope.appointmentTimes = [];

    this.formSubmitted = false

    this.API.all('services').get('availablemainservices').then((response) => {
      this.$rootScope.main_services =  response.plain().main_services;
      this.main_services = this.$rootScope.main_services
    })

    this.API.all('services').get('allfreeservices').then((response) => {
      this.$rootScope.freeServices =  response.plain().option_services;
      if (this.$rootScope.freeServices == undefined)
        this.$rootScope.freeServices = [];
    })

    this.API.all('services').get('onlyoptionservices').then((response) => {
      this.$rootScope.optionAllServices =  response.plain().option_services;
      
      if (this.$rootScope.optionAllServices == undefined)
        this.$rootScope.optionAllServices = [];
    })

    /*this.$rootScope.$on('$stateChangeSuccess', function() {
    }); */
  }
	
  $onInit () {
    document.getElementById('mobile_menu').style.display = 'none';
  }

  toWhatCar () {
    this.$location.hash('top');
    this.$state.go('front.whatcar');
  }

  contact(isValid) {
    if(isValid){
      let data = {
        name: this.contact_name,
        email: this.contact_email,
        number: this.contact_number
      }

      let $state = this.$state
      
      this.API.all('appointments/contact').post(data).then((res) => {
        swal({
          title: 'Thank you!',
          text: 'We will call you back.',
          type: 'success',
          confirmButtonText: 'OK',
          closeOnConfirm: true
        }, function () {
          $state.reload()
        })
      }, (res) => {
        $state.reload()
      })
    }else{
      this.formSubmitted = true
    }
  }
}

export const FrontHomeComponent = {
  templateUrl: './views/app/components/front-home/front-home.component.html',
  controller: FrontHomeController,
  controllerAs: 'vm',
  bindings: {}
}
