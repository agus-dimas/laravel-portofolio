<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/contact', function (Request $request) {
    $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'message' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    // In a live system, you could log, email, or save the submission to a database table.
    return response()->json([
        'success' => true,
        'message' => 'Transmission received successfully!',
        'data' => $request->only(['name', 'email', 'message'])
    ]);
});
