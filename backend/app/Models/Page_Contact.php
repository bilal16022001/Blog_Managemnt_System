<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page_Contact extends Model
{
    use HasFactory;
    protected $fillable = ['Title', 'Description', 'Address', 'Phone', 'Email', 'Copyright'];
    protected $table = "page_contact";
}
