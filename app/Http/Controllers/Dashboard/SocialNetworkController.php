<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SocialNetwork;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialNetworkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socialNetworks = SocialNetwork::orderBy('name')->get();

        return Inertia::render('Dashboard/SocialNetworks/Index', [
            "socialNetworks" => $socialNetworks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'link' => 'required|string',
            'icon' => 'required|string',
        ]);

        if ($socialNetwork = SocialNetwork::create($validatedData)) {
            return to_route('social_network.index');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SocialNetwork $socialNetwork)
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string',
            'link' => 'required|string',
            'icon' => 'required|string',
        ]);

        if ($socialNetwork->update($validatedData)) {
            return to_route('social_network.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialNetwork $socialNetwork)
    {
        if ($socialNetwork->delete()) {
            return to_route('social_network.index');
        }
    }
}
