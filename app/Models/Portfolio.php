<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = ["name", "excerpt", "description", "image_id"];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'portfolio_clients');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'portfolio_skills');
    }
    
    public function technologies()
    {
        return $this->belongsToMany(Technology::class, 'portfolio_technologies');
    }

}
