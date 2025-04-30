<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/bienvenida', function () {
    return 'Bienvenidos a Programacion Computacional IV.';
});
Route::get('/usuario/{id}/{nombre}/{apellido}', function ($id, $nombre, $apellido) {
    return 'User #: '.$id. ', Nombre: '.$nombre .' Apellido: '.$apellido;
})->where('id', '[0-9]+');

Route::controller(AlumnoController::class)->group(function () {
    Route::get('/alumno', 'index');
    Route::post('/alumno', 'store');
    Route::put('/alumno', 'update');
    Route::delete('/alumno', 'destroy');
});