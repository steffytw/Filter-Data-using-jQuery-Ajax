<?php
$Patient = htmlspecialchars($_POST["Patient"]);
$PID = htmlspecialchars($_POST["PID"]);
$DOB=htmlspecialchars($_POST["DOB"]);
echo "Welcome , $Patient !. Your PID: $PID and date of birth: $DOB has been successfully submitted" . "";
?>