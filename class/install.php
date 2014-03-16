<?php
/**
 * Created by PhpStorm.
 * User: Sam
 * Date: 13/03/14
 * Time: 9:22 AM
 */

class ZDFormsInstall {

    function __construct() {

        load_plugin_textdomain(ZDF_TEXT_DOMAIN, false, basename( dirname( __FILE__ ) ) . '/languages' );

        add_action( 'admin_enqueue_scripts', array($this, 'zdf_load_admin_assets') );

        add_action( 'wp_enqueue_scripts', array($this, 'zdf_load_client_assets') );

        wp_register_script(
            'zdf-form-builder',
            plugins_url( '/assets/js/form-builder.js', dirname(__FILE__)),
            array(),
            '1.0.0',
            true
        );

//        if( is_admin() ) {
//        } else {
//        }

    }

    function zdf_load_admin_assets() {
        // Custom admin styles
        wp_enqueue_style( 'zdf-admin', plugins_url( '/assets/css/zdf-admin.css', dirname(__FILE__) ) );

        //jQuery UI
        wp_enqueue_script( 'jquery-ui-core' );
        wp_enqueue_script( 'jquery-ui-widget' );
        wp_enqueue_script( 'jquery-ui-mouse' );
        wp_enqueue_script( 'jquery-ui-sortable' );

        //Custom admin scripts
        wp_enqueue_script( 'zdf-form-builder' );
        wp_enqueue_script(
            'zdf-admin-script',
            plugins_url( '/assets/js/zdf-admin.js', dirname(__FILE__) ),
            array('jquery', 'jquery-ui-sortable', 'zdf-form-builder'),
            '1.0.0',
            true
        );
    }

    function zdf_load_client_assets() {
        wp_enqueue_style( 'zdf-client', plugins_url( '/assets/css/zdf-client.css', dirname(__FILE__) ) );
    }
}