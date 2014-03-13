<?php
/**
 * Created by PhpStorm.
 * User: Laura
 * Date: 13/03/14
 * Time: 9:53 AM
 */
//
//include_once( trailingslashit(plugin_dir_path( __FILE__ )) . 'FormHelper.php');

class ZDFormsMenus {

    private $form;

    function __construct() {

        if( is_admin() ) {

            add_action( 'admin_menu', array( $this, 'zdf_init_menu' ));
            add_action( 'add_meta_boxes', array($this, 'zdf_options_metabox') );
        }

        $this->form = new FormHelper(array(
            'form_name' => 'zdf_form_options'
        ));

    }

    function zdf_init_menu() {
//        add_options_page($page_title, $menu_title, $capability, $menu_slug, $callback);
        add_options_page('Zing Design Forms', 'ZD Forms', 'manage_options', 'zdf_main_menu_page', array($this, 'zdf_menu_options'));
    }

    function zdf_menu_options() {
        $html = '';

//        $form = new FormHelper(array(
//            'form_name' => 'zdf-form-options'
//        ));

        $html .= "<div class=\"zd-form-options-block\">\n";

        $html .= "<h1>Zing Design contact form options</h1>\n";

        $html .= $this->form->get_start_form();

        //Where to display the form section
        $html .= "<section>\n";

        $html .= $this->form->get_input(array(
            'label' => __('Form name', 'zdf'),
            'wrapper' => 'p'
        ));

        $html .= $this->form->get_input(array(
            'label' => __('Page(s) to display form', 'zdf'),
            'placeholder' => __('Comma-separated list', 'zdf'),
            'wrapper' => 'p'
        ));

        $html .= "</section>\n";

        // Customise form section
        $html .= "<section>\n";

//        $html .= $this->form->get_input(array(
//            'value' => 'Add new form',
//            'type' => 'button',
//            'input_class' => 'button button-default'
//        ));

        $html .= "<div id=\"sortable-inputs\">\n";

        if( get_option('zdf_fields') ) {

        }
        else {
            $html .= "<div class=\"zdf-form-group sortable\">\n";

            $html .= $this->form->get_input(array(
                'label' => 'Field name',
                'id' => false
            ));

            $html .= $this->form->get_input(array(
                'label' => 'Field type',
                'id' => false,
                'type' => 'select',
                'options' => array(
                    'Textbox' => 'textarea',
                    'Checkbox' => 'checkbox',
                    'Select (dropdown)' => 'select',
                    'Radio' => 'radio',
                    'Hidden' => 'hidden'
                )
            ));

            $html .= $this->form->get_input(array(
                'label' => 'Required',
                'type' => 'checkbox',
                'id' => false
            ));

            $html .= "</div>\n";
        }

        $html .= "</div>\n";

        $html .= $this->form->get_input(array(
            'value' => 'Add field',
            'type' => 'button',
            'id' => 'add-input',
            'input_class' => 'button button-default'
        ));

        $html .= $this->form->get_input(array(
            'value' => 'Save Form',
            'type' => 'submit',
            'id' => 'save-form',
            'input_class' => 'button button-primary'
        ));

        $html .= "</section>\n";

        $html .= $this->form->get_end_form();

        $html .= "</div>\n";

        echo $html;
    }

    function zdf_options_metabox() {
        global $post;

        $display = array();

        $page_titles = get_option('page_titles') ? get_option('page_titles') : 'Contact us';

        $form_pages = explode(',', $page_titles);

        foreach($form_pages as $form_page) {
            $p = get_page_by_title($form_page);
            if( $p->ID )
                $display[] = $p->ID;
        }

        if( in_array($post->ID, $display) ) {
            add_meta_box(
                'zdf-form-options',
                'Form Options',
                array($this, 'zdf_render_options_metabox'),
                'page',
                'normal',
                'low'
            );
        }


//        do_meta_boxes( 'zdf-form-menu', 'normal', $post );
    }

    function zdf_render_options_metabox( $post ) {
        $html = '';

        $html .= $this->form->get_input(array(
            'label' => 'Input name',
            'input_class' => 'widefat'
        ));

        $html .= $this->form->get_input(array(
            'value' => 'Add input',
            'type' => 'button',
            'input_class' => 'button button-default'
        ));

        echo $html;
    }

//    function zdf_get_options_form_inputs($form) {
//
//
//
//        return $html;
//    }

} 