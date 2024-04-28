<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $technologies = Technology::orderBy('technology')->get();

        return Inertia::render('Dashboard/Technologies/Index', [
            "technologies" => $technologies,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'technology' => 'required|string',
        ]);

        if ($technology = Technology::create($validatedData)) {
            return to_route('technology.index');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Technology $technology)
    {
        
        $validatedData = $request->validate([
            'technology' => 'required|string',
        ]);

        if ($technology->update($validatedData)) {
            return to_route('technology.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technology $technology)
    {
        if ($technology->delete()) {
            return to_route('technology.index');
        }
    }
}
