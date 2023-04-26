<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string("Title");
            $table->foreignId("Cat_id")->references("id")->on("categories")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("SubCat_id")->references("id")->on("sub_categories")->onDelete("cascade")->onUpdate("cascade");
            $table->string("Description");
            $table->string("Image");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
