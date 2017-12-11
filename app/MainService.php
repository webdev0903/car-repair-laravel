<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MainService extends Model
{
    protected $table = "main_service";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'title', 'is_show', 'image_url'];
        
}
