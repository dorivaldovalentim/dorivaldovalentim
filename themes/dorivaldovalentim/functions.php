<?php
if (!function_exists('dorivaldovalentim_setup')):
/**
 * Sets up theme defaults and registers support for various WordPress
 * features.
 *
 * It is important to set up these functions before the init hook so
 * that none of these features are lost.
 *
 *  @since Dorivaldo Valentim 1.0
 */
    function dorivaldovalentim_setup()
    {
        
    }
endif;


add_action( 'after_setup_theme', 'dorivaldovalentim_setup' );