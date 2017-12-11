class CarOptionServiceListsController {
  constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
	this.serviceId = 0
	this.serviceName = ""
	
	this.API.all('services').get('alloptionservices').then((response) => {
		this.option_services =  response.plain().option_services;
	})
  }
	
  delete (serviceId) {
    let API = this.API
    let $state = this.$state
	
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      html: false
    }, function () {
    	let data = {
	      id: serviceId
	    }
	    
	    API.all('services/delete_option_service').post(data).then(() => {
	      let alert = { type: 'success', 'title': 'Success!', msg: 'Option Service has been deleted.' }
	      
	      swal({
	        title: 'Deleted!',
	        text: 'Service Item has been deleted.',
	        type: 'success',
	        confirmButtonText: 'OK',
	        closeOnConfirm: true
	      }, function () {
	        $state.reload()
	      })
	    })
    })
  }
  
  $onInit () {}
}

export const CarOptionServiceListsComponent = {
  templateUrl: './views/app/components/car-option-service-lists/car-option-service-lists.component.html',
  controller: CarOptionServiceListsController,
  controllerAs: 'vm',
  bindings: {}
}
