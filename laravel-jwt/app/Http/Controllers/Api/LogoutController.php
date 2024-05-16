<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        //Remove token
        $removeToken = JWTAuth::invalidate(JWTAuth::getToken());
        
        if ($removeToken) {
            //Return reponse JSON
            return response()->json([
                'success' => true,
                'message' => 'Logout berhasil',
            ]);
        }
    }
}
