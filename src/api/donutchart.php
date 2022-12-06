<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$userID=$_POST['userID'];
//$user = $_POST['email'];
$categories=array();

$query = "SELECT categoryName as name, amount as count from transactions where categoryName in (SELECT categoryName from categories where type='expense') and userID='$userID' AND date BETWEEN (NOW() - INTERVAL 28 DAY) AND NOW() GROUP BY categoryName";

$result = mysqli_query($con, $query);

while($user_data = mysqli_fetch_assoc($result)){
    $categories[]=$user_data;
}

echo (json_encode($categories));

?>