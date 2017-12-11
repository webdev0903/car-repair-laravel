<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OptionService extends Model
{
    protected $table = "option_service";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'title', 'description', 'price', 'type'];
        
}
