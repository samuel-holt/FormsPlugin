<?php
/**
 * Plugin Name: Zing Design Forms
 * Plugin URI: http://zingdesign.com
 * Description: Lightweight, customisable contact forms made easy
 * Version: 0.0.1
 * Author: Samuel Holt
 * Author URI: http://zingdesign.com
 * License: GPL2
 */

/*  Copyright 2014  Zing Design  (email : sam@zingdesign.co.nz)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

define( 'ZDF_TEXT_DOMAIN', 'zdf' );

require_once( plugin_dir_path( __FILE__ ) . 'class/options.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/validate.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/send.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/ajax.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/install.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/settings.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/menus.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/FormHelper.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/FormBuilder.php');
require_once( plugin_dir_path( __FILE__ ) . 'class/shortcodes.php');

add_action('init', 'zdf_init');

function zdf_init() {

//    $form_helper = new FormHelper();

//    $options = new ZDFormsOptions();

    new ZDFormsInstall();
    new ZDFormsMenus();
//    new ZDFormsSettings();
    new ZDFormsBuild();
    new ZDFormsAjax;
    new ZDFormsShortcodes();
}
