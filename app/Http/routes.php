<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'AngularController@serveApp');
    Route::get('/unsupported-browser', 'AngularController@unsupported');
    Route::get('user/verify/{verificationCode}', ['uses' => 'Auth\AuthController@verifyUserEmail']);
    Route::get('auth/{provider}', ['uses' => 'Auth\AuthController@redirectToProvider']);
    Route::get('auth/{provider}/callback', ['uses' => 'Auth\AuthController@handleProviderCallback']);
    Route::get('/api/authenticate/user', 'Auth\AuthController@getAuthenticatedUser');
});

Route::post('/add_image', 'AppointmentsController@addImage');

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('services', 'ServicesController');

    $api->get('services/mainservices', 'ServicesController@getMainServices');
    $api->get('services/availablemainservices', 'ServicesController@getAvailableMainServices');
    $api->get('services/subservices', 'ServicesController@getSubServices');
    $api->get('services/get_main_service_info', 'ServicesController@getMainServiceInfo');
    $api->get('services/get_sub_service_info', 'ServicesController@getSubServiceInfo');
    $api->get('services/get_option_service_info', 'ServicesController@getOptionServiceInfo');

    $api->get('services/alloptionservices', 'ServicesController@getAllOptionServices');
    $api->get('services/allsubservices', 'ServicesController@getAllSubServices');
    $api->get('services/onlyoptionservices', 'ServicesController@getOnlyOptionServices');
    $api->get('services/allfreeservices', 'ServicesController@getFreeOptionService');

    $api->post('appointment/new', 'AppointmentsController@newAppointment');
});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->controller('services', 'ServicesController');

    $api->post('services/add_main_service', 'ServicesController@addMainService');
    $api->post('services/edit_main_service', 'ServicesController@updateMainService');
    $api->post('services/delete_main_service', 'ServicesController@deleteMainService');

    $api->post('services/add_option_service', 'ServicesController@addOptionService');
    $api->post('services/edit_option_service', 'ServicesController@updateOptionService');
    $api->post('services/delete_option_service', 'ServicesController@deleteOptionService');
    
    $api->post('services/add_sub_service', 'ServicesController@addSubService');
    $api->post('services/edit_sub_service', 'ServicesController@updateSubService');
    $api->post('services/delete_sub_service', 'ServicesController@deleteSubService');
});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->controller('appointments', 'AppointmentsController');
    
    $api->get('appointments/all_customers', 'AppointmentsController@getCustomers');
    $api->get('appointments/customer_info', 'AppointmentsController@getCustomerInfo');
    $api->get('appointments/all_appointments_by_customer', 'AppointmentsController@getAppointmentsByCustomer');
    
    $api->get('appointments/all_advisors', 'AppointmentsController@getAdvisors');
    $api->get('appointments/advisor_info', 'AppointmentsController@getAdvisorInfo');
    $api->get('appointments/role_info', 'AppointmentsController@getUserRole');
    $api->get('appointments/all_appointments', 'AppointmentsController@getAppointments');
    $api->get('appointments/all_appointments_by_advisor', 'AppointmentsController@getAppointmentsByAdvisor');
    $api->get('appointments/appointment_info', 'AppointmentsController@getAppointmentInfo');
    $api->get('appointments/appointment_services', 'AppointmentsController@getAppointmentServices');
    $api->get('appointments/appointment_times', 'AppointmentsController@getAppointmentTimes');
    
    $api->post('appointments/add_advisor', 'AppointmentsController@addAdvisor');
    $api->post('appointments/add_accept', 'AppointmentsController@addAccept');
    $api->post('appointments/add_report', 'AppointmentsController@addReport');
    $api->post('appointments/appointment_report', 'AppointmentsController@reportAppointmentInfo');
    $api->post('appointments/update_appointment_advisor', 'AppointmentsController@updateAppointmentAdvisor');
});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');

    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
    $api->get('appointments/appointment_inspection', 'AppointmentsController@getAppointmentInspection');
    $api->get('appointments/get_accept', 'AppointmentsController@getAccept');
    $api->get('appointments/get_report', 'AppointmentsController@getReport');
    $api->get('appointments/get_accept_by_appId', 'AppointmentsController@getAcceptByAppId');
    $api->get('appointments/get_report_aspect', 'AppointmentsController@getReportAspect');
    $api->post('appointments/update_report', 'AppointmentsController@updateReport');
    $api->post('appointments/contact', 'AppointmentsController@contact');
});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');
});


$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user']], function ($api) {
    $api->controller('users', 'UserController');
});