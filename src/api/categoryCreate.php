<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$type = $_POST['type'];
$name=$_POST['name'];
$userID=$_POST['userID'];

$query = "SELECT * from categories where categoryName = '$name' and userID='$userID'";
		$result = mysqli_query($con, $query);
    if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					
					if($user_data['categoryName'] === $name)
					{
						http_response_code(404);
					}
				}else{

        $sql = "INSERT INTO categories (userID, type, categoryName) VALUES ('$userID', '$type','$name')";
        mysqli_query($con, $sql);
                }
            }