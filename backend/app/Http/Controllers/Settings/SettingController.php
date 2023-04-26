<?php

namespace App\Http\Controllers\Settings;

use App\http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $settings = Setting::all()->first();
        return $settings;
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


        if (!empty($request->file("logo"))) {

            $logo = $request->file("logo");
            $ex  = $logo->getClientOriginalExtension();
            $fileName = Str::random() . "." . $ex;
            $lg = $logo->move("attachments/settings", $fileName);
        } else {
            $lg = $request->logo;
        }
        if ($request->hasFile("background_image")) {
            $backImg = $request->file("background_image");
            $ex2  = $backImg->getClientOriginalExtension();
            $fileName2 = Str::random() . "." . $ex2;
            $bckImg = $backImg->move("attachments/settings", $fileName2);
        } else {
            $bckImg =   $request->background_image;
        }
        $setting = Setting::all()->first();
        if ($setting) {
            $setting->logo = $lg;
            $setting->Title = $request->Title;
            $setting->background_image = $bckImg;
            $setting->save();
            return response()->json([
                'message' => 'setting updaed'
            ]);
        } else {
            $logo = $request->file("logo");
            $ex  = $logo->getClientOriginalExtension();
            $fileName = Str::random() . "." . $ex;
            $logo->move("attachments/settings", $fileName);

            $backImg = $request->file("background_image");
            $ex2  = $backImg->getClientOriginalExtension();
            $fileName2 = Str::random() . "." . $ex2;
            $backImg->move("attachments/settings", $fileName2);
            Setting::create([
                'logo' => "attachments/settings/" . $fileName,
                'Title' => $request->Title,
                'background_image' => "attachments/settings/" . $fileName2,
            ]);
            return response()->json([
                'message' => 'setting inserted'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Setting $setting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
