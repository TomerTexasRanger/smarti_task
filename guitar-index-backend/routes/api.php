<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuitarController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Get All Guitars
Route::get('guitars',[GuitarController::class,'getGuitar']);

//Get Guitar By ID
Route::get('guitars/{id}',[GuitarController::class,'getGuitarById']);

//Add Guitar
Route::post('addGuitar',[GuitarController::class, 'addGuitar']);

//Update Guitar
Route::put('updateGuitar/{id}',[GuitarController::class,'updateGuitar']);

//Delete Guitar
Route::delete('deleteGuitar/{id}',[GuitarController::class,'deleteGuitar']);
