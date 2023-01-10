<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));
// Set your email address and subject
$to = 'alex.kaneki@yahoo.com';
$subject = 'Spending Limit Alert';

// Get the user's spending limit and current spending from React.js
$spending_limit = 210;//$_POST['spending_limit'];
$current_spending = 200;//$_POST['current_spending'];

// Calculate the percentage of the way to the spending limit
$percentage = ($current_spending / $spending_limit) * 100;

// Send an email if the user is 90% or more of the way to their spending limit
if ($percentage >= 90) {
    $message = "You are $percentage% of the way to your spending limit of $spending_limit. Please be mindful of your spending.";
    mail($to, $subject, $message);
}

?>
