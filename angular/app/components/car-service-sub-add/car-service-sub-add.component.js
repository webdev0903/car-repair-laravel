class CarServiceSubAddController {
  constructor (API, $state, $stateParams) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.alerts = []
	this.serviceId = $stateParams.serviceId
		
	if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
  }
	
  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    
    if (isValid) {
    	let data = {
      		parentId:this.serviceId,	
	    	name: this.service,
	      	price: this.price,
	      	description: this.description
	    }
	    
	    let $state = this.$state
	
	    this.API.all('services/add_sub_service').post(data).then(() => {
	      let alert = { type: 'success', 'title': 'Success!', msg: 'Sub Service has been added.' }
	      
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

export const CarServiceSubAddComponent = {
  templateUrl: './views/app/components/car-service-sub-add/car-service-sub-add.component.html',
  controller: CarServiceSubAddController,
  controllerAs: 'vm',
  bindings: {}
}
