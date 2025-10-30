<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {

    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('signin', [AuthController::class, 'signin']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('signout', [AuthController::class, 'signout']);

        Route::get('posts', [PostController::class, 'index']);
        Route::get('posts/{post}', [PostController::class, 'show']);
        Route::post('posts', [PostController::class, 'store']);
        Route::put('posts/{post}', [PostController::class, 'update']);
        Route::delete('posts/{post}', [PostController::class, 'destroy']);
    });
});
