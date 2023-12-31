<?php
namespace App\Http\Controllers\public;

use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Models\Event;

class EventPublicController extends Controller
{
  public function index(Request $req) {
    $data = [];
    if($req->currentDate) {
      // BUG fix for unwanted inputs
      // NOTE Output Events for 3 months prior, to compensate the loading.
      $data = Event::where('start', '>=', Carbon::createFromFormat('Y-m-d', $req->currentDate)->startOfMonth()->subMonth(6)) // -6 month for allowance evnt
        ->where('start', '<=', Carbon::createFromFormat('Y-m-d', $req->currentDate)->endOfMonth()->addMonth(6)) // +6 month for allowance event
        ->with('EventCategory')
        ->get();
    }
    else {
      $data = Event::where('start', '>=', Carbon::now()->startOfMonth()->subMonth(6))
        ->where('start', '<=', Carbon::now()->endOfMonth()->addMonth(6))
        ->with('EventCategory')
        ->get();
    }

    return response()->json([
      ...$this->G_ReturnDefault(),
      'data' => $data,
    ]);
  }

  public function getCount() {
    $dateCount = Event::where('start', '>=', Carbon::now()->startOfMonth())
    ->where('start', '<=', Carbon::now()->endOfMonth())
    ->with('EventCategory')
    ->count();

    return response()->json([
      ...$this->G_ReturnDefault(),
      'count' => $dateCount,
    ]);
  }
}
