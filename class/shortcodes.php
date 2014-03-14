<?php
/**
 * Created by PhpStorm.
 * User: Sam
 * Date: 13/03/14
 * Time: 10:26 AM
 */

//include_once( trailingslashit(plugin_dir_path( __FILE__ )) . 'FormHelper.php');

class ZDFormsShortcodes {
    public function __construct() {
        add_shortcode('zd-contact-form', array($this, 'zdf_display_form') );
    }

    function zdf_display_form($atts) {
        $name = $is_ajax = '';

        extract( shortcode_atts( array(
            'name'      => 'Zing Design Form',
            'is_ajax'   => true
        ), $atts ) );

        $form = new FormHelper(array(
            'form_name' => $name,
            'is_ajax'   => $is_ajax
        ));

        $html = $form->get_start_form();

        $html .= $form->get_input(array(
            'label' => __('Email address', 'zdf')
        ));

        $html .= $form->get_input(array(
            'label' => __('Full name','zdf')
        ));

        $html .= $form->get_input(array(
            'label' => __('Company name','zdf')
        ));

        $html .= $form->get_input(array(
            'label' => __('What are you after?','zdf'),
            'type' => 'select',
            'options' => array(
                'Business' => 'business',
                'Sponsorship' => 'sponsorship',
                'Applications' => 'applications',
                'General enquiry' => 'general_enquiry'
            )
        ));

        $html .= $form->get_input(array(
            'label' => __('Message','zdf'),
            'type' => 'textarea',
            'rows' => 5
        ));

        $html .= $form->get_input(array(
            'label' => 'Send message',
            'type' => 'submit',
            'value' => 'Send message',
            'input_class' => 'klp-button disabled'
        ));

        $html .= $form->get_end_form();

        //Cache HTML results for faster speediness

        return $html;


    }
} 