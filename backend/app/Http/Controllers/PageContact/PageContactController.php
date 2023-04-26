<?php

namespace App\Http\Controllers\PageContact;

use App\Http\Controllers\Controller;
use App\Models\Page_Contact;
use Illuminate\Http\Request;

class PageContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contact = Page_Contact::all();
        return $contact;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Page_Contact  $page_Contact
     * @return \Illuminate\Http\Response
     */
    public function show(Page_Contact $page_Contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Page_Contact  $page_Contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Page_Contact $page_Contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page_Contact  $page_Contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $contact = Page_Contact::FindOrFail($id);
        $contact->Title = $request->Title;
        $contact->Description = $request->Description;
        $contact->Address = $request->Address;
        $contact->Phone = $request->Phone;
        $contact->Email = $request->Email;
        $contact->Copyright = $request->Copyright;
        $contact->save();

        return response()->json([
            'message' => 'contact page updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page_Contact  $page_Contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page_Contact $page_Contact)
    {
        //
    }
}
