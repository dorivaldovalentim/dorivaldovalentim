<?php

namespace Database\Seeders;

use Hash;
use App\Models\Client;
use App\Models\Skill;
use App\Models\SocialNetwork;
use App\Models\Technology;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            "name" => env("DEFAULT_USER"),
            "email" => env("DEFAULT_EMAIL"),
            "password" => Hash::make(env("DEFAULT_PASSWORD")),
        ]);

        // Seed skills
        Skill::create(['skill' => 'BackEnd']);
        Skill::create(['skill' => 'FrontEnd']);

        // Seed clients
        Client::create(['name' => 'API Soluções', 'site' => 'https://apisolucoes.com']);
        Client::create(['name' => 'Digital Factory', 'site' => 'https://digitalfactory.com']);
        Client::create(['name' => 'Zap', 'site' => 'https://zap.com']);

        // Generate and seed additional technologies
        $additionalTechnologies = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python', 'Ruby', 'Java', 'React', 'Vue.js', 'Angular', 'Node.js', 'SQL'];
        foreach ($additionalTechnologies as $tech) {
            Technology::create(['technology' => $tech]);
        }

        // Seed social networks
        SocialNetwork::create(['name' => 'Facebook', 'link' => 'https://facebook.com', 'icon' => '<svg>...</svg>']);
        SocialNetwork::create(['name' => 'Twitter', 'link' => 'https://twitter.com', 'icon' => '<svg>...</svg>']);
        SocialNetwork::create(['name' => 'Instagram', 'link' => 'https://instagram.com', 'icon' => '<svg>...</svg>']);
    }
}
