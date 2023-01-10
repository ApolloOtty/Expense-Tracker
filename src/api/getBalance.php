<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$userID = $_POST['userID'];
$balance=array();

$check_query = "SELECT mr.month, COALESCE((SELECT SUM(t.amount) FROM transactions t
JOIN categories c ON t.categoryName = c.categoryName
WHERE MONTHNAME(t.date) LIKE mr.month AND c.type = 'expense'), 0) as balance,
MAX(ui.spendingLimit) as spendingLimit
FROM monthlyreport mr
JOIN userinput ui ON mr.month = ui.month
WHERE mr.userID='$userID'
GROUP BY mr.month
ORDER BY MONTH(mr.month)
";
$check_result = mysqli_query($con, $check_query);


while($user_data = mysqli_fetch_assoc($check_result)){
    $balance[]=$user_data;
}

    echo (json_encode($balance)); 
