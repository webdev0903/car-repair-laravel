class FrontWhatCarController {
  constructor ($stateParams, $location, $rootScope, $scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
    this.$rootScope = $rootScope
    this.$location = $location
	  this.yearList = []
    this.selectedYear = 2017
    this.selectedMake = ''
    this.selectedModel = ''
    this.selectedTrim = ''
    this.isMakeRequired = false
    this.isModelRequired = false
    this.isTrimRequired = false

    this.$location.hash('what-top');
  }
	
  $onInit () {
    if (this.$rootScope.whatCar != undefined) {
      this.selectedYear = this.$rootScope.whatCar.year;
      this.selectedMake = this.$rootScope.whatCar.make;
      this.selectedModel = this.$rootScope.whatCar.model;
      this.selectedTrim = this.$rootScope.whatCar.trim;
    } else {
      this.$state.go('front.home');
      return;
    }

    document.getElementById('mobile_menu').style.display = 'none';
    document.getElementById('toggle_menu_bg').style.display = 'none';
    let index = 0;
    for (let i = 1980; i <= 2017; i++) {
      this.yearList[index++] = i;
    }
  }

  onContinue() {
    if (this.selectedMake == '') {
      this.isMakeRequired = true;
      return;
    }
    if (this.selectedModel == '') {
      this.isModelRequired = true;
      return;
    }
    if (this.selectedTrim == '') {
      this.isTrimRequired = true;
      return;
    }
    this.$rootScope.whatCar.year = this.selectedYear;
    this.$rootScope.whatCar.make = this.selectedMake;
    this.$rootScope.whatCar.model = this.selectedModel;
    this.$rootScope.whatCar.trim = this.selectedTrim;

    this.$state.go('front.step1');
  }

  onChangeInput() {
    this.isMakeRequired = false;
    this.isModelRequired = false;
    this.isTrimRequired = false;
  }
}

export const FrontWhatCarComponent = {
  templateUrl: './views/app/components/front-what-car/front-what-car.component.html',
  controller: FrontWhatCarController,
  controllerAs: 'vm',
  bindings: {}
}
