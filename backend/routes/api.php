<?php

use App\Http\Controllers\Admins\SubAdminController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Comments\CommentController;
use App\Http\Controllers\PageAbout\PageAboutController;
use App\Http\Controllers\PageContact\PageContactController;
use App\Http\Controllers\Posts\PostController;
use App\Http\Controllers\Settings\SettingController;
use App\Http\Controllers\SubCategory\SubCategoryController;
use App\Http\Controllers\Subscribes\SubScribeController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::apiResource("Admin", UserController::class);
Route::apiResource("SubAdmins", SubAdminController::class);
Route::apiResource("Category", CategoryController::class);
Route::apiResource("Sub_Category", SubCategoryController::class);
Route::apiResource("Posts", PostController::class);
Route::apiResource("Comments", CommentController::class);
Route::apiResource("PageAbout", PageAboutController::class);
Route::apiResource("PageContact", PageContactController::class);
Route::apiResource("Subscribers", SubScribeController::class);
Route::apiResource("Settings", SettingController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
