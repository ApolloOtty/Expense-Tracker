<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$userID = $_POST['userID'];
$category=$_POST['category'];
$amount=$_POST['amount'];
$date=date("Y-m-d");
$sql = "INSERT INTO transactions (userID, categoryName, amount, date) VALUES ('$userID','$category','$amount', '$date')";
mysqli_query($con, $sql);

?>