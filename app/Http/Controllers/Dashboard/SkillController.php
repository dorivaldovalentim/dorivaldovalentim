<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::orderBy('skill')->get();

        return Inertia::render('Dashboard/Skills/Index', [
            "skills" => $skills,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'skill' => 'required|string',
        ]);

        if ($skill = Skill::create($validatedData)) {
            return to_route('skill.index');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Skill $skill)
    {
        
        $validatedData = $request->validate([
            'skill' => 'required|string',
        ]);

        if ($skill->update($validatedData)) {
            return to_route('skill.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        if ($skill->delete()) {
            return to_route('skill.index');
        }
    }
}
