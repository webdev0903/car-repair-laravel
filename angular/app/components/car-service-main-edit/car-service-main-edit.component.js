class CarServiceMainEditController {
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
    
    this.API.all('services').get('get_main_service_info', {serviceId}).then((response) => {
    	this.service = API.copy(response)
    })
    
  }
	
  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    
    if (isValid) {
      	let data = {
      		id: this.service.data.id,
	   		title: this.service.data.title,
        is_show: this.service.data.is_show
	    }
	    
	    let $state = this.$state
	
	    this.API.all('services/edit_main_service').post(data).then(() => {
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

  toggleChange() {
    if (this.service.data.is_show == 1) {
      document.getElementById('toggle').src = "img/assets/toggle_off.png";
      this.service.data.is_show = 0;
    } else {
      document.getElementById('toggle').src = "img/assets/toggle_on.png";
      this.service.data.is_show = 1;
    }
  }
}

export const CarServiceMainEditComponent = {
  templateUrl: './views/app/components/car-service-main-edit/car-service-main-edit.component.html',
  controller: CarServiceMainEditController,
  controllerAs: 'vm',
  bindings: {}
}
