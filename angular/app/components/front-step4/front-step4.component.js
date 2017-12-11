class FrontStep4Controller {
  constructor ($location, $rootScope, $scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
    this.$rootScope = $rootScope
    this.$location = $location
    
    this.optionalServices = this.$rootScope.optionAllServices;
    this.services = this.$rootScope.optionServices;

    this.$location.hash('step4-top');
  }
	
  $onInit () {
    if (this.$rootScope.whatCar == undefined) {
      this.$state.go('front.home');
      return;
    }

    document.getElementById('mobile_menu').style.display = 'none';
    document.getElementById('toggle_menu_bg').style.display = 'none';

    for (let i = 0; i < this.optionalServices.length; i++) {
      let selected = 0;
      for (let j = 0; j < this.services.length; j++) {
        if (this.optionalServices[i].id == this.services[j].id) {
          selected = 1;
          break;
        }
      }

      this.optionalServices[i].selected = selected;
    }
  }

  onSelectService (service) {
    service.selected = service.selected == 1 ? 0 : 1;

    if (service.selected == 1) { // added
      service.added = 1;
      this.$rootScope.optionServices[this.$rootScope.optionServices.length] = service;

      this.services = this.$rootScope.optionServices;
    } else { // removed
      for (let i = 0; i < this.$rootScope.optionServices.length; i++) {
        if (this.$rootScope.optionServices[i].id == service.id) {
          this.$rootScope.optionServices.splice(i, 1);
        }
      }

      this.services = this.$rootScope.optionServices;
    }
  }
}

export const FrontStep4Component = {
  templateUrl: './views/app/components/front-step4/front-step4.component.html',
  controller: FrontStep4Controller,
  controllerAs: 'vm',
  bindings: {}
}
