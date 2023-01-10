<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$date = new DateTime();

$userID = $_POST['userID'];
$balance=$_POST['balance'];
$month = date("F"); // Get the current month

$check_query = "SELECT * FROM monthlyreport WHERE month='$month'";
$check_result = mysqli_query($con, $check_query);

if (mysqli_num_rows($check_result) == 0) {

if ($date->format('t') == $date->format('d')) {
    $sql = "INSERT INTO monthlyreport (userID, month, balance) VALUES ('$userID','$month', '$balance')";
    mysqli_query($con, $sql);
    
}
}