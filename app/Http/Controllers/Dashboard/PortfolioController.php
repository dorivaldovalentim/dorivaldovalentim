<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\File;
use App\Models\Portfolio;
use App\Models\PortfolioClient;
use App\Models\PortfolioSkill;
use App\Models\PortfolioTechnology;
use App\Models\Skill;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Dashboard/Portfolio/Index", [
            "portfolios" => Portfolio::with('clients', 'skills', 'technologies', 'cover')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Dashboard/Portfolio/Create", [
            "clients" => Client::orderBy('name')->get(),
            "skills" => Skill::orderBy('skill')->get(),
            "technologies" => Technology::orderBy('technology')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'description' => 'required|string',
            'clients' => 'required|array',
            'clients.*' => 'exists:clients,id',
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id',
            'technologies' => 'required|array',
            'technologies.*' => 'exists:technologies,id',
            'file' => 'required|image|mimes:jpeg,png|max:2048',
        ]);

        // Process file upload
        $file = $request->file('file');
        $filePath = $file->store('portfolio', 'public');

        // Create a new File instance for the uploaded image
        $uploadedFile = File::create([
            'name' => $file->getClientOriginalName(),
            'path' => $filePath,
            'type' => $file->getMimeType(),
        ]);

        // Create a new Portfolio instance with the validated data
        $portfolio = Portfolio::create($validatedData);

        // Attach clients, skills, and technologies to the portfolio if they exist
        if ($request->has('clients')) {
            foreach ($validatedData['clients'] as $clientId) {
                PortfolioClient::create([
                    'portfolio_id' => $portfolio->id,
                    'client_id' => $clientId,
                ]);
            }
        }

        if ($request->has('skills')) {
            foreach ($validatedData['skills'] as $skillId) {
                PortfolioSkill::create([
                    'portfolio_id' => $portfolio->id,
                    'skill_id' => $skillId,
                ]);
            }
        }

        if ($request->has('technologies')) {
            foreach ($validatedData['technologies'] as $techId) {
                PortfolioTechnology::create([
                    'portfolio_id' => $portfolio->id,
                    'technology_id' => $techId,
                ]);
            }
        }

        // Associate the uploaded file with the portfolio using polymorphic relationship
        $portfolio->cover()->associate($uploadedFile);
        $portfolio->save();

        // Redirect or return a response as needed
        return to_route('portfolio.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
