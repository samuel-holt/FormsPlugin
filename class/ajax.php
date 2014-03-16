<?php
/**
 * Created by PhpStorm.
 * User: Sam
 * Date: 12/03/14
 * Time: 11:35 AM
 */

class ZDFormsAjax {

    private $val;

    function __construct() {

        if( is_admin() ) {
            add_action( 'wp_ajax_zdf_ajax_send', array($this, 'zdf_ajax_send_callback') );
            add_action( 'wp_ajax_nopriv_zdf_ajax_send', array($this, 'zdf_ajax_send_callback') );
        }
        else {
            add_action( 'wp_enqueue_scripts', array($this, 'zdf_enqueue_ajax_assets') );
        }

        $this->val = new ZDFormsValidate();
        $this->sender = new ZDFormsSend();

    }

    function zdf_ajax_send_callback() {
        $valid = true;
        if( isset($_POST['zdf_form_data']) ) {
//            die(print_r($_POST['zdf_form_data']));
            $email_address = $full_name = $company_name = $contact_purpose = $message = null;
            $post_data = $_POST['zdf_form_data'];
//            die(print_r($post_data));
//            $form_data_assoc = array();
//            $form_data = explode('&', $_POST['zdf_form_data']);
//
//            foreach($form_data as $data ) {
//                $d = explode('=', $data);
//                $form_data_assoc[$d[0]] = $d[1];
//            }

//            die(json_encode($form_data_assoc));

//            $clean_data = array_map( 'esc_html', $form_data_assoc );

//            extract($clean_data);
//            $errors = $this->validate_form;
            $errors = array();
//            $errors['email_address']    = $this->val->email($email_address, true);
//            $errors['full_name']        = $this->val->text($full_name, true);
//            $errors['company_name']     = $this->val->text($company_name);
//            $errors['contact_purpose']  = $this->val->select($contact_purpose, true);
//            $errors['message']          = $this->val->text($message, true);
            foreach( $post_data as $field ) {
                $type = esc_html($field['type']);
                $is_required = isset($field['required']);
                $errors[$field['name']] = $this->val->$type($field['value'], $is_required);
            }

            foreach( $errors as $error ) {
                if( $error ) {
                    $valid = false;
                    break;
                }
            }

            if( ! $valid ) {
                @die(json_encode(array(
                    'sent'   => false,
                    'errors' => $errors
                )));
            }
            else {
                $message_data = array();
                foreach( $post_data as $field ) {
                    $message_data[$field['name']] = $field['value'];
                }
                if( $this->sender->send_message($message_data) ) {
                    @die(json_encode(array(
                        'sent' => true,
                        'errors' => false
                    )));
                }
                else {
                    @die(json_encode(array(
                        'sent' => false,
                        'errors' => false
                    )));
                }
            }
        }
        else {
            @die('Restricted Access');
        }

    }

    function zdf_enqueue_ajax_assets() {

        wp_enqueue_script( 'zdf-ajax-script', plugins_url( '/assets/js/zdf-ajax.js', dirname(__FILE__) ),
            array('jquery'), '1', true );

        wp_localize_script( 'zdf-ajax-script', 'zdf_ajax_object', array(
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'ajax_nonce' => wp_create_nonce( 'zdf_ajax_nonce' )
        ) );

    }
}



?>