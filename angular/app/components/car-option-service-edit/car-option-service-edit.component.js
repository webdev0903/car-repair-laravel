class CarOptionServiceEditController {
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

    this.type = 1;

    this.API.all('services').get('get_option_service_info', {serviceId}).then((response) => {
      this.optionService = API.copy(response)

      this.service = this.optionService.data.title;
      this.price = this.optionService.data.price;
      this.description = this.optionService.data.description;
      this.type = this.optionService.data.type;
    })
  }
  
  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    
    if (isValid) {
      if (this.type == 2) 
        this.price = 0;
      
      let data = { 
          id: this.optionService.data.id,
          name: this.service,
          price: this.price,
          description: this.description,
          type: this.type
      }
      
      let $state = this.$state
  
      this.API.all('services/edit_option_service').post(data).then(() => {
        let alert = { type: 'success', 'title': 'Success!', msg: 'Option Service has been edited.' }
        
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

export const CarOptionServiceEditComponent = {
  templateUrl: './views/app/components/car-option-service-edit/car-option-service-edit.component.html',
  controller: CarOptionServiceEditController,
  controllerAs: 'vm',
  bindings: {}
}
