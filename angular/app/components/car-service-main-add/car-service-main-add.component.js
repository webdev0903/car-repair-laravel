class CarServiceMainAddController {
  constructor (API, $state, $stateParams) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
  }
	
  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    
    if (isValid) {
      	let data = {
	      name: this.service
	    }
	    
	    let $state = this.$state
	
	    this.API.all('services/add_main_service').post(data).then(() => {
	      let alert = { type: 'success', 'title': 'Success!', msg: 'Main Service has been added.' }
	      
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
}

export const CarServiceMainAddComponent = {
  templateUrl: './views/app/components/car-service-main-add/car-service-main-add.component.html',
  controller: CarServiceMainAddController,
  controllerAs: 'vm',
  bindings: {}
}
