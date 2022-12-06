<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; characterset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	include("connection.php");

		//something was posted
		$user_name = $_POST['email'];
		$password = $_POST['pass'];

		$query = "SELECT email, password from user where email = '$user_name' and password='$password'limit 1";
		$result = mysqli_query($con, $query);
    if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					
					if($user_data['email'] === $user && $user_data['password']===$password)
					{
						http_response_code(100);
					}
				}else{
				http_response_code(404);}
			}

?>