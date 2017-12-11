class CarAdvisorAppointmentsController {
  constructor ($scope, $state, API, $stateParams) {
    'ngInject'
    this.API = API
    this.$state = $state
	
	this.advisorId = $stateParams.advisorId
	
	let advisorId = this.advisorId
	
	this.API.all('appointments').get('advisor_info', {advisorId}).then((response) => {
		this.advisor = API.copy(response)
	})
	
	this.API.all('appointments').get('all_appointments_by_advisor', {advisorId}).then((response) => {
		this.appointments =  response.plain();
	})
  }
		
  $onInit () {}
}

export const CarAdvisorAppointmentsComponent = {
  templateUrl: './views/app/components/car-advisor-appointments/car-advisor-appointments.component.html',
  controller: CarAdvisorAppointmentsController,
  controllerAs: 'vm',
  bindings: {}
}
