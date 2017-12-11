<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubService extends Model
{
    protected $table = "sub_service";
            
        // An array of the fields we can fill in the time_entries table
    protected $fillable = ['id', 'parent_id', 'title', 'price', 'description'];
}
