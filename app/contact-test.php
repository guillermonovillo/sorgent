<?php 
    $name="this is";
    $last="a test";
    $email="test ".date('Y-m-d H:i:s');
 require 'vendor/autoload.php';


    $mail=new PHPMailer();


//Host: FTP://web2.bridgerconway.com
//User: sorgentedevelopment.com
//Pwd: hzbJpsMFQkPtQNq

//60whitenyc@gmail.com
//Pass veronica60


//$msg = "prueba de mail(), First line of text";
//mail("gabrieldelunardo@gmail.com","My pruebaaaa",$msg);


// Use SMTP
    $mail->IsSMTP();// set mailer to use SMTP
    //$mail->Host = "127.0.0.1";  // specify main and backup server
    //$mail->SMTPAuth = true;     // turn on SMTP authentication
    //$mail->SMTPSecure = "tls"; // use TLS
    //$mail->Username = "sorgentedevelopment.com";  // SMTP username
    //$mail->Password = "hzbJpsMFQkPtQNq"; // SMTP password
    //$mail->From="info@sorgentedevelopment.com";
    //$mail->FromName = "T";


//GMAIL
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->SMTPSecure = "tls";                 // sets the prefix to the servier
$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
$mail->Port       = 587;                   // set the SMTP port for the GMAIL server
$mail->Username   = "60whitenyc@gmail.com";  // GMAIL username
$mail->Password   = "veronica60";            // GMAIL password

// Original TEST MAILS
    $mail->AddAddress("gabrieldelunardo@gmail.com");  // Add a recipient
    $mail->AddAddress("gdelunardo@bridgerconway.com");  // Add a recipient


    $mail->Body=$email;
    $mail->SMTPDebug = 1;

    
$list=array('TEST 1','TEST 2','TEST 3');
 
foreach($list as $subject){
    $mail->Subject = "20 Exchange Site | ".$subject;

    if(!$mail->Send())
        {
            echo "Message ".$subject." could not be sent. <p>";
            echo "Mailer Error: " . $mail->ErrorInfo . "<br>";   
        }else {
            echo "Message ".$subject." has been sent<br>";
        }

}


?>    