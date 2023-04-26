<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Models\SubAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SubAdminController extends Controller
{

    public function index()
    {
        $SubAdmins = SubAdmin::all();
        return $SubAdmins;
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required',
            'Email' => 'required|Email',
            'password' => 'required|min:4'
        ]);

        SubAdmin::create([
            'Name' => $request->Name,
            'Email' => $request->Email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'data is inserted'
        ]);
    }

    public function show($id)
    {
        $Subadmin = SubAdmin::FindOrFail($id);
        return $Subadmin;
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'Name' => 'required',
            'Email' => 'required|Email',
        ]);

        $subA = SubAdmin::findOrFail($id);
        $subA->Name = $request->Name;
        $subA->Email = $request->Email;
        $subA->password = Hash::make($request->Name);
        $subA->save();

        return response()->json([
            'message' => 'data is updated'
        ]);
        // return $request;
    }


    public function destroy($id)
    {
        SubAdmin::destroy($id);

        return response()->json([
            'message' => 'data is deleted'
        ]);
    }
}
