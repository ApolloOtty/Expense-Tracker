<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$userID=$_POST['userID'];
$name=$_POST['category'];
//$user = $_POST['email'];
$categories='';

$query = "SELECT type from categories where userID = '$userID' and categoryName='$name' limit 1";

$result = mysqli_query($con, $query);

while($user_data = mysqli_fetch_assoc($result)){
    $categories=$user_data['type'];
}

echo (json_encode($categories));

?>