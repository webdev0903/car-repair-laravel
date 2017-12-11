class CarAppointmentReportController {
  constructor (API, $location, $state, $stateParams, $rootScope, $scope, $uibModal) {
    'ngInject'
  
    this.API = API
    this.$state = $state
  	this.$scope = $scope
    this.$rootScope = $rootScope
    this.$uibModal = $uibModal
  	this.$location = $location

  	this.appointmentId = $stateParams.appointmentId
  	this.total = 0
    this.selected_service = []
    this.report_aspect = []

  	let appointmentId = this.appointmentId
  	 
  	this.API.all('appointments').get('get_accept_by_appId', {appointmentId}).then((response) => {
  		this.accept = response.plain()[0];
  	})

    this.API.all('appointments').get('get_report_aspect').then((response) => {
      var temp = response.plain();

      for ( var i in temp ){
        var obj = new Object
        obj.title = temp[i].title
        obj.status = 3
        obj.detail = []
        for ( var j in temp[i].sub ){
          var obj1 = new Object
          obj1.heading = temp[i].sub[j].heading
          obj1.sub = []
          for ( var k in temp[i].sub[j].sub ){
            var obj2 = new Object
            obj2.title = temp[i].sub[j].sub[k]
            obj2.status = 3
            obj2.note = ''
            obj1.sub.push(obj2)
          }
          obj.detail.push(obj1)
        }

        this.report_aspect.push(obj)
      }
    })

    this.services = []

    this.API.all('services').get('alloptionservices').then((response) => {
      this.option_service = response.plain().option_services;
      for( var i in this.option_service){
        this.option_service[i].service_type='option'
        this.option_service[i].class3='good'
        this.option_service[i].selected=0
        this.services.push(this.option_service[i])
      }
    })

    this.API.all('services').get('allsubservices').then((response) => {
      this.sub_service = response.plain().sub_services;
      for( var i in this.sub_service){
        this.sub_service[i].service_type='sub'
        this.sub_service[i].class3='good'
        this.sub_service[i].selected=0
        this.services.push(this.sub_service[i])
      }
    })
  }
  
  modalcontroller (API, $scope, $rootScope, $uibModalInstance) {
      'ngInject'
      this.API = API
      this.$scope = $scope
      this.$rootScope = $rootScope
      
      this.services = this.$rootScope.services
      this.selected_service = []

      this.onSelectService = (service) => {
        service.selected = service.selected == 1 ? 0 : 1;
      }
      this.ok = () => {
        for(var i in this.services){
          if(this.services[i].selected==1)
            this.selected_service.push(this.services[i])
        }
        $uibModalInstance.close(this.selected_service)
      }
      this.cancel = () => {
        $uibModalInstance.dismiss('cancel')
      }
  }

  $onInit () {}

  showModal() {
    let $uibModal = this.$uibModal
    let $scope = this.$scope
    
    for(var i in this.services){
      var flag=0;
      for(var j in this.selected_service){
        if(this.services[i].id==this.selected_service[j].id && this.services[i].service_type==this.selected_service[j].service_type)
          flag=1;        
      }

      this.services[i].selected=flag
    }

    this.$rootScope.services = this.services

    var modalInstance = $uibModal.open({
      animation: this.animationsEnabled,
      templateUrl: 'modalContent.html',
      controller: this.modalcontroller,
      controllerAs: 'mvm'
    })

    modalInstance.result.then((data) => {
      this.selected_service = data

      for(var i in data)
        this.total += data[i].price
    })
  }

  onRemoveService (service) {
    service.selected = service.selected == 1 ? 0 : 1;

    var temp=[]
    for(var i in this.selected_service){
      if(this.selected_service[i].id==service.id && this.selected_service[i].service_type==service.service_type){
        //Except
      }else{
        temp.push(this.selected_service[i])
      }
    }
    this.selected_service = temp
    this.total-=service.price
  }

  onSelectStatus (service, status) {
    if(status==1){
      service.class1 ='poor';
      service.class2 ='';
      service.class3 ='';
    }else if(status==2){
      service.class1 ='';
      service.class2 ='fair';
      service.class3 ='';
    }else{
      service.class1 ='';
      service.class2 ='';
      service.class3 ='good';
    }
    service.status = status
  }

  report(isValid) {
    if(isValid){
      var url = this.$location.absUrl();
      url = url.replace('admin/car-appointment-report/'+this.appointmentId,'report-form/');
      
      var urgent=0
      var required=0
      var recommended=0

      for( var i in this.selected_service ){
        var obj = this.selected_service[i]

        if(obj.status==1)
          urgent++
        else if(obj.status==2)
          required++
        else
          recommended++
      }
      
      let data = {
        url: url,
        app_id: this.appointmentId,
        score: this.score,
        service: this.selected_service,
        aspect: this.report_aspect,
        urgent: urgent,
        required: required,
        recommended: recommended,
        total: this.total,
        email: this.accept.email
      }

      let $state = this.$state

      this.API.all('appointments/add_report').post(data).then((res) => {
        $state.go('special.reportform', {reportId:res})
      }, (res) => {
        $state.reload()
      })  
    }
  }
}

export const CarAppointmentReportComponent = {
  templateUrl: './views/app/components/car-appointment-report/car-appointment-report.component.html',
  controller: CarAppointmentReportController,
  controllerAs: 'vm',
  bindings: {}
}
