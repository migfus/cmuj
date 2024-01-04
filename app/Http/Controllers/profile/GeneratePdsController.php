<?php

namespace App\Http\Controllers\profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Models\Info;
use App\Models\Education;
use App\Models\Eligibility;
use App\Models\Experience;
use App\Models\Voluntary;
use App\Models\Seminar;

use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class GeneratePdsController extends Controller
{
  public function index(Request $req) {
    if(!$req->user()->can('index profile')) {
      return $this->G_UnauthorizedResponse();
    }

    $infoID = $req->user()->info->id;

    $personal = Info::
      where('id', $infoID)
      ->with(['civil_status', 'blood_type', 'mobile_numbers'])
      ->first();
    $user = $req->user();
    $educations = Education::
      where('info_id', $infoID)
      ->with('education_level')
      ->orderBy('from', 'ASC')
      ->get();
    $eligibilities = Eligibility::
      where('info_id', $infoID)
      ->orderBy('exam_date', 'DESC')
      ->get();
    $experience = Experience::
      where('info_id', $infoID)
      ->with(['salary_type', 'work_status'])
      ->orderBy('from', 'DESC')
      ->get();
    $voluntaries = Voluntary::
      where('info_id', $infoID)
      ->orderBy('from', 'DESC')
      ->get();
    $seminars = Seminar::
      where('info_id', $infoID)
      ->with('seminar_type')
      ->orderBy('from', 'DESC')
      ->get();

    $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load('./pds_template.xlsx');

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('D10', '[Belonio]');
    $sheet->setCellValue('D11', '[First Name]');
    $sheet->setCellValue('D12', '[MIddle Name]');
    $sheet->setCellValue('L11', "NAME EXTENSION (JR., SR) \n [JR}");
    $sheet->setCellValue('D13', 'MM/DD/YYYY');
    $sheet->setCellValue('D15', '[Place of Birth]');

    $sheet->getCell('D16')->setValue(true);

    $sheet->setCellValue('D22', '[height]');
    $sheet->setCellValue('D24', '[weight]');
    $sheet->setCellValue('D25', '[Blood Type]');
    $sheet->setCellValue('D27', '[GSIS]');
    $sheet->setCellValue('D29', '[Pag-ibitg]');
    $sheet->setCellValue('D31', '[Philhealth]');
    $sheet->setCellValue('D32', '[SSS]');
    $sheet->setCellValue('D33', '[TIN]');
    $sheet->setCellValue('D34', '[Agency Phone]');

    $sheet->setCellValue('I17', '[Res - House]');
    $sheet->setCellValue('L17', '[Res - Street]');
    $sheet->setCellValue('I19', '[Res - Subdivision]');
    $sheet->setCellValue('L19', '[Res - Barangay]');
    $sheet->setCellValue('I22', '[Res - City]');
    $sheet->setCellValue('L22', '[Res - Province]');
    $sheet->setCellValue('L24', '[Res - ZIP]');

    $sheet->setCellValue('I25', '[Per - House]');
    $sheet->setCellValue('L25', '[Per - Street]');
    $sheet->setCellValue('I27', '[Per - Subdivision]');
    $sheet->setCellValue('L27', '[Per - Barangay]');
    $sheet->setCellValue('I29', '[Per - City]');
    $sheet->setCellValue('L29', '[Per - Province]');
    $sheet->setCellValue('I31', '[Per - ZIP]');

    $sheet->setCellValue('I32', '[Telephone]');
    $sheet->setCellValue('I33', '[Mobile]');
    $sheet->setCellValue('I34', '[Email]');


    $writer = new Xlsx($spreadsheet);
    $file_path = './uploads/generated/pds_'.Carbon::now()->format('Y-M-d-h-m-s').'.xlsx';
    $writer->save($file_path);

    header('Content-Description: File Transfer');
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file_path));

    readfile($file_path);
    exit;

  }
}
