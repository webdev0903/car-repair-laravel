class FrontReportFormController {
  constructor ($scope, $state, $stateParams, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
        
    this.reportId = $stateParams.reportId
    let reportId = this.reportId

    this.agreed_service = []
    this.total = 0

    this.API.all('appointments').get('get_report', {reportId}).then((response) => {
      this.report =  response.plain()[0];
      
      for (var i in this.report.aspect ){
        for ( var j in this.report.aspect[i].detail){
          for ( var k in this.report.aspect[i].detail[j].sub){
            if(this.report.aspect[i].detail[j].sub[k].note=='')
              this.report.aspect[i].detail[j].sub[k].note='OK'
          }
        }
      }

      this.rotate = 272 * this.report.score / 100

      if(this.report.agreed_service != '')
        this.report.service = this.report.agreed_service

      for( var i in this.report.service ){
        this.report.service[i].selected = 0
        if(this.report.service[i].status==1){
          this.report.service[i].class='poor'
        }else if(this.report.service[i].status==2){
          this.report.service[i].class='fair'
        }else{
          this.report.service[i].class='good'
        }
      }

      this.total = this.report.agreed_total
      
      var appointmentId = this.report.app_id
      this.API.all('appointments').get('get_accept_by_appId', {appointmentId}).then((response) => {
        this.accept = response.plain()[0];
      })
    })

    this.$scope = $scope
    this.$state = $state
  }
	
  $onInit () {}

  onSelectService (service) {
    service.selected = 1 - service.selected

    if(service.selected==1)
      this.total += service.price
    else
      this.total -= service.price
  }

  repair(isValid) {
    if(isValid){
      let $state = this.$state

      for( var i in this.report.service ){
        if(this.report.service[i].selected==1)
          this.agreed_service.push(this.report.service[i])
      }

      if(this.agreed_service.length>0){
        var reportId = this.reportId
        var agreed_service = this.agreed_service
        var agreed_total = this.total
        
        let data = {
          agreed_total: agreed_total,
          reportId: reportId,
          appointmentId: this.report.app_id,
          agreed_service: agreed_service
        }

        this.API.all('appointments/update_report').post(data).then((res) => {
          $state.reload()
        }, (res) => {
          $state.reload()
        })  
      }
    }
  }
}

export const FrontReportFormComponent = {
  templateUrl: './views/app/components/front-report-form/front-report-form.component.html',
  controller: FrontReportFormController,
  controllerAs: 'vm',
  bindings: {}
}