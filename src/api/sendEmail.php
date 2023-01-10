<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/src/Exception.php';
require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';

$email = $_POST['email'];
$procent = $_POST['percent'];
if ($procent >=90 ){
$mail=new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username='test.proiect25@gmail.com';
$mail->Password='aqemllitojsrzsow';
$mail->SMTPSecure='ssl';
$mail->Port=465;

$mail->setFrom('alexkaneki25@gmail.com');
$mail->addAddress($email);

$mail->isHTML(true);
$mail->Subject="You are getting closer to your spending limit";
$mail->Body="You are $procent% on your way to your spending limit! Be mindful of your spendings!";
//$mail->send();
}



