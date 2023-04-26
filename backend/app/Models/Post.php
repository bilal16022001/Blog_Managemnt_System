<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['Title', 'Cat_id', 'SubCat_id', 'Description', 'Image'];

    //get category

    public function category()
    {
        return $this->belongsTo("\App\Models\Category", "Cat_id");
    }

    //get sub Category

    public function SubCategory()
    {
        return $this->belongsTo("\App\Models\Sub_Category", "SubCat_id");
    }
}
