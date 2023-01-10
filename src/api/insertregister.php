<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("connection.php");
$data=json_decode(file_get_contents("php://input"));

$user = $_POST['email'];
$pass=$_POST['pass'];
$passwordHash = password_hash($pass, PASSWORD_DEFAULT);
$query = "SELECT * from user where email = '$user' limit 1";
		$result = mysqli_query($con, $query);
    if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					
					if($user_data['email'] === $user)
					{
						http_response_code(404);
					}
				}else{

        $sql = "INSERT INTO user (email, password) VALUES ('$user','$passwordHash')";
        mysqli_query($con, $sql);
                }
            }