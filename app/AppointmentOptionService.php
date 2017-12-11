<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppointmentOptionService extends Model
{
    protected $table = "appointment_option_service";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'appointment_id', 'option_service_id', 'is_selected'];
}
