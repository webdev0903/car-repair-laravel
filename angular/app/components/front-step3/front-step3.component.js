class FrontStep3Controller {
  constructor ($location, $rootScope, $scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
	  //this.timesheets = [{title: "8:00 AM", selected: 0}, {title: "8:30 AM", selected: 0}, {title: "9:00 AM", selected: 0}, {title: "9:30 AM", selected: 0}, {title: "10:00 AM", selected: 0}, {title: "10:30 AM", selected: 0}, {title: "11:00 AM", selected: 0}, {title: "11:30 AM", selected: 0}, {title: "12:00 PM", selected: 0}, {title: "12:30 PM", selected: 0}, {title: "1:00 PM", selected: 0}, {title: "1:30 PM", selected: 0}, {title: "2:00 PM", selected: 0}, {title: "2:30 PM", selected: 0}, {title: "3:00 PM", selected: 0}, {title: "3:30 PM", selected: 0}, {title: "4:00 PM", selected: 0}, {title: "4:30 PM", selected: 0}, {title: "5:00 PM", selected: 0}, {title: "5:30 PM", selected: 0}, {title: "6:00 PM", selected: 0}];
    this.timesheets = [{title: "8:00 AM", selected: 0}, {title: "8:30 AM", selected: 0}, {title: "9:00 AM", selected: 0}, {title: "9:30 AM", selected: 0}, {title: "10:00 AM", selected: 0}, {title: "10:30 AM", selected: 0}, {title: "11:00 AM", selected: 0}, {title: "11:30 AM", selected: 0}, {title: "12:00 PM", selected: 0}, {title: "12:30 PM", selected: 0}, {title: "1:00 PM", selected: 0}, {title: "1:30 PM", selected: 0}, {title: "2:00 PM", selected: 0}, {title: "2:30 PM", selected: 0}, {title: "3:00 PM", selected: 0}, {title: "3:30 PM", selected: 0}, {title: "4:00 PM", selected: 0}, {title: "4:30 PM", selected: 0}, {title: "5:00 PM", selected: 0}, {title: "5:30 PM", selected: 0}, {title: "6:00 PM", selected: 0}];
    this.$rootScope = $rootScope
    this.$location = $location
    
    this.nums = 0

    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    this.$location.hash('step3-top');
  }
	
  $onInit () {
    if (this.$rootScope.currentMainService == undefined) {
      this.$state.go('front.home');
      return;
    }

    document.getElementById('mobile_menu').style.display = 'none';
    document.getElementById('toggle_menu_bg').style.display = 'none';

    if (this.$rootScope.appointmentDate == undefined || this.$rootScope.appointmentDate == "") {
      var date = new Date();
      
      var month = date.getMonth();
      var day = date.getDate();
      var year = date.getFullYear();
      var s_day = 31;

      if(month%2==1){
        if(month==1){
          if(year%4==0)
            s_day = 29
          else
            s_day = 28
        }else{
          s_day = 30
        }
      }

      if(day==s_day){
        day=1
        if(month==11){
          month=0
          year++
        }else{
          month++
        }
      }else{
        day++
      }
      this.date = this.months[month] + " " + day + ", " + year;

      this.$rootScope.appointmentDate = this.date;
    } else
      this.date = this.$rootScope.appointmentDate;

    var date = new Date();
    
    this.minDate = this.months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    this.maxDate = "12 31, " + date.getFullYear();
    this.refreshTimesheets();

    if (this.$rootScope.appointmentTimes.length > 0) {
      for (let i = 0; i < this.timesheets.length; i++) {
        for (let j = 0; j < this.$rootScope.appointmentTimes.length; j++) {
          if (this.timesheets[i].title == this.$rootScope.appointmentTimes[j]) {
            this.timesheets[i].selected = 1;
          }
        }
      }
    }
  }

  refreshTimesheets() {
    if (this.timesheets == undefined)
      return;
    
    var date = new Date();
    
    for (let i = 0; i < this.timesheets.length; i++) {
      let dd = Date.parse(this.date + " " + this.timesheets[i].title);
      if (dd < date.getTime()) {
        this.timesheets[i].selected = 2;
      } else {
        this.timesheets[i].selected = 0;
      }
    }

    this.nums = 0
  }

  changeDate() {
    this.refreshTimesheets();
  }

  onSelectTimeSheet (timesheet) {
    for ( var i in this.timesheets )
      this.timesheets[i].selected = 0
    
    if (timesheet.selected == 0 && this.nums >= 4)
      return;

    timesheet.selected = timesheet.selected == 1 ? 0 : 1;

    if (timesheet.selected == 1)
      this.nums++;
    else
      this.nums--;
  }

  onNext() {
    this.$rootScope.appointmentDate = this.date;
    this.$rootScope.appointmentTimes = [];
    for (let i = 0; i < this.timesheets.length; i++) {
      if (this.timesheets[i].selected == 1) {
        this.$rootScope.appointmentTimes[this.$rootScope.appointmentTimes.length] = this.timesheets[i].title;
      }
    }
    
    this.$state.go('front.step4');
  }
}

export const FrontStep3Component = {
  templateUrl: './views/app/components/front-step3/front-step3.component.html',
  controller: FrontStep3Controller,
  controllerAs: 'vm',
  bindings: {}
}
