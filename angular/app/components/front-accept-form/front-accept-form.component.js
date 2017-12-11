class FrontAcceptFormController {
  constructor ($scope, $state, $stateParams, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
    
    this.formId = $stateParams.formId
    let formId = this.formId
    
    this.data = ''
    this.inspection = ''
    this.checked_inspection = []

    this.API.all('appointments').get('get_accept', {formId}).then((response) => {
      this.data =  response.plain()[0];
      this.data.file = this.data.file.split(',')
      
      var temp = this.data.inspection.split(',')
      
      for(var i in temp){
        if(parseInt(temp[i])!=-1)
          this.checked_inspection.push(parseInt(temp[i]))
      }

      for(var i=0; i<5; i++){
        if(this.data.file[i]=='' || this.data.file[i]==undefined)
          this.data.file[i]='img/assets/upload'+(i+1)+'.jpg'
      }
    })

    this.API.all('appointments').get('appointment_inspection').then((response) => {
      this.inspection =  response.plain();
    })

    this.$scope = $scope
  }
	
  $onInit () {}
}

export const FrontAcceptFormComponent = {
  templateUrl: './views/app/components/front-accept-form/front-accept-form.component.html',
  controller: FrontAcceptFormController,
  controllerAs: 'vm',
  bindings: {}
}