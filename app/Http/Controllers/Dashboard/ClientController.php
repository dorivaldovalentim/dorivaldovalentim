<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::orderBy('name')->get();

        return Inertia::render('Dashboard/Clients/Index', [
            "clients" => $clients,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'site' => 'required|string',
        ]);

        if ($client = Client::create($validatedData)) {
            return to_route('client.index');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {

        $validatedData = $request->validate([
            'name' => 'required|string',
            'site' => 'required|string',
        ]);

        if ($client->update($validatedData)) {
            return to_route('client.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        if ($client->delete()) {
            return to_route('client.index');
        }
    }
}
