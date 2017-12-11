class CarServiceListsController {
  constructor ($rootScope, $scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
    this.$rootScope = $rootScope

  this.serviceId = 0
	this.serviceName = ""
	
	this.API.all('services').get('mainservices').then((response) => {
		this.main_services =  response.plain().main_services;
	})
  }
	
  onRow (serviceId, serviceName) {
  	this.API.all('services').get('subservices', {serviceId}).then((response) => {
  		this.sub_services =  response.plain().sub_services;
  		
  		this.serviceId = serviceId;
  		this.serviceName = serviceName;
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
	    
	    API.all('services/delete_main_service').post(data).then(() => {
	      let alert = { type: 'success', 'title': 'Success!', msg: 'Main Service has been deleted.' }
	      
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
  
  subdelete (serviceId) {
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
  	    
  	    API.all('services/delete_sub_service').post(data).then(() => {
  	      let alert = { type: 'success', 'title': 'Success!', msg: 'Sub Service has been deleted.' }
  	      
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

export const CarServiceListsComponent = {
  templateUrl: './views/app/components/car-service-lists/car-service-lists.component.html',
  controller: CarServiceListsController,
  controllerAs: 'vm',
  bindings: {}
}
