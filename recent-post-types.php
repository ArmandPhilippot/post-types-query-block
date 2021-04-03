<?php
/**
 * Recent_Post_Types
 *
 * Display a list of posts including custom post types.
 *
 * @package   Recent_Post_Types
 * @link      https://github.com/armandphilippot/recent-post-types-block
 * @author    Armand Philippot <contact@armandphilippot.com>
 *
 * @copyright 2021 Armand Philippot
 * @license   GPL-2.0-or-later
 * @since     0.1.0
 *
 * @wordpress-plugin
 * Plugin Name:       Recent Post Types Block
 * Plugin URI:        https://github.com/armandphilippot/recent-post-types-block
 * Description:       Display a list of posts including custom post types.
 * Version:           0.1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Armand Philippot
 * Author URI:        https://www.armandphilippot.com/
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       RPTBlock
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'RPTBLOCK_VERSION', '0.1.0' );

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';

	$rptblock_dotenv = Dotenv\Dotenv::createImmutable( __DIR__ );
	$rptblock_dotenv->safeLoad();
	$rptblock_current_env = $_ENV['WP_BLOCK_ENV'];

	if ( 'development' === $rptblock_current_env ) {
		wp_register_script( 'livereload', 'http://localhost:35729/livereload.js', array(), RPTBLOCK_VERSION, true );
		wp_enqueue_script( 'livereload' );
	}
}

/**
 * Register the block using the metadata loaded from `block.json` file.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/
 * @since 0.1.0
 */
function rptblock_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'rptblock_block_init' );
