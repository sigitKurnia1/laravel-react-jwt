<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //Set validation
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        //If validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //Get credentials from request
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password anda salah',
            ], 401);
        }

        //If auth success
        return response()->json([
            'success' => true,
            'user' => auth()->user(),
            'token' => $token,
        ], 200);
    }
}
