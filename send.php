<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name    = trim($_POST['name']);
    $email   = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    // ✅ Validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "<script>
        alert('All fields are required ❌');
        window.history.back();
        </script>";
        exit();
    }


    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>
        alert('Invalid Email Format ❌');
        window.history.back();
        </script>";
        exit();
    }

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'ahmedshaikh1234t@gmail.com';
        $mail->Password   = ''; 
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];

        $mail->setFrom('ahmedshaikh1234t@gmail.com', 'website');
        $mail->addAddress('ahmedshaikh1234t@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = "New Contact: " . $subject;
        $mail->Body    = "
            <h3>New Contact Message</h3>
            <b>Name:</b> {$name} <br>
            <b>Email:</b> {$email} <br>
            <b>Subject:</b> {$subject} <br>
            <b>Message:</b> {$message}
        ";

        $mail->send();

        echo "<script>
        alert('Your form has been submitted successfully ✅');
        window.location.href='index.html';
        </script>";
        exit();

    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}
?>