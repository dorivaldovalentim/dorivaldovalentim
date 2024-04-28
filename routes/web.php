<?php

use App\Http\Controllers\Dashboard\PortfolioController;
use App\Http\Controllers\Dashboard\SkillController;
use App\Http\Controllers\Dashboard\TechnologyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::prefix('/dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/', 'Dashboard/Index')->name('dashboard');
    Route::resource('skill', SkillController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('technology', TechnologyController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('portfolio', PortfolioController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
