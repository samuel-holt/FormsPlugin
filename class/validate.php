<?php
/**
 * Created by PhpStorm.
 * User: Sam
 * Date: 14/03/14
 * Time: 5:31 PM
 */

class ZDFormsValidate {
    function __construct() {

    }

    // Regular text
    function text( $str, $required=false, $min=false, $max=false ){
        if( $required ) {
            if( $this->is_empty($str) ) {
                return __('This text field is required', 'zdf');
            }
        }
        if( $min ) {
            if( strlen($str) < $min ) {
                return sprintf( __('Please enter at least %s characters'), $min );
            }
        }
        if( $max ) {
            if( strlen($str) > $max ) {
                return sprintf( __('The text in this field exceeds the %s character limit'), $min );
            }
        }
        return false;
    }

    // Email
    function email( $str, $required=false ) {
        if( $required ) {
            if( $this->is_empty($str) ) {
                return __('Email address is required');
            }
        }
//        if( ! is_email( $str ) ) {
//            return __('Please enter a valid email address', 'zdf');
//        }

        return false;
    }

    // Date
    function date( $str, $format='d/m/Y', $required=false ) {
        if( $required ) {
            if( $this->is_empty( $str ) ) {
                return __('Please enter a date');
            }
            if( ! $this->is_valid_date( $str, $format )) {
                return sprintf( __('Please enter a date in the format: %s'), $format );
            }
        }
        return false;
    }

    // Checkbox
    function checkbox( $str, $required=false ) {
        if( $required && $this->is_empty($str) ) {
            return __('Please check the box before continuing', 'zdf');
        }

        return false;
    }

    // Select

    function select( $str, $required=false ) {
        if( $required && intval($str) === -1) {
            return __('Please select an item from the dropdown menu', 'zdf');
        }
        return false;
    }

    // Honey pot

    function honey_pot( $str ){
        if( ! $this->is_empty( $str )) {
            return __('This field should not be filled in!','zdf');
        }
        return false;
    }

    // Validate the form

    function validate_form( $form_data ) {
        $errors = array();
        $valid = true;

        foreach( $form_data as $field => $value ) {
            $errors[$field] = $this->text( $value );
        }

        foreach($errors as $error) {
            if( $error ) {
                $valid = false;
                break;
            }
        }

        return $valid ? $valid : $errors;
    }

    function is_alphanumeric($str) {
        if( ctype_alnum($str) ) {
            return 'Please only enter alpha-numeric characters';
        }
        return false;
    }

    // Is empty
    private function is_empty( $str ) {
        return ( empty($str) || !isset($str) || '' === $str || null === $str );
    }

    private function is_valid_date($date, $format='d/m/Y') {
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }


    
} 