<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sub_Category extends Model
{
    use HasFactory;
    protected $fillable = ['Name_subCat', 'Cat_id'];
    protected $table = "sub_categories";

    public function Category()
    {
        return $this->belongsTo("\App\Models\Category", "Cat_id");
    }
}
