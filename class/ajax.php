<?php
/**
 * Created by PhpStorm.
 * User: Sam
 * Date: 12/03/14
 * Time: 11:35 AM
 */

class ZDFormsAjax {

    function __construct() {

        if( is_admin() ) {
            add_action( 'wp_ajax_zdf_ajax_send', array($this, 'zdf_ajax_send_callback') );
            add_action( 'wp_ajax_nopriv_zdf_ajax_send', array($this, 'zdf_ajax_send_callback') );
        }
        else {
            add_action( 'wp_enqueue_scripts', array($this, 'zdf_enqueue_ajax_assets') );
        }
    }

    function zdf_ajax_send_callback() {
        if( isset($_POST['zdf_form_data']) ) {

            $form_data = $_POST['zdf_form_data'];

//            echo '<pre>';
//            print_r($form_data);
//            echo '</pre>';

            die();

        }
        else {
            die('Restricted Access');
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