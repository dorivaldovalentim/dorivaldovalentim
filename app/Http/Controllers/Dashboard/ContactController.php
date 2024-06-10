<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Contact;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::orderByDesc('created_at')->get();

        return inertia('Dashboard/Contacts/Index', [
            "contacts" => $contacts,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        $contact->seen = 1;
        $contact->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        if ($contact->delete()) {
            return to_route('contact.index');
        }
    }
}
