<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['Post_id', 'Name', 'Email', 'Approve', 'Comment'];

    public function post()
    {
        return $this->belongsTo("\App\Models\Post", "Post_id");
    }
}
