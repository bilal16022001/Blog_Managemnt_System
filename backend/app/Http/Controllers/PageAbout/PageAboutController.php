<?php

namespace App\Http\Controllers\PageAbout;

use App\http\Controllers\Controller;
use App\Models\Page_about;
use Illuminate\Http\Request;

class PageAboutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $about = Page_about::all();
        return $about;
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
     * @param  \App\Models\Page_about  $page_about
     * @return \Illuminate\Http\Response
     */
    public function show(Page_about $page_about)
    {
        //
    }

    
    public function edit(Page_about $page_about)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Page_about  $page_about
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $about = Page_about::FindOrFail($id);
        $about->Description = $request->Description;
        $about->save();
        return response()->json([
            'message' => 'about page updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Page_about  $page_about
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page_about $page_about)
    {
        //
    }
}
