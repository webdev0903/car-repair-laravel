class CarCustomerListsController {
  constructor ($scope, $state, API, $uibModal) {
    'ngInject'
    this.API = API
    this.$state = $state
	
	this.$scope = $scope
	this.$uibModal = $uibModal
	
	this.API.all('appointments').get('all_customers').then((response) => {
		this.customers =  response.plain();
	})
  }
	  	
  $onInit () {}
}

export const CarCustomerListsComponent = {
  templateUrl: './views/app/components/car-customer-lists/car-customer-lists.component.html',
  controller: CarCustomerListsController,
  controllerAs: 'vm',
  bindings: {}
}
