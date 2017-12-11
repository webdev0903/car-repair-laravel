<?php

namespace App\Http\Controllers;

use App\MainService;
use App\SubService;
use App\OptionService;

use Illuminate\Http\Request;

use App\Http\Requests;

class ServicesController extends Controller
{
    public function index() {
    	
	}
	
	public function getMainServices() {
		$main_services = MainService::all();
		
		return $main_services;
	}

    public function getAvailableMainServices() {
        $main_services = MainService::where('is_show', '=', 1)->get();

        return $main_services;
    }

    public function getAllOptionServices() {
        $option_services = OptionService::all();

        return $option_services;
    }

    public function getAllSubServices() {
        $sub_services = SubService::all();

        return $sub_services;
    }

    public function getOnlyOptionServices() {
        $option_services = OptionService::where('type', '=', 1)->get();

        return $option_services;
    }

    public function getFreeOptionService() {
        $option_services = OptionService::where('type', '=', 2)->get();

        return $option_services;
    }
	
	public function getSubServices(Request $request) {
		$sub_services = SubService::where('parent_id', '=', $request->serviceId)->get();
		
		return $sub_services;
	}
	
	public function addMainService(Request $request)
    {
	    $service = MainService::create([
	        'title' => $request->name
	    ]);
    
    	return response()->success(compact('service'));
    }

    public function addOptionService(Request $request)
    {
        $service = OptionService::create([
            'title' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'type' => $request->type
        ]);
    
        return response()->success(compact('service'));
    }
    
    public function addSubService(Request $request)
    {
        $service = SubService::create([
        	'parent_id' => $request->parentId,
            'title' => $request->name,
            'price' => $request->price,
            'description' => $request->description
        ]);
    
    	return response()->success(compact('service'));
    }
    
    public function updateMainService(Request $request)
    {
        $service = MainService::find($request->id);
    	
    	$serviceData = [
            'title' => $request->title,
            'is_show' => $request->is_show
        ];

        MainService::where('id', '=', $request->id)->update($serviceData);
    	
        return response()->success('success');
    }

    public function updateOptionService(Request $request)
    {
        $service = OptionService::find($request->id);
        
        $serviceData = [
            'title' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'type' => $request->type
        ];

        OptionService::where('id', '=', $request->id)->update($serviceData);
        
        return response()->success('success');
    }
    
    public function updateSubService(Request $request)
    {
        $service = SubService::find($request->id);
    	
    	$serviceData = [
            'title' => $request->title,
            'price' => $request->price,
            'description' => $request->description
        ];

        SubService::where('id', '=', $request->id)->update($serviceData);
    	
        return response()->success('success');
    }
    
    public function deleteMainService(Request $request)
    {
    	MainService::destroy($request->id);
    	
    	return response()->success('success');
    }

    public function deleteOptionService(Request $request)
    {
        OptionService::destroy($request->id);
        
        return response()->success('success');
    }
    
    public function deleteSubService(Request $request)
    {
    	SubService::destroy($request->id);
    	
    	return response()->success('success');
    }
    
    public function getMainServiceInfo(Request $request)
    {
        $service = MainService::find($request->serviceId);

        return response()->success($service);
    }

    public function getOptionServiceInfo(Request $request)
    {
        $service = OptionService::find($request->serviceId);

        return response()->success($service);
    }
    
    public function getSubServiceInfo(Request $request)
    {
        $service = SubService::find($request->serviceId);

        return response()->success($service);
    }
}
