<?php
/**
 * Created by PhpStorm.
 * User: Sam
 * Date: 13/03/14
 * Time: 9:52 AM
 */

class Settings {
    public static function get_form_defaults() {
        return array(
            'type'          => 'text',
            'id'            => '',
            'name'          => '',
            'label'         => '',
            'label_class'   => 'sr-only',
            'value'         => '',
            'input_class'   => 'zdf-input',
            'wrapper'       => false,
            'wrapper_class' => false,
            'echo'          => false,
            'placeholder'   => '',
            'options'       => array(),
            'required'      => false,
            'error'         => false,
            'rows'          => false,
            'cols'          => false,
            'disabled'      => false,
            'multiline'     => false,
            'validate'      => false

        );
    }
} 