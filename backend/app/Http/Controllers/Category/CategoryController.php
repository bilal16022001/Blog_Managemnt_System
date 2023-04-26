<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $Categories = Category::all();
        return $Categories;
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
        $request->validate([
            'NameCat' => 'required|string',
        ]);

        Category::UpdateOrCreate([
            'NameCat' => $request->NameCat
        ]);

        return response()->json([
            'message' => 'data added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Category = Category::findOrFail($id);
        return $Category;
    }

    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'NameCat' => 'required|string',
        ]);

        $cat = Category::findOrFail($id);
        $cat->NameCat = $request->NameCat;
        $cat->save();

        return response()->json([
            'message' => 'data updeted'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Category::destroy($id);

        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
