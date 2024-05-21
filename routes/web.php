<?php

use App\Http\Controllers\Dashboard\ClientController;
use App\Http\Controllers\Dashboard\PortfolioController;
use App\Http\Controllers\Dashboard\SkillController;
use App\Http\Controllers\Dashboard\SocialNetworkController;
use App\Http\Controllers\Dashboard\TechnologyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');
Route::inertia('/history', 'History')->name('history');
Route::inertia('/skills', 'Skills')->name('skills');
Route::inertia('/portfolio', 'Portfolio')->name('portfolio');
Route::inertia('/contacts', 'Contacts')->name('contacts');

Route::prefix('/dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/', 'Dashboard/Index')->name('dashboard');
    Route::resource('client', ClientController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('skill', SkillController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('technology', TechnologyController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('portfolio', PortfolioController::class);
    Route::resource('social_network', SocialNetworkController::class)->only(['index', 'store', 'update', 'destroy']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
