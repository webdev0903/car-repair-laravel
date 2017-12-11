<?php

namespace App\Http\Controllers;

use DB;
use App\User;
use App\Car;
use App\Customer;
use App\Appointment;
use App\AppointmentService;
use App\AppointmentOptionService;
use App\AppointmentTime;
use Auth;
use Hash;
use Mail;
use Config;
use URL;
use Twilio;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class AppointmentsController extends Controller
{
    public function index() {
    	
	}
	
	public function getCustomers() {
		/*$customers = DB::select("select users.id, users.name, sum(appointment.open) as open, 										   sum(appointment.total) as total
		 						from users 
							    left join role_user on users.id = role_user.user_id 
							    left join roles on role_user.role_id = roles.id 
							    left join (
							    				select customer_id, count(customer_id) as open, 0 as total  
							    				from appointment 
							    				inner join appointment_status on appointment.status = appointment_status.id 
							    				where appointment_status.name not like 'Closed' 
							    				group by appointment.customer_id
							    				union 
							    				select customer_id, 0 as open, count(customer_id) as total  
							    				from appointment 
							    				group by appointment.customer_id
							    		  ) as appointment on users.id = appointment.customer_id 
							    where roles.slug = 'admin.customer'
							    group by users.id");*/

		$customers = DB::select("select customer.phone_number, customer.id, customer.name, sum(appointment.open) as open, 										   sum(appointment.total) as total
		 						from customer 
							    left join (
							    				select customer_id, count(customer_id) as open, 0 as total  
							    				from appointment 
							    				inner join appointment_status on appointment.status = appointment_status.id 
							    				where appointment_status.name not like 'Closed' 
							    				group by appointment.customer_id
							    				union 
							    				select customer_id, 0 as open, count(customer_id) as total  
							    				from appointment 
							    				group by appointment.customer_id
							    		  ) as appointment on customer.id = appointment.customer_id 
							    group by customer.id");
								
		return $customers;
	}
	
	public function getCustomerInfo(Request $request) {
		$customer = DB::table('customer')
						->where('customer.id', $request->customerId)
						->first();
		
		return response()->success($customer);
	}
	
	public function getAdvisors() {
		$advisors = DB::select("select users.id, users.name, sum(appointment.open) as open, 										   sum(appointment.total) as total
		 						from users 
							    inner join role_user on users.id = role_user.user_id 
							    inner join roles on role_user.role_id = roles.id 
							    left join (
							    				select advisor_id, count(advisor_id) as open, 0 as total  
							    				from appointment 
							    				inner join appointment_status on appointment.status = appointment_status.id 
							    				where appointment_status.name not like 'Closed' 
							    				group by appointment.advisor_id
							    				union 
							    				select advisor_id, 0 as open, count(advisor_id) as total  
							    				from appointment 
							    				group by appointment.advisor_id
							    		  ) as appointment on users.id = appointment.advisor_id 
							    where roles.slug = 'admin.user' 
							    group by users.id");
								
		return $advisors;
	}
	
	public function getUserRole() {
		$user = Auth::user();
		
		$role = $user
		        ->roles()
		        ->select('slug')
		        ->first();
		        
		return $role->slug;
	}
	
	public function getAdvisorInfo(Request $request) {
		$advisor = DB::table('users')
						->where('users.id', $request->advisorId)
						->first();
		
		return response()->success($advisor);
	}
	
	public function addImage(Request $request) {
		$file = $request->file('file');
		
		if ($file!=null) {
			$ext = $file->getClientOriginalExtension();
			$image_name = str_random(15).'.'.$ext;

			$destinationPath = 'uploads/accept';
	      	$file->move($destinationPath,$image_name);
			
			return $destinationPath.'/'.$image_name;
		}
		return '';
	}

	public function updateAppointmentInfo($appointmentId, $query=array()) {
		DB::table('appointment')
		            ->where('id', $appointmentId)
		            ->update($query);
		            
		return true;
	}

	public function addReport(Request $request) {
		$url = $request->url;

		date_default_timezone_set('Asia/Dubai');

		$id = DB::table('report')
		    ->insertGetId(array('app_id' => $request->app_id, 'score' => $request->score, 'urgent'=>$request->urgent, 'required'=>$request->required, 'recommended'=>$request->recommended, 'total'=>$request->total, 'service'=>serialize($request->service), 'aspect'=>serialize($request->aspect), 'time'=>date('Y-m-d H:i:s')));
		
		$info = self::getAppointmentInfoPublic($request->app_id);

		$sender = Config::get("mail.from");

		$url .= $id;

		$data = array(
			'subject'=>'Your 100 Point Digital Car Report is Ready!',
			'sender'=>$sender,
			'emailTo'=>$info->email,
			'url'=>$url,
			'data'=>$info,
		);

		Mail::send('emails.reportform', $data, function ($m) use ($data){
        	extract($data);
            $m->from($sender, 'Gargash Autobody');
			$m->to($emailTo, 'Customer')->subject($subject);
        });

        self::updateAppointmentInfo($request->app_id, array('status'=>4, 'completion_time'=>date('Y-m-d H:i:s'), 'report_id'=>$id));

        if($info->phone_number!=''){
			$message='Dear '.$info->customer.', Your digital report is now ready for '.$info->make.' '.$info->model.' '.$info->year.','.$info->trim.'. You can view details on '.$url.'. For approving recommended services, please select the services and confirm through start repair. Your service advisor will call you shortly to confirm the final costs and time required. Regards, Gargash Autobody';

	        Twilio::message($info->phone_number, $message);
	    }

		return $id;
	}

	public function updateReport(Request $request) {
		$appointment = self::getAppointmentInfoPublic($request->appointmentId);

		$advisor_email = $appointment->advisor_email;

		$sender = Config::get("mail.from");
		
		$data = array(
			'subject'=>'Customer has Approved Recommendations',
			'sender'=>$sender,
			'emailTo'=>$advisor_email,
			'id'=>$request->reportId,
			'data'=>$appointment
		);

		Mail::send('emails.report', $data, function ($m) use ($data){
        	extract($data);
            $m->from($sender, 'Gargash Autobody');
			$m->to($emailTo, 'Advisor')->subject($subject);
        });

		DB::table('report')
		            ->where('id', $request->reportId)
		            ->update(array('status' => 1, 'agreed_service' => serialize($request->agreed_service), 'agreed_total' => $request->agreed_total));
		
		return response()->success(compact('id'));
	}

	public function addAccept(Request $request) {
		$url = $request->url;

		date_default_timezone_set('Asia/Dubai');

		$id = DB::table('accept')
		    ->insertGetId(array('app_id' => $request->app_id, 'jobno' => $request->jobno, 'date' => $request->date, 'time' => $request->time, 'customer' => $request->customer, 'vin' => $request->vin, 'advisor' => $request->advisor, 'telephone' => $request->telephone, 'model' => $request->model, 'km' => $request->km, 'email' => $request->email, 'plate' => $request->plate, 'fuel' => $request->fuel, 'primaryreq' => $request->primaryreq, 'secondaryreq' => $request->secondaryreq, 'inspection' => $request->inspection, 'file'=> $request->file, 'sign1'=>$request->sign1, 'sign2'=>$request->sign2));
		
		self::updateAppointmentInfo($request->app_id, array('status'=>3, 'accept_time'=>date('Y-m-d H:i:s'), 'form_id'=>$id));

		$sender = Config::get("mail.from");
		$url .= $id;

		$info = self::getAppointmentInfoPublic($request->app_id);

		$data = array(
			'subject'=>'Your Car Has Checked In',
			'sender'=>$sender,
			'emailTo'=>$request->email,
			'url'=>$url,
			'data'=>$info
		);

		Mail::send('emails.accept', $data, function ($m) use ($data){
        	extract($data);
            $m->from($sender, 'Gargash Autobody');
			$m->to($emailTo, 'Customer')->subject($subject);
        });

		if($info->phone_number!=''){
			$message='Dear '.$info->customer.', Your car, '.$info->make.' '.$info->model.' '.$info->year.','.$info->trim.' has been checked in. You can view details of your car repair and maintenance on '.$url.'. Once your car is ready, we will send you a 100-point digital report, where you can view in detail the condition of the car and approve recommended services. Regards, Gargash Autobody';

	        Twilio::message($info->phone_number, $message);
	    }

		return $id;
	}

	public function addAdvisor(Request $request) {
		$role = DB::table('roles')
						->where('slug', 'admin.user')
						->first();
						
		$id = DB::table('users')
		    ->insertGetId(array('name' => $request->fullname, 'email' => $request->email, 'phone_number' => $request->phonenumber, 'password' => Hash::make($request->password), 'email_verified' => '1'));
		    
		DB::table('role_user')
		    ->insert(array('role_id' => $role->id, 'user_id' => $id));    
		            
		return response()->success(compact('id'));
	}
	
	public function getAppointments() {
		$user = Auth::user();
		
		$role = $user
                ->roles()
                ->select('slug')
                ->first();
                
		if ($role->slug == 'admin.super') {
			$appointments = DB::table('appointment')
							->join('appointment_status', 'appointment.status', '=', 'appointment_status.id')
							->join('customer', 'appointment.customer_id', '=', 'customer.id')
							->leftjoin('users as users_b', 'appointment.advisor_id', '=', 'users_b.id')
							->select('appointment.id', 'customer.name', 'appointment.book_time', 'appointment_status.name as status', 'appointment.report_id', 'users_b.name as advisor', 'appointment.form_id')
							->orderBy('appointment.id', 'desc')
							->get();
		}
		else {
			$appointments = DB::table('appointment')
							->join('appointment_status', 'appointment.status', '=', 'appointment_status.id')
							->join('customer', 'appointment.customer_id', '=', 'customer.id')
							->leftjoin('users as users_b', 'appointment.advisor_id', '=', 'users_b.id')	
							->where('appointment.advisor_id', $user->id)
							->select('appointment.id', 'customer.name', 'appointment.book_time', 'appointment_status.name as status', 'appointment.report_id', 'users_b.name as advisor', 'appointment.form_id')
							->orderBy('appointment.id', 'asc')
							->get();
		}
		
		return $appointments;
	}
	
	public function getAppointmentsByAdvisor(Request $request) {
		$appointments = DB::table('appointment')
							->join('appointment_status', 'appointment.status', '=', 'appointment_status.id')
							->join('customer', 'appointment.customer_id', '=', 'customer.id')	
							->where('advisor_id', $request->advisorId)
							->select('appointment.id', 'customer.name', 'appointment.book_time', 'appointment_status.name as status', 'appointment.report_id')
							->orderBy('appointment.id', 'desc')
							->get();
		
		
		return $appointments;
	}
	
	public function getAppointmentsByCustomer(Request $request) {
		$appointments = DB::table('appointment')
							->join('appointment_status', 'appointment.status', '=', 'appointment_status.id')
							->join('customer', 'appointment.customer_id', '=', 'customer.id')	
							->where('customer_id', $request->customerId)
							->select('appointment.id', 'customer.name', 'appointment.book_time', 'appointment_status.name as status', 'appointment.report_id', 'appointment.form_id')
							->orderBy('appointment.id', 'desc')
							->get();
		
		
		return $appointments;
	}
	
	
	public function getAppointmentInfo(Request $request) {
		$user = Auth::user();
		
		$appointment = DB::table('appointment')
						->join('appointment_status', 'appointment.status', '=', 'appointment_status.id')
						->leftjoin('users as users_a', 'appointment.advisor_id', '=', 'users_a.id')	
						->join('customer', 'appointment.customer_id', '=', 'customer.id')
						->join('car', 'appointment.car_id', '=', 'car.id')	
						->where('appointment.id', $request->appointmentId)
						->select('appointment.id', 'users_a.name as advisor', 'users_a.email as advisor_email', 'customer.name as customer', 'customer.email', 'customer.phone_number', 'appointment.book_time', 'appointment.accept_time', 'appointment_status.name as status', 'appointment.report_id', 'appointment.completion_time', 'appointment.completion_description', 'car.make as make', 'car.model as model', 'car.trim as trim', 'car.year as year')
						->first();
		
		return response()->success($appointment);
	}

	public function getAppointmentTimes(Request $request) {
		$at = AppointmentTime::where(['appointment_id' => $request->appointmentId])->get();

		$res = "";
		for ($i = 0; $i < sizeof($at); $i++) {
			$date = Carbon::parse($at[$i]->appointment_time); //new DateTime($at[$i]->appointment_time);
			if ($i == 0) {
				$res = $date->format("F d, Y") . " ";
			}

			$res .= $date->format("h:i A");

			if ($i != sizeof($at) - 1)
				$res .= " / "; 
		}

		return $res;
	}
	
	public function getAppointmentInfoPublic($appointmentId){
		$appointment = DB::table('appointment')
						->join('appointment_status', 'appointment.status', '=', 'appointment_status.id')
						->leftjoin('users as users_a', 'appointment.advisor_id', '=', 'users_a.id')	
						->join('customer', 'appointment.customer_id', '=', 'customer.id')
						->join('car', 'appointment.car_id', '=', 'car.id')	
						->where('appointment.id', $appointmentId)
						->select('appointment.id', 'users_a.name as advisor', 'users_a.email as advisor_email', 'customer.name as customer', 'customer.email', 'customer.phone_number', 'appointment.book_time', 'appointment.accept_time', 'appointment_status.name as status', 'appointment.report_id', 'appointment.completion_time', 'appointment.completion_description', 'car.make as make', 'car.model as model', 'car.trim as trim', 'car.year as year')
						->first();

		return $appointment;
	}

	public function getReportAspect(Request $request){
		$aspect = DB::select("select * from report_aspect order by id asc");
		
		for($i=0; $i<count($aspect); $i++){
			$aspect[$i]->sub=unserialize($aspect[$i]->sub);
		}
		return $aspect;
	}

	public function getAppointmentInspection(Request $request){
		$inspection = DB::select("select * from inspection order by id asc");
		return $inspection;
	}

	public function getReport(Request $request){
		$data = DB::select("select * from report where id=".$request->reportId);
		$data[0]->service = unserialize($data[0]->service);
		$data[0]->agreed_service = unserialize($data[0]->agreed_service);
		$data[0]->aspect = unserialize($data[0]->aspect);

		return $data;
	}

	public function getAccept(Request $request){
		$data = DB::select("select * from accept where id=".$request->formId);
		return $data;
	}

	public function getAcceptByAppId(Request $request){
		$data = DB::select("select * from accept where app_id=".$request->appointmentId);
		return $data;
	}

	public function getAppointmentServices(Request $request) {
		$appointment_services = DB::table('appointment_service')
									->join('sub_service', 'appointment_service.sub_service_id', '=', 'sub_service.id')
									->join('main_service', 'sub_service.parent_id', '=', 'main_service.id')
									->where('appointment_service.appointment_id', $request->appointmentId)
									->select('main_service.title as main', 'sub_service.title as sub', 'sub_service.price', 'appointment_service.is_selected as selected')
									->orderBy('appointment_service.appointment_id', 'asc')
									->get();

		$option_services = DB::table("appointment_option_service")
								->join('option_service', 'option_service.id', '=', 'appointment_option_service.option_service_id')
								->where('appointment_option_service.appointment_id', $request->appointmentId)
								->select('option_service.title as main', 'option_service.title as sub', 'option_service.price', 'appointment_option_service.is_selected as selected')
								->get();

		$index = sizeof($appointment_services);
		for ($i = 0; $i < sizeof($option_services); $i++) {
			$option_services[$i]->main = "Optional Service";
			$appointment_services[$index] = $option_services[$i];
			$index++;
		}
		
		return $appointment_services;
	}
	
	public function updateAppointmentAdvisor(Request $request) {
		DB::table('appointment')
		            ->where('id', $request->appointmentId)
		            ->update(array('advisor_id' => $request->advisorId));
		            
		return response()->success(compact('id'));
	}
	
	public function reportAppointmentInfo(Request $request) {
		$status = DB::table('appointment_status')
						->where('name', 'Closed')
						->first();
						
		DB::table('appointment')
		            ->where('id', $request->appointmentId)
		            ->update(array('report_id' => $request->appointmentId, 'status' => $status->id, 'completion_time' => $request->completionTime, 'completion_description' => $request->completionDescription));
		            
		return response()->success(compact('id'));
	}

	public function newAppointment(Request $request) {
		// adding car info
		$car = new Car;
		$car->make = $request->make;
		$car->year = $request->year;
		$car->model = $request->model;
		$car->trim = $request->trim;
		$car->save();

		// adding customer
		$customer = Customer::where(['phone_number' => $request->phone])->first();
		if ($customer == null) {
			$customer = new Customer;
			$customer->name = $request->name;
			$customer->email = $request->email;
			$customer->phone_number = $request->phone;
			$customer->save();
		}

		// adding Appointment
		$appointment = new Appointment;
		$appointment->customer_id = $customer->id;
		$appointment->car_id = $car->id;

		date_default_timezone_set('Asia/Dubai');
		$appointment->book_time = date("Y-m-d H:i:s");
		$appointment->comment = $request->comment;
		$appointment->status = 1;
		$appointment->contact_method = $request->contact_method;
		$appointment->report_id = 0;
		$appointment->save();

		// adding appointmentservice
		for ($i = 0; $i < sizeof($request->service); $i++) {
			$as = new AppointmentService;
			$as->appointment_id = $appointment->id;
			$as->sub_service_id = $request->service[$i];
			$as->is_selected = $request->service_selected[$i];
			$as->save();
		}

		// adding appointmentoptionservice
		for ($i = 0; $i < sizeof($request->option_services); $i++) {
			$aos = new AppointmentOptionService;
			$aos->appointment_id = $appointment->id;
			$aos->option_service_id = $request->option_services[$i];
			$aos->is_selected = $request->option_service_selected[$i];
			$aos->save();
		}

		// adding appointmenttime
		$date = strtotime($request->date);
		for ($i = 0; $i < sizeof($request->times); $i++) {
			$at = new AppointmentTime;
			$at->appointment_id = $appointment->id;
			$at->appointment_date = date("Y-m-d", $date);
			$dt = strtotime($request->date . " " . $request->times[$i]);
			$at->appointment_time = date("Y-m-d H:i:s", $dt);
			$at->save();
		}

		$sender = Config::get("mail.from");
		
		$data = array(
			'subject'=>'Appointment Booked',
			'sender'=>$sender,
			'emailTo'=>$request->email,
			'data'=>$request
		);

		Mail::send('emails.book', $data, function ($m) use ($data){
        	extract($data);
            $m->from($sender, 'Gargash Autobody');
			$m->to($emailTo, 'Customer')->subject($subject);
        });

		if($request->phone!=''){
			$message='Dear '.$request->name.', Thank you for booking an appointment with Gargash Autobody on '.date('d-m-y', strtotime($request->date)).' at '.date('H:i A', strtotime($request->times[0])).'. We look forward to welcoming you to a new automotive experience! Regards, Gargash Autobody';

	        Twilio::message($request->phone, $message);
	    }
	}

	public function contact(Request $request) {
		$sender = Config::get("mail.from");

		$data = array(
			'subject'=>'Autobody - Call Me Now Action!',
			'sender'=>$sender,
			'emailTo'=>'osman@blueorange.co',
			'data'=>$request
		);

		Mail::send('emails.contact', $data, function ($m) use ($data){
        	extract($data);
            $m->from($sender, 'Gargash Autobody');
			$m->to($emailTo, 'Administrator')->subject($subject);
        });
	}
}
