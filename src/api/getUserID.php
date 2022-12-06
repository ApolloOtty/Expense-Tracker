<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$name=$_POST['email'];
//$user = $_POST['email'];

$query = "SELECT userID from user where email = '$name'";
$result = mysqli_query($con, $query);
$user_data = mysqli_fetch_assoc($result);
echo json_encode($user_data);