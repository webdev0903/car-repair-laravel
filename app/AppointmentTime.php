<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppointmentTime extends Model
{
    protected $table = "appointment_time";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'appointment_id', 'appointment_date', 'appointment_time'];
}
