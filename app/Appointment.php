<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $table = "appointment";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'customer_id', 'car_id', 'advisor_id', 'book_time', 'accept_time', 'completion_time', 'completion_description', 'report_id', 'status', 'comment', 'contact_method'];
}
