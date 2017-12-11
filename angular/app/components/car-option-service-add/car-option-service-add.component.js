class CarOptionServiceAddController {
  constructor (API, $state, $stateParams) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    this.type = 1;
  }
	
  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    
    if (isValid) {
      if (this.type == 2) 
        this.price = 0;
      
      let data = { 
          name: this.service,
          price: this.price,
          description: this.description,
          type: this.type
      }
      
      let $state = this.$state
  
      this.API.all('services/add_option_service').post(data).then(() => {
        let alert = { type: 'success', 'title': 'Success!', msg: 'Option Service has been added.' }
        
        this.alerts.push(alert);
        
        $state.go($state.current)
      }, (res) => {
        let alrtArr = []
  
        angular.forEach(res.data.errors, function (value) {
          alrtArr = {type: 'error', 'title': 'Error!', msg: value[0]}
        })
  
        this.alerts.push(alrtArr)
      })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}

  toggleChange() {
    if (this.type == 2) {
      document.getElementById('toggle').src = "img/assets/toggle_off.png";
      this.type = 1;
    } else {
      document.getElementById('toggle').src = "img/assets/toggle_on.png";
      this.type = 2;
      this.price = 0;
    }
  }
}

export const CarOptionServiceAddComponent = {
  templateUrl: './views/app/components/car-option-service-add/car-option-service-add.component.html',
  controller: CarOptionServiceAddController,
  controllerAs: 'vm',
  bindings: {}
}
