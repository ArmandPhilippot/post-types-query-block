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
 * Render the RPT Block on server.
 *
 * @param array $attributes The block attributes.
 * @return string Returns the post content with block added.
 */
function rptblock_render_post_types_block( $attributes ) {
	$query_args = array(
		'query_label'         => 'rptblock_query',
		'ignore_sticky_posts' => true,
		'posts_per_page'      => $attributes['postsToDisplay'],
		'no_found_rows'       => true,
		'post_status'         => 'publish',
		'post_type'           => $attributes['selectedPostType'],
		'order'               => $attributes['order'],
		'orderby'             => $attributes['orderBy'],
		'suppress_filters'    => false,
	);

	if ( $attributes['selectedAuthor'] ) {
		$query_args += array( 'author' => $attributes['selectedAuthor'] );
	}

	if ( $attributes['selectedCategories'] ) {
		$selected_categories = array();

		foreach ( $attributes['selectedCategories'] as $category ) {
			$selected_categories[] = $category['id'];
		}

		$query_args += array( 'category__in' => $selected_categories );
	}

	if ( $attributes['selectedTags'] ) {
		$selected_tags = array();

		foreach ( $attributes['selectedTags'] as $tag ) {
			$selected_tags[] = $tag['id'];
		}

		$query_args += array( 'tag__in' => $selected_tags );
	}

	$post_types_query = get_posts( $query_args );

	$list_items_markup = '<ul>';

	foreach ( $post_types_query as $post ) {
		$post_link  = esc_url( get_permalink( $post ) );
		$post_title = get_the_title( $post );

		$list_items_markup .= '<li>';

		if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
			$list_items_markup .= get_the_post_thumbnail( $post );
		}

		$list_items_markup .= sprintf(
			'<a href="%1$s">%2$s</a>',
			$post_link,
			$post_title
		);

		if ( $attributes['displayPublicationDate'] || $attributes['displayUpdateDate'] || $attributes['displayAuthor'] ) {
			$post_meta_markup = '<dl>';

			if ( $attributes['displayPublicationDate'] ) {
				$post_meta_markup .= '<dt>' . esc_html__( 'Published at', 'RPTBlock' ) . '</dt>';
				$post_meta_markup .= '<dd>' . get_the_date( '', $post ) . '</dd>';
			}

			if ( $attributes['displayUpdateDate'] ) {
				$post_meta_markup .= '<dt>' . esc_html__( 'Updated at', 'RPTBlock' ) . '</dt>';
				$post_meta_markup .= '<dd>' . get_the_modified_date( '', $post ) . '</dd>';
			}

			if ( $attributes['displayAuthor'] ) {
				$post_meta_markup .= '<dt>' . esc_html__( 'Author:', 'RPTBlock' ) . '</dt>';
				$post_meta_markup .= '<dd>' . get_the_author() . '</dd>';
			}

			$post_meta_markup  .= '</dl>';
			$list_items_markup .= $post_meta_markup;
		}

		if ( $attributes['displayExcerpt'] ) {
			$list_items_markup .= get_the_content( '', true, $post );
		}

		$list_items_markup .= "</li>\n";
	}

	$list_items_markup .= '</ul>';

	$wrapper_attributes = get_block_wrapper_attributes();

	return sprintf(
		'<div %1$s>%2$s</div>',
		$wrapper_attributes,
		$list_items_markup
	);
}

/**
 * Register the block using the metadata loaded from `block.json` file.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/
 * @since 0.1.0
 */
function rptblock_block_init() {
	register_block_type_from_metadata(
		__DIR__,
		array( 'render_callback' => 'rptblock_render_post_types_block' )
	);
}
add_action( 'init', 'rptblock_block_init' );
