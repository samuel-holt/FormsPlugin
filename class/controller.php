<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Samwise
 * Date: 15/03/14
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */

//namespace FormController;

class ZDFormsController {
    function __construct() {
        if( isset( $_POST['send_message'] ) ) {
            call_user_func( $this->validate() );
        }

        $this -> val = new ZDFormsValidate();

        $this -> sender = new ZDFormsSend();
    }

    // actions

    function validate() {
        return $this->val->validate_form($_POST['zdf_form_data']);
    }
}

//call_user_func( __NAMESPACE__, '\ZDFormsController::' . $action );