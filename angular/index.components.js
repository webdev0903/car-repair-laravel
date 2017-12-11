import { TablesSimpleComponent } from './app/components/tables-simple/tables-simple.component'
import { UiModalComponent } from './app/components/ui-modal/ui-modal.component'
import { UiTimelineComponent } from './app/components/ui-timeline/ui-timeline.component'
import { UiButtonsComponent } from './app/components/ui-buttons/ui-buttons.component'
import { UiIconsComponent } from './app/components/ui-icons/ui-icons.component'
import { UiGeneralComponent } from './app/components/ui-general/ui-general.component'
import { FormsGeneralComponent } from './app/components/forms-general/forms-general.component'
import { ChartsChartjsComponent } from './app/components/charts-chartjs/charts-chartjs.component'
import { WidgetsComponent } from './app/components/widgets/widgets.component'
import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
import { UserVerificationComponent } from './app/components/user-verification/user-verification.component'
import { ComingSoonComponent } from './app/components/coming-soon/coming-soon.component'
import { UserEditComponent } from './app/components/user-edit/user-edit.component'
import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
import { UserListsComponent } from './app/components/user-lists/user-lists.component'
import { DashboardComponent } from './app/components/dashboard/dashboard.component'
import { NavSidebarComponent } from './app/components/nav-sidebar/nav-sidebar.component'
import { NavHeaderComponent } from './app/components/nav-header/nav-header.component'
import { LoginLoaderComponent } from './app/components/login-loader/login-loader.component'
import { ResetPasswordComponent } from './app/components/reset-password/reset-password.component'
import { ForgotPasswordComponent } from './app/components/forgot-password/forgot-password.component'
import { LoginFormComponent } from './app/components/login-form/login-form.component'
import { RegisterFormComponent } from './app/components/register-form/register-form.component'
import { CarAppointmentListsComponent } from './app/components/car-appointment-lists/car-appointment-lists.component'
import { CarAppointmentDetailComponent } from './app/components/car-appointment-detail/car-appointment-detail.component'
import { CarAppointmentReportComponent } from './app/components/car-appointment-report/car-appointment-report.component'
import { CarAppointmentAcceptComponent } from './app/components/car-appointment-accept/car-appointment-accept.component'
import { CarServiceListsComponent } from './app/components/car-service-lists/car-service-lists.component'
import { CarServiceMainAddComponent } from './app/components/car-service-main-add/car-service-main-add.component'
import { CarServiceMainEditComponent } from './app/components/car-service-main-edit/car-service-main-edit.component'
import { CarServiceSubAddComponent } from './app/components/car-service-sub-add/car-service-sub-add.component'
import { CarServiceSubEditComponent } from './app/components/car-service-sub-edit/car-service-sub-edit.component'
import { CarAdvisorListsComponent } from './app/components/car-advisor-lists/car-advisor-lists.component'
import { CarAdvisorAppointmentsComponent } from './app/components/car-advisor-appointments/car-advisor-appointments.component'
import { CarCustomerListsComponent } from './app/components/car-customer-lists/car-customer-lists.component'
import { CarCustomerAppointmentsComponent } from './app/components/car-customer-appointments/car-customer-appointments.component'
import { FrontAcceptFormComponent } from './app/components/front-accept-form/front-accept-form.component'
import { FrontReportFormComponent } from './app/components/front-report-form/front-report-form.component'
import { FrontHomeComponent } from './app/components/front-home/front-home.component'
import { FrontWhatCarComponent } from './app/components/front-what-car/front-what-car.component'
import { FrontNavHeaderComponent } from './app/components/front-nav-header/front-nav-header.component'
import { FrontStep1Component } from './app/components/front-step1/front-step1.component'
import { FrontStep2Component } from './app/components/front-step2/front-step2.component'
import { FrontStep3Component } from './app/components/front-step3/front-step3.component'
import { FrontStep4Component } from './app/components/front-step4/front-step4.component'
import { FrontStep5Component } from './app/components/front-step5/front-step5.component'
import { CarOptionServiceListsComponent } from './app/components/car-option-service-lists/car-option-service-lists.component'
import { CarOptionServiceAddComponent } from './app/components/car-option-service-add/car-option-service-add.component'
import { CarOptionServiceEditComponent } from './app/components/car-option-service-edit/car-option-service-edit.component'

angular.module('app.components')
  .component('tablesSimple', TablesSimpleComponent)
  .component('carAppointmentLists', CarAppointmentListsComponent)
  .component('carAppointmentDetail', CarAppointmentDetailComponent)
  .component('carAppointmentReport', CarAppointmentReportComponent)
  .component('carAppointmentAccept', CarAppointmentAcceptComponent)
  .component('carServiceLists', CarServiceListsComponent)
  .component('carServiceMainAdd', CarServiceMainAddComponent)
  .component('carServiceMainEdit', CarServiceMainEditComponent)
  .component('carServiceSubAdd', CarServiceSubAddComponent)
  .component('frontAcceptForm', FrontAcceptFormComponent)
  .component('frontReportForm', FrontReportFormComponent)
  .component('frontHome', FrontHomeComponent)
  .component('carServiceSubEdit', CarServiceSubEditComponent)
  .component('carAdvisorLists', CarAdvisorListsComponent)
  .component('carAdvisorAppointments', CarAdvisorAppointmentsComponent)
  .component('carCustomerLists', CarCustomerListsComponent)
  .component('carCustomerAppointments', CarCustomerAppointmentsComponent)
  .component('uiModal', UiModalComponent)
  .component('uiTimeline', UiTimelineComponent)
  .component('uiButtons', UiButtonsComponent)
  .component('uiIcons', UiIconsComponent)
  .component('uiGeneral', UiGeneralComponent)
  .component('formsGeneral', FormsGeneralComponent)
  .component('chartsChartjs', ChartsChartjsComponent)
  .component('widgets', WidgetsComponent)
  .component('userProfile', UserProfileComponent)
  .component('userVerification', UserVerificationComponent)
  .component('comingSoon', ComingSoonComponent)
  .component('userEdit', UserEditComponent)
  .component('userPermissionsEdit', UserPermissionsEditComponent)
  .component('userPermissionsAdd', UserPermissionsAddComponent)
  .component('userPermissions', UserPermissionsComponent)
  .component('userRolesEdit', UserRolesEditComponent)
  .component('userRolesAdd', UserRolesAddComponent)
  .component('userRoles', UserRolesComponent)
  .component('userLists', UserListsComponent)
  .component('dashboard', DashboardComponent)
  .component('navSidebar', NavSidebarComponent)
  .component('navHeader', NavHeaderComponent)
  .component('frontNavHeader', FrontNavHeaderComponent)
  .component('loginLoader', LoginLoaderComponent)
  .component('resetPassword', ResetPasswordComponent)
  .component('forgotPassword', ForgotPasswordComponent)
  .component('loginForm', LoginFormComponent)
  .component('registerForm', RegisterFormComponent)
  .component('frontWhatCar', FrontWhatCarComponent)
  .component('frontStep1', FrontStep1Component)
  .component('frontStep2', FrontStep2Component)
  .component('frontStep3', FrontStep3Component)
  .component('frontStep4', FrontStep4Component)
  .component('frontStep5', FrontStep5Component)
  .component('carOptionServiceLists', CarOptionServiceListsComponent)
  .component('carOptionServiceAdd', CarOptionServiceAddComponent)
  .component('carOptionServiceEdit', CarOptionServiceEditComponent)
