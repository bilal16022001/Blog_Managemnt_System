<?php

namespace App\Http\Controllers\Subscribes;

use App\http\Controllers\Controller;
use App\Models\SubScribe;
use Illuminate\Http\Request;

class SubScribeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subScribes = SubScribe::all();
        return $subScribes;
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
        SubScribe::create([
            'Name' => $request->Name,
            'Email' => $request->Email
        ]);

        return response()->json([
            'message' => 'subsribe added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubScribe  $subScribe
     * @return \Illuminate\Http\Response
     */
    public function show(SubScribe $subScribe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubScribe  $subScribe
     * @return \Illuminate\Http\Response
     */
    public function edit(SubScribe $subScribe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubScribe  $subScribe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SubScribe $subScribe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubScribe  $subScribe
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        SubScribe::destroy($id);

        return response()->json([
            'message' => 'subsribe deleted'
        ]);
    }
}
