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
        Schema::create('page_contact', function (Blueprint $table) {
            $table->id();
            $table->string("Title");
            $table->string("Description");
            $table->string("Address");
            $table->string("Phone");
            $table->string("Email");
            $table->string("Copyright");
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
        Schema::dropIfExists('page__contacts');
    }
};
