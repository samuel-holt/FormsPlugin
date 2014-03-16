<?php
/**
 * Created by PhpStorm.
 * User: Sam
 * Date: 14/03/14
 * Time: 5:29 PM
 */

class ZDFormsSend {
    function __construct() {

    }

    function send_message( $data ) {
        $email_address = $full_name = $message = null;
        extract( $data );

        $to = 'sweetbix09@gmail.com';
//        $from = $email_address;
        $subject = __('Message from the Zing Design form', 'zdf');

        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= sprintf( __('From: "%1$s" <%2$s>', 'zdf'), $full_name, $email_address );

        return @wp_mail($to, $subject, $message, $headers);
    }
} 