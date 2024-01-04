<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
      Schema::create('infos', function (Blueprint $table) {
        $table->id();
        $table->bigInteger('user_id')->unsigned()->unique();
        $table->string('last_name');
        $table->string('first_name');
        $table->string('mid_name')->nullable();
        $table->string('ext_name')->nullable();
        $table->bigInteger('civil_status_id')->unsigned();
        $table->date('birth_day');
        $table->integer('birth_place_id')->unsigned();
        $table->bigInteger('blood_type_id')->unsigned(); //
        $table->boolean('sex')->default(1);
        $table->decimal('height', 5, 2);
        $table->decimal('weight', 5, 2);
        $table->integer('address_id')->unsgined();
        $table->string('address_barangay')->nullable();
        $table->string('address_street')->nullable();
        $table->string('address')->nullabe()->comment('specific address');
        $table->string('gsis_id')->nullable();
        $table->string('philhealth_id')->nullable();
        $table->string('sss_id')->nullable();
        $table->string('agency_id')->nullable();
        $table->string('pagibig_id')->nullable();
        $table->string('tin_id')->nullable();
        $table->timestamps();
      });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
      Schema::dropIfExists('infos');
  }
};
