<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = "car";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'make', 'year', 'model', 'trim'];
}
