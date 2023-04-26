<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page_about extends Model
{
    use HasFactory;
    protected $fillable = ['Description'];
    protected $table = "page_about";
}
