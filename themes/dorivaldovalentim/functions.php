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

/* CSS stylesheets */
function add_theme_styles() {
    wp_enqueue_style( 'styles', get_stylesheet_uri(), [], wp_get_theme()->get('Version') );
    wp_enqueue_style( 'main', get_template_directory_uri() . '/assets/css/main.css', [], wp_get_theme()->get('Version') );
}

add_action( 'wp_enqueue_scripts', 'add_theme_styles' );


/* JavaScript */
function add_theme_scripts() {
    wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/script.js', [], wp_get_theme()->get('Version'), true );
}

add_action( 'wp_enqueue_scripts', 'add_theme_scripts');