<?php

require 'vendor/autoload.php';

$mailContact = new PHPMailer;

// SMTP
$mailContact->IsSMTP();// set mailer to use SMTP
//GMAIL
$mailContact->SMTPAuth   = true;                  // enable SMTP authentication
$mailContact->SMTPSecure = "tls";                 // sets the prefix to the servier
$mailContact->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
$mailContact->Port       = 587;                   // set the SMTP port for the GMAIL server
$mailContact->Username   = "60whitenyc@gmail.com";  // GMAIL username
$mailContact->Password   = "veronica60";            // GMAIL password

// Email to Contact
$mailContact->From = 'sorgente@sorgente-usa.com';
$mailContact->FromName = 'Sorgente Developments';
$mailContact->addAddress($_POST['email']);
$mailContact->addReplyTo('sorgente@sorgente-usa.com', 'Sorgente Developments');
//$mailContact->addBCC('ncornaggia@bridgerconway.com');
$mailContact->isHTML(true);

$mailContact->Subject = 'Thank You';
$mailContact->Body    = 'Thank you for contacting Sorgente Group of America. We will get back to you shortly.<br/><br/>'
				. 'Sorgente Developments.<br/><br/>'
				. '<img src="http://sorgentedevelopment.com/img/logo-mail.png"/>';
// $mailContact->AltBody = 'Thank for your subscription to Sorgente Developments.';

if(!$mailContact->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mailContact->ErrorInfo;
} else {

	$mailNotification = new PHPMailer;

	// SMTP
	$mailNotification->IsSMTP();// set mailer to use SMTP

//GMAIL
$mailNotification->SMTPAuth   = true;                  // enable SMTP authentication
$mailNotification->SMTPSecure = "tls";                 // sets the prefix to the servier
$mailNotification->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
$mailNotification->Port       = 587;                   // set the SMTP port for the GMAIL server
$mailNotification->Username   = "60whitenyc@gmail.com";  // GMAIL username
$mailNotification->Password   = "veronica60";            // GMAIL password

	// Notification to Sorgente
	$mailNotification->From = $_POST['email'];
	$mailNotification->FromName = $_POST['firstName'] . ' ' . $_POST['lastName'];
	$mailNotification->addAddress('sorgente@sorgente-usa.com');
	$mailNotification->addBCC('gabrieldelunardo@gmail.com');
	//$mailNotification->addReplyTo('sorgente@sorgente-usa.com', 'Sorgente Developments');
	//$mailNotification->addBCC('ncornaggia@bridgerconway.com');
	$mailNotification->isHTML(true);

	$mailNotification->Subject = 'New Information request from website';
	$mailNotification->Body    = 'New Information request from website<br/><br/>'
					. '<b>First Name:</b> ' . $_POST['firstName'] . '<br/><br/>'
					. 'Last Name: ' . $_POST['firstName'] . '<br/><br/>'
					. 'Email: ' . $_POST['email'] . '<br/><br/>'
					. 'Phone: ' . $_POST['phone'] . '<br/><br/>'
					. 'Other: ' . $_POST['cuestion'] . '<br/><br/>'
					. 'Message: ' . $_POST['message'] . '<br/><br/>'
					. '<img src="http://sorgentedevelopment.com/img/logo-mail.png"/>';
	$mailNotification->AltBody = 'New Sorgente Developments information request. Please contact: ' . $_POST['email'];
	
	if(!$mailNotification->send())
		echo 'Mailer Error: ' . $mailNotification->ErrorInfo;
}

?>