class CarAppointmentAcceptController {
  constructor ($scope, $state, $location, $http, $stateParams, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
    this.$location = $location
    this.$http = $http
    this.inspection = ""
    this.selected_inspection = []
    this.formSubmitted = false
    
    this.appointmentId = $stateParams.appointmentId
    let appointmentId = this.appointmentId
    
    this.API.all('appointments').get('appointment_inspection', {appointmentId}).then((response) => {
      this.inspection =  response.plain();

      for (var i in this.inspection){
        this.selected_inspection[i] = this.inspection[i].id
      }
    })

    this.API.all('appointments').get('appointment_info', {appointmentId}).then((response) => {
      this.appointment =  response.plain().data;

      if(this.appointment){
        var temp = this.appointment.book_time.split(' ');
        this.appointment.book_time1 = temp[0]
        this.appointment.book_time2 = temp[1]
        
        this.jobno = this.appointmentId
        this.date = this.appointment.book_time1
        this.time = this.appointment.book_time2
        this.customer = this.appointment.customer
        this.advisor = this.appointment.advisor
        this.telephone = this.appointment.phone_number
        this.model = this.appointment.make+' '+this.appointment.model+' '+this.appointment.year
        this.email = this.appointment.email
        this.secondaryreq = ''
        this.plate = this.appointment.trim
      }
    })

    $scope.files = []
    $scope.fileNameChanged = function(element, index){
      let files = element.files

      if(files.length>0){
        var id='image'+index;
        var formData = new FormData();

        formData.append("file", files[0]);
        
        $http.post('/add_image', formData, {
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
        }).success(function(data) {
          if(data==''){
            $('#'+id).attr('src','img/assets/upload'+(index+1)+'.jpg');
          }else{
            $('#'+id).attr('src',data);
            $scope.files[index] = data
          }
        })
      }
    }

    this.file = $scope.files
    this.$scope = $scope
  }
	
  $onInit () {}

  toggleSelection(id) {
    let index = this.selected_inspection.indexOf(id)

    if(index > -1){
      this.selected_inspection[index]=-1
    }else{
      this.selected_inspection.push(id)
    }
  }

  accept(isValid) {
    let ins = this.selected_inspection.join(',')
    let file = this.file.join(',')
    let $state = this.$state
    let $scope = this.$scope

    if($scope.sign1().isEmpty || $scope.sign2().isEmpty){
      alert("You have to sign to submit.");
      return;
    }

    var sign1 = $scope.sign1().dataUrl;
    var sign2 = $scope.sign2().dataUrl;

    if(sign1==undefined || sign2==undefined){
      alert("You have to sign to submit.");
      return;
    }

    if(isValid){
      var url = this.$location.absUrl();
      url = url.replace('admin/car-appointment-accept/'+this.appointmentId,'accept-form/');

      let data = {
        url: url,
        app_id: this.appointmentId,
        jobno: this.jobno,
        date: this.date,
        time: this.time,
        customer: this.customer,
        vin: this.vin,
        advisor: this.advisor,
        telephone: this.telephone,
        model: this.model,
        km: this.km,
        email: this.email,
        plate: this.plate,
        fuel: this.fuel,
        primaryreq: this.primaryreq,
        secondaryreq: this.secondaryreq,
        inspection: ins,
        file: file,
        sign1: sign1,
        sign2: sign2
      }
      
      this.API.all('appointments/add_accept').post(data).then((res) => {
        $state.go('special.acceptform', {formId:res})
      }, (res) => {
        $state.reload()
      })
    }else{
      this.formSubmitted = true
    }
  }
}

export const CarAppointmentAcceptComponent = {
  templateUrl: './views/app/components/car-appointment-accept/car-appointment-accept.component.html',
  controller: CarAppointmentAcceptController,
  controllerAs: 'vm',
  bindings: {}
}