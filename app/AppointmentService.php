<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppointmentService extends Model
{
    protected $table = "appointment_service";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'appointment_id', 'sub_service_id', 'is_selectd'];
}
