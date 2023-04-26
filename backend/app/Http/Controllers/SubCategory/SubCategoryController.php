<?php

namespace App\Http\Controllers\SubCategory;

use App\Http\Controllers\Controller;

use App\Models\Sub_Category;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{

    public function index()
    {
        $sub_Category = Sub_Category::with("Category")->get();
        return $sub_Category;
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
            'Name_subCat' => 'required',
            'Cat_id' => 'required|numeric'
        ]);

        Sub_Category::create([
            'Name_subCat' => $request->Name_subCat,
            'Cat_id' => $request->Cat_id
        ]);

        return response()->json([
            'message' => 'data added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sub_Category  $sub_Category
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $sub_Category = Sub_Category::findOrFail($id);
        return $sub_Category;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sub_Category  $sub_Category
     * @return \Illuminate\Http\Response
     */
    public function edit(Sub_Category $sub_Category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sub_Category  $sub_Category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $sub_Category = Sub_Category::findOrFail($id);
        $sub_Category->Name_subCat = $request->Name_subCat;
        $sub_Category->Cat_id = $request->Cat_id;
        $sub_Category->save();

        return response()->json([
            'message' => 'data updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sub_Category  $sub_Category
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Sub_Category::destroy($id);

        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
