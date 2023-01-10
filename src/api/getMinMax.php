<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$userID = $_POST['userID'];
$month = date("F"); // Get the current month
$data=array();

// Check if there is already a row with the current month value
$check_query = "SELECT MIN(t.sum) as min_sum, c.categoryName as min_category, MAX(t.sum) as max_sum, (
    SELECT c2.categoryName
    FROM (
        SELECT categoryName, SUM(amount) as sum
        FROM transactions
        WHERE userID = '$userID'
        AND MONTHNAME(date) = '$month'
        GROUP BY categoryName
    ) as t2
    INNER JOIN categories c2 ON t2.categoryName = c2.categoryName
    WHERE t2.sum = MAX(t.sum)
) as max_category
FROM (
    SELECT categoryName, SUM(amount) as sum
    FROM transactions
    WHERE userID = '$userID'
    AND MONTHNAME(date) = '$month'
    GROUP BY categoryName
) as t
INNER JOIN categories c ON t.categoryName = c.categoryName
WHERE c.type = 'expense'
";


$check_result = mysqli_query($con, $check_query);

while($user_data = mysqli_fetch_assoc($check_result)){
    $data[]=$user_data;
}

echo (json_encode($data));