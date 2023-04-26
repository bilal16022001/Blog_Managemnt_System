<?php

namespace App\Http\Controllers\Posts;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with("category", "SubCategory")->get();
        return $posts;
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
        $file = $request->file("Image");
        $ex  =  $file->getClientOriginalExtension();
        $fileName = Str::random() . "." . $ex;
        $file->move("attachments/Posts", $fileName);

        Post::create([
            'Title' => $request->Title,
            'Cat_id' => $request->Cat_id,
            'SubCat_id' => $request->SubCat_id,
            'Description' => $request->Description,
            'Image' => "attachments/Posts/" . $fileName
        ]);

        return response()->json([
            'message' => 'data added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $post = Post::with("category", "SubCategory")->where("id", $id)->get();
        $post = Post::FindOrFail($id);
        return $post;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::FindOrFail($id);
        $post->Title = $request->Title;
        $post->Cat_id = $request->Cat_id;
        $post->SubCat_id = $request->SubCat_id;
        $post->Description = $request->Description;

        if (empty($request->file("Image"))) {
            $img = $request->Image;
        } else {
            $file = $request->Image;
            $ex  =  $file->getClientOriginalExtension();
            $fileName = Str::random() . "." . $ex;
            $file->move("attachments/Posts", $fileName);
            $img = "attachments/Posts/" .  $fileName;
        }

        $post->Image = $img;
        $post->save();
        return response()->json([
            'message' => 'data updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Post::destroy($id);

        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
