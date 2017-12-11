<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = "customer";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'name', 'email', 'phone'];
}
