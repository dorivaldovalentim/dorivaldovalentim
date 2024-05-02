<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PortfolioTechnology extends Model
{
    use HasFactory;
    use HasUuids;

    protected $guarded = [];

    public function portfolio()
    {
        return $this->belongsToMany(Portfolio::class);
    }
    
}
