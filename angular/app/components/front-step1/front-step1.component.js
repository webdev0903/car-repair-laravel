class FrontStep1Controller {
  constructor ($location, $rootScope, $scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
	  this.$rootScope = $rootScope
    this.$location = $location
    this.main_services = this.$rootScope.main_services

    this.$location.hash('step1-top');
  }
	
  $onInit () {
    if (this.$rootScope.main_services == undefined) {
      this.$state.go('front.home');
      return;
    }
    document.getElementById('mobile_menu').style.display = 'none';
    document.getElementById('toggle_menu_bg').style.display = 'none';
  }

  onNext(serviceId, title, imageUrl) {
    this.$rootScope.currentMainService = {'id': serviceId, 'title' : title, 'image_url': imageUrl};

    this.$state.go('front.step2');
  }
}

export const FrontStep1Component = {
  templateUrl: './views/app/components/front-step1/front-step1.component.html',
  controller: FrontStep1Controller,
  controllerAs: 'vm',
  bindings: {}
}
