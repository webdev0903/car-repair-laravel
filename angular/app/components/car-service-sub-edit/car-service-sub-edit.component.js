class CarServiceSubEditController {
  constructor (API, $state, $stateParams) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
    
    let serviceId = $stateParams.serviceId
    
    this.API.all('services').get('get_sub_service_info', {serviceId}).then((response) => {
    	this.service = API.copy(response)
    })
    
  }
	
  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    
    if (isValid) {
      	let data = {
      		id: this.service.data.id,
      		parent_id: this.service.data.parent_id,
	   		title: this.service.data.title,
	   		price: this.service.data.price,
	   		description: this.service.data.description
	    }
	    
	    let $state = this.$state
	
	    this.API.all('services/edit_sub_service').post(data).then(() => {
	      this.$state.go('app.carservicelists')
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

export const CarServiceSubEditComponent = {
  templateUrl: './views/app/components/car-service-sub-edit/car-service-sub-edit.component.html',
  controller: CarServiceSubEditController,
  controllerAs: 'vm',
  bindings: {}
}
