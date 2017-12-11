class CarAppointmentDetailController {
  constructor (API, $state, $stateParams, $scope, $uibModal) {
    'ngInject'
    this.API = API
    this.$state = $state
	this.$scope = $scope
	this.$uibModal = $uibModal
	this.services = ""
	
	this.appointmentId = $stateParams.appointmentId
	 
	let appointmentId = this.appointmentId
	 
	this.API.all('appointments').get('role_info').then((response) => {
		this.role = API.copy(response)
	})
	 
	this.API.all('appointments').get('appointment_info', {appointmentId}).then((response) => {
		this.appointment = API.copy(response)
	})

  this.API.all('appointments').get('appointment_times', {appointmentId}).then((response) => {
    this.appointmentTime = response;
  })
	 
	this.API.all('appointments').get('appointment_services', {appointmentId}).then((response) => {
		this.services =  response.plain();
	})
  }
 
  advisorcontroller ($scope, $uibModalInstance, API) {
  	  'ngInject'
  	  
  	  API.all('appointments').get('all_advisors').then((response) => {
  	  	this.advisors =  response.plain();
  	  })
  	  
  	  this.ok = (advisorId) => {
  	  	$uibModalInstance.close(advisorId)
  	  }
  	
  	  this.cancel = () => {
  	    $uibModalInstance.dismiss('cancel')
  	  }
  }
  
  modalcontroller ($scope, $uibModalInstance) {
	  'ngInject'
	  this.description = ""
	  
	  this.ok = () => {
	    $uibModalInstance.close(this.description)
	  }
	
	  this.cancel = () => {
	    $uibModalInstance.dismiss('cancel')
	  }
 }
    	
  getTotal () {
  		var total = 0;
  	
  	    for(var i = 0; i < this.services.length; i++){
  	        var service = this.services[i];
  	       console.log(service);
            if (service.selected == 1)
              total += service.price;
  	    }
  	    
  	    return total;
  }

  onAcceptAppointment () {
    let appointmentId = this.appointmentId
  }
  	
  onCreateReport () {
	let $uibModal = this.$uibModal
    let $scope = this.$scope
    
    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: this.modalcontroller,
      controllerAs: 'mvm'
    })

    modalInstance.result.then((description) => {
      let data = {
    		appointmentId: this.appointmentId,
     		completionTime: new Date(),
     		completionDescription: description
      }
      
      let $state = this.$state
  
      this.API.all('appointments/appointment_report').post(data).then(() => {
        this.$state.go('app.carappointmentlists')
      }, (res) => {
        
      })
    }, () => {
      console.log('Modal dismissed at: ' + new Date())
    })
  }
  
  onAssignAdvisor () {
	  let $uibModal = this.$uibModal
	  let $scope = this.$scope
	  
	  var modalInstance = $uibModal.open({
	    animation: this.animationsEnabled,
	    templateUrl: 'advisorContent.html',
	    controller: this.advisorcontroller,
	    controllerAs: 'mvm'
	  })
	
	  modalInstance.result.then((advisorId) => {
	  	console.log(advisorId);
	    
	    let data = {
	  		appointmentId: this.appointmentId,
	   		advisorId: advisorId
	    }
	    
	    console.log(data)
	    
	    let $state = this.$state
		
	    this.API.all('appointments/update_appointment_advisor').post(data).then(() => {
	      $state.reload()
	    }, (res) => {
	      $state.reload()
	    })
	  }, () => {
	    console.log('Modal dismissed at: ' + new Date())
	  })
	}
  
  $onInit () {}
}

export const CarAppointmentDetailComponent = {
  templateUrl: './views/app/components/car-appointment-detail/car-appointment-detail.component.html',
  controller: CarAppointmentDetailController,
  controllerAs: 'vm',
  bindings: {}
}
