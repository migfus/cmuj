<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kra8\Snowflake\HasShortflakePrimary;

class File extends Model
{
    use HasFactory, HasShortflakePrimary;

  protected $fillable = [
    'info_id', 'filename', 'url', 'size'
  ];
}
