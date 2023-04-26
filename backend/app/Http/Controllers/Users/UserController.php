<?php


namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return $users;
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|Email',
            'password' => 'required|min:4'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => 1
        ]);
    }


    public function show($id)
    {
        $Subadmin = User::FindOrFail($id);
        return $Subadmin;
    }

    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|Email',
        ]);

        $subA = User::findOrFail($id);
        $subA->name = $request->name;
        $subA->email = $request->email;

        if (Hash::needsRehash($request->password)) {
            $pass = Hash::make($request->password);
        } else {
            $pass = $request->password;
        }

        $subA->password = $pass;
        $subA->save();

        return response()->json([
            'message' => 'Profile is updated'
        ]);
    }

    public function destroy($id)
    {
        //
    }
}
