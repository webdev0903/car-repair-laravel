class CarCustomerAppointmentsController {
  constructor ($scope, $state, API, $stateParams) {
    'ngInject'
    this.API = API
    this.$state = $state
	
	this.customerId = $stateParams.customerId
	
	let customerId = this.customerId
	
	this.API.all('appointments').get('customer_info', {customerId}).then((response) => {
		this.customer = API.copy(response)
	})
	
	this.API.all('appointments').get('all_appointments_by_customer', {customerId}).then((response) => {
		this.appointments =  response.plain();

		if(this.appointments){
	        for(var i in this.appointments){
	          var temp = this.appointments[i].book_time.split(' ');
	          var temp2 = temp[0].split('-');
	          this.appointments[i].book_time1 = temp2[2]+'/'+temp2[1]+'/'+temp2[0];
	          this.appointments[i].book_time2 = temp[1];
	        }
	      }
	})
  }
		
  $onInit () {}
}

export const CarCustomerAppointmentsComponent = {
  templateUrl: './views/app/components/car-customer-appointments/car-customer-appointments.component.html',
  controller: CarCustomerAppointmentsController,
  controllerAs: 'vm',
  bindings: {}
}
