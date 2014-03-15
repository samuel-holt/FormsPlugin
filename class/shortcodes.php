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
        add_shortcode('zd-input-field', array($this, 'zdf_input_field') );
    }

    function zdf_display_form($atts) {
        $name = $is_ajax = '';

        extract( shortcode_atts( array(
            'name'      => 'Zing Design Contact Form',
            'is_ajax'   => true
        ), $atts ) );

        $form = new FormHelper(array(
            'form_name' => $name,
            'is_ajax'   => $is_ajax
        ));

        $html = $form->get_start_form();

        $html .= $form->get_input(array(
            'label' => __('Email address', 'zdf'),
            'validate' => 'email',
            'required' => true,
            'wrapper' => 'p'
        ));

        $html .= $form->get_input(array(
            'label' => __('Full name','zdf'),
            'validate' => 'text',
            'required' => true,
            'wrapper' => 'p'
        ));

        $html .= $form->get_input(array(
            'label' => __('Company name','zdf'),
            'wrapper' => 'p'
        ));

        $html .= $form->get_input(array(
            'label' => __('What are you after?','zdf'),
            'id' => 'contact-purpose',
            'name' => 'contact_purpose',
            'type' => 'select',
            'options' => array(
                'Business' => 'business',
                'Sponsorship' => 'sponsorship',
                'Applications' => 'applications',
                'General enquiry' => 'general_enquiry'
            ),
            'validate' => 'select',
            'required' => true,
            'wrapper' => 'p'
        ));

        $html .= $form->get_input(array(
            'label' => __('Message','zdf'),
            'type' => 'textarea',
            'rows' => 5,
            'validate' => true,
            'required' => true,
            'wrapper' => 'p'
        ));

        $html .= $form->get_input(array(
            'label' => false,
            'id' => 'zdfhp',
            'name' => 'zdfhp',
            'type' => 'hidden',
            'validate' => 'honeypot'
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

    function zdf_input_field( $atts ) {
        extract( shortcode_atts(
            Settings::get_form_defaults(),
            $atts
        ) );
    }
} 