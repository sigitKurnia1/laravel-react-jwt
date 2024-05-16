<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route register
Route::post('/register', App\Http\Controllers\Api\RegisterController::class)->name('register');

//Route login
Route::post('/login', App\Http\Controllers\Api\LoginController::class)->name('login');

//Route get data user
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route logout
Route::post('/logout', App\Http\Controllers\Api\LogoutController::class)->name('logout');