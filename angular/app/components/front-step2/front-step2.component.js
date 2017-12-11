class FrontStep2Controller {
  constructor ($location, $rootScope, $scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
	  this.$rootScope = $rootScope
    this.$location = $location
    this.mainService = this.$rootScope.currentMainService
    this.car = this.$rootScope.whatCar
    this.selectedSubServiceIndex = 0

    this.$location.hash('step2-top');
  }
	
  $onInit () {
    if (this.$rootScope.currentMainService == undefined) {
      this.$state.go('front.home');
      return;
    }

    this.freeServices = this.$rootScope.freeServices;

    if (this.freeServices == undefined)
      this.freeServices = [];

    if (this.$rootScope.optionServices == undefined)
      this.$rootScope.optionServices = [];

    this.optionServices = this.$rootScope.optionServices;

    let serviceId = this.mainService.id;

    this.API.all('services').get('subservices', {serviceId}).then((response) => {
      this.sub_services =  response.plain().sub_services;

      if (this.$rootScope.services == undefined)
        this.$rootScope.services = [];

      if (this.sub_services != undefined) {
        for (let i = 0; i < this.sub_services.length; i++) {
          let flag = 0;
          for (let j = 0; j < this.$rootScope.services.length; j++) {
            if (this.$rootScope.services[j].id == this.sub_services[i].id) {
              flag = 1;
              break;
            } 
          }
          this.sub_services[i].added = flag;
        }

        if (this.sub_services.length > 0)
          this.selectedSubService = this.sub_services[this.selectedSubServiceIndex];
      } else {
        this.selectedSubService = undefined;
      }
      
      this.price = 0;
      for (let j = 0; j < this.$rootScope.services.length; j++) {
        if (this.$rootScope.services[j].added == 1)
          this.price += this.$rootScope.services[j].price;        
      }

      for (let i = 0; i < this.$rootScope.optionServices.length; i++) {
        if (this.$rootScope.optionServices[i].added == 1)
          this.price += this.$rootScope.optionServices[i].price;
      }

      this.totalPrice = this.price;
      this.agencyPrice = this.price + parseInt(this.price * 40 / 100);
      this.save = this.agencyPrice - this.totalPrice;

      this.services = this.$rootScope.services;
    })

    document.getElementById('mobile_menu').style.display = 'none';
    document.getElementById('toggle_menu_bg').style.display = 'none';
  }

  goBack(){
    this.$state.go('front.step1');
  }

  onSelectSubService(subServiceId, index) {
    this.selectedSubServiceIndex = index
    this.selectedSubService = this.sub_services[index];
  }

  addSubService(isAdded) {
    if (isAdded == 1) { // added
      this.selectedSubService.added = 0;
      this.sub_services[this.selectedSubServiceIndex].added = 0;
      for (let i = 0; i < this.$rootScope.services.length; i++) {
        if (this.$rootScope.services[i].id == this.selectedSubService.id) {
          this.price -= this.$rootScope.services[i].price;
          this.$rootScope.services.splice(i, 1);
          break;
        }
      }
      
      this.services = this.$rootScope.services;

      this.totalPrice = this.price;
      this.agencyPrice = this.price + parseInt(this.price * 40 / 100);
      this.save = this.agencyPrice - this.totalPrice;
    } else { // not added
      this.selectedSubService.added = 1;
      this.sub_services[this.selectedSubServiceIndex].added = 1;

      this.$rootScope.services[this.$rootScope.services.length] = this.selectedSubService;

      this.services = this.$rootScope.services;

      this.price += this.selectedSubService.price;
      this.totalPrice = this.price;
      this.agencyPrice = this.price + parseInt(this.price * 40 / 100);
      this.save = this.agencyPrice - this.totalPrice;
    }
  }

  toggleSubService(service) {
    if (service.added == 1) { // added
      if (this.selectedSubService != undefined) {
        if (service.id == this.selectedSubService.id) {
          this.selectedSubService.added = 0;
          this.sub_services[this.selectedSubServiceIndex].added = 0;
        } else {
          for (let i = 0; i < this.sub_services.length; i++) {
            if (this.sub_services[i].id == service.id) {
              this.sub_services[i].added = 0;
            }
          }
        }
      }

      for (let i = 0; i < this.$rootScope.services.length; i++) {
        if (this.$rootScope.services[i].id == service.id) {
          this.price -= this.$rootScope.services[i].price;
          this.$rootScope.services[i].added = 0;
          //this.$rootScope.services.splice(i, 1);
          break;
        }
      }
      
      this.services = this.$rootScope.services;

      this.totalPrice = this.price;
      this.agencyPrice = this.price + parseInt(this.price * 40 / 100);
      this.save = this.agencyPrice - this.totalPrice;
    } else { // not added
      if (service.id == this.selectedSubService.id) {
        this.selectedSubService.added = 1;
        this.sub_services[this.selectedSubServiceIndex].added = 1;
      } else {
        for (let i = 0; i < this.sub_services.length; i++) {
          if (this.sub_services[i].id == service.id) {
            this.sub_services[i].added = 1;
          }
        }
      }
      
      for (let i = 0; i < this.$rootScope.services.length; i++) {
        if (this.$rootScope.services[i].id == service.id) {
          this.price += this.$rootScope.services[i].price;
          this.$rootScope.services[i].added = 1;
          break;
        }
      }

      this.services = this.$rootScope.services;

      this.totalPrice = this.price;
      this.agencyPrice = this.price + parseInt(this.price * 40 / 100);
      this.save = this.agencyPrice - this.totalPrice;
    }
  }

  toggleOptionService(service) {
    if (service.added == 1) { // added
      for (let i = 0; i < this.$rootScope.optionServices.length; i++) {
        if (this.$rootScope.optionServices[i].id == service.id) {
          this.price -= this.$rootScope.optionServices[i].price;
          this.$rootScope.optionServices[i].added = 0;
        }
      }

      this.totalPrice = this.price;
      this.optionServices = this.$rootScope.optionServices;

      this.agencyPrice = this.price + parseInt(this.price * 40 / 100);
      this.save = this.agencyPrice - this.totalPrice;
    } else {
      for (let i = 0; i < this.$rootScope.optionServices.length; i++) {
        if (this.$rootScope.optionServices[i].id == service.id) {
          this.price += this.$rootScope.optionServices[i].price;
          this.$rootScope.optionServices[i].added = 1;
        }
      }

      this.totalPrice = this.price;
      this.optionServices = this.$rootScope.optionServices;

      this.agencyPrice = this.price + parseInt(this.price * 40 / 100);
      this.save = this.agencyPrice - this.totalPrice;
    }
    
  }
}

export const FrontStep2Component = {
  templateUrl: './views/app/components/front-step2/front-step2.component.html',
  controller: FrontStep2Controller,
  controllerAs: 'vm',
  bindings: {}
}
