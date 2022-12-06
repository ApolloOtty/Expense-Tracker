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

$query = "SELECT transactions.categoryName, amount, type, date from transactions, categories where transactions.userID = '$userID' and transactions.categoryName = categories.categoryName and date BETWEEN (NOW() - INTERVAL 7 DAY) AND NOW() ORDER BY date ";

$result = mysqli_query($con, $query);

while($user_data = mysqli_fetch_assoc($result)){
    $categories[]=$user_data;
}

echo (json_encode($categories));

?>