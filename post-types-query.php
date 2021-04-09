<?php
/**
 * Post_Types_Query
 *
 * Display a list of posts based on (custom) post types.
 *
 * @package   Post_Types_Query
 * @link      https://github.com/armandphilippot/post-types-query-block
 * @author    Armand Philippot <contact@armandphilippot.com>
 *
 * @copyright 2021 Armand Philippot
 * @license   GPL-2.0-or-later
 * @since     0.1.0
 *
 * @wordpress-plugin
 * Plugin Name:       Post Types Query Block
 * Plugin URI:        https://github.com/armandphilippot/post-types-query-block
 * Description:       Display a list of posts based on (custom) post types.
 * Version:           0.1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Armand Philippot
 * Author URI:        https://www.armandphilippot.com/
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       PTQBlock
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
define( 'PTQBLOCK_VERSION', '0.1.0' );

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';

	$ptqblock_dotenv = Dotenv\Dotenv::createImmutable( __DIR__ );
	$ptqblock_dotenv->safeLoad();
	$ptqblock_current_env = $_ENV['WP_BLOCK_ENV'];

	if ( 'development' === $ptqblock_current_env ) {
		wp_register_script( 'livereload', 'http://localhost:35729/livereload.js', array(), PTQBLOCK_VERSION, true );
		wp_enqueue_script( 'livereload' );
	}
}

/**
 * Render the RPT Block on server.
 *
 * @param array $attributes The block attributes.
 * @return string Returns the post content with block added.
 */
function ptqblock_render_post_types_block( $attributes ) {
	$query_args = array(
		'query_label'         => 'ptqblock_query',
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

	$list_items_markup = '';

	foreach ( $post_types_query as $post ) {
		$post_link  = esc_url( get_permalink( $post ) );
		$post_title = get_the_title( $post );

		$list_items_markup .= '<li class="wp-block-ptqblock__item">';

		if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
			$image_sizes = '';
			if ( isset( $attributes['featuredImageWidth'] ) ) {
				$image_sizes .= sprintf( 'max-width:%spx;', $attributes['featuredImageWidth'] );
			}
			if ( isset( $attributes['featuredImageHeight'] ) ) {
				$image_sizes .= sprintf( 'max-height:%spx;', $attributes['featuredImageHeight'] );
			}

			$featured_image = get_the_post_thumbnail(
				$post,
				$attributes['featuredImageSlug'],
				array(
					'style' => $image_sizes,
				)
			);

			$featured_image_classes = 'wp-block-ptqblock__featured-image';
			if ( isset( $attributes['featuredImageAlignment'] ) ) {
				$featured_image_classes .= ' align' . $attributes['featuredImageAlignment'];
			}

			$list_items_markup .= sprintf(
				'<div class="%1$s">%2$s</div>',
				$featured_image_classes,
				$featured_image
			);
		}

		$list_items_markup .= sprintf(
			'<a href="%1$s" class="wp-block-ptqblock__link">%2$s</a>',
			$post_link,
			$post_title
		);

		if ( $attributes['displayPublicationDate'] || $attributes['displayUpdateDate'] || $attributes['displayAuthor'] ) {
			$post_meta_markup = '<dl class="wp-block-ptqblock__meta">';

			if ( $attributes['displayPublicationDate'] ) {
				$post_meta_markup .= '<div class="wp-block-ptqblock__meta-item">';

				$publication_date_term_classes = 'wp-block-ptqblock__meta-term';

				if ( $attributes['hidePublicationDateLabel'] ) {
					$publication_date_term_classes .= ' screen-reader-text';
				}

				$post_meta_markup .= '<dt class="' . $publication_date_term_classes . '">';

				if ( $attributes['publicationDateLabel'] ) {
					$post_meta_markup .= $attributes['publicationDateLabel'];
				} else {
					$post_meta_markup .= esc_html__( 'Published on:', 'PTQBlock' );
				}
				$post_meta_markup .= '</dt>';
				$post_meta_markup .= '<dd class="wp-block-ptqblock__meta-description">' . get_the_date( '', $post ) . '</dd>';
				$post_meta_markup .= '</div>';
			}

			if ( $attributes['displayUpdateDate'] ) {
				$post_meta_markup .= '<div class="wp-block-ptqblock__meta-item">';

				$update_date_term_classes = 'wp-block-ptqblock__meta-term';

				if ( $attributes['hideUpdateDateLabel'] ) {
					$update_date_term_classes .= ' screen-reader-text';
				}

				$post_meta_markup .= '<dt class="' . $update_date_term_classes . '">';

				if ( $attributes['updateDateLabel'] ) {
					$post_meta_markup .= $attributes['updateDateLabel'];
				} else {
					$post_meta_markup .= esc_html__( 'Updated on:', 'PTQBlock' );
				}
				$post_meta_markup .= '</dt>';
				$post_meta_markup .= '<dd class="wp-block-ptqblock__meta-description">' . get_the_modified_date( '', $post ) . '</dd>';
				$post_meta_markup .= '</div>';
			}

			if ( $attributes['displayAuthor'] ) {
				$post_meta_markup .= '<div class="wp-block-ptqblock__meta-item">';

				$author_term_classes = 'wp-block-ptqblock__meta-term';

				if ( $attributes['hideAuthorLabel'] ) {
					$author_term_classes .= ' screen-reader-text';
				}

				$post_meta_markup .= '<dt class="' . $author_term_classes . '">';

				if ( $attributes['authorLabel'] ) {
					$post_meta_markup .= $attributes['authorLabel'];
				} else {
					$post_meta_markup .= esc_html__( 'Author:', 'PTQBlock' );
				}

				$post_meta_markup .= '</dt>';
				$post_meta_markup .= '<dd class="wp-block-ptqblock__meta-description">' . get_the_author_meta( 'display_name', $post->post_author ) . '</dd>';
				$post_meta_markup .= '</div>';
			}

			$post_meta_markup  .= '</dl>';
			$list_items_markup .= $post_meta_markup;
		}

		if ( $attributes['displayExcerpt'] ) {
			$post_parts   = get_extended( $post->post_content );
			$post_teaser  = $post_parts['main'];
			$post_content = $post_parts['extended'];

			$list_items_markup .= '<div class="wp-block-ptqblock__content">';

			if ( '' !== $post_content ) {
				$list_items_markup .= $post_teaser;
			} else {
				$list_items_markup .= get_the_excerpt( $post );
			}

			$list_items_markup .= '</div>';
		}

		$list_items_markup .= "</li>\n";
	}

	$block_classes = 'wp-block-ptqblock__list';

	if ( isset( $attributes['postsLayout'] ) && 'grid' === $attributes['postsLayout'] ) {
		$block_classes .= ' is-grid';
	}

	if ( isset( $attributes['gridColumns'] ) && 'grid' === $attributes['postsLayout'] ) {
		$block_classes .= ' columns-' . $attributes['gridColumns'];
	}

	if ( isset( $attributes['postsLayout'] ) && 'list' === $attributes['postsLayout'] && isset( $attributes['displayListMarkers'] ) && $attributes['displayListMarkers'] ) {
		$block_classes .= ' has-list-markers';
	}

	if ( ( isset( $attributes['displayPublicationDate'] ) && $attributes['displayPublicationDate'] ) || ( isset( $attributes['displayUpdateDate'] ) && $attributes['displayUpdateDate'] ) ) {
		$block_classes .= ' has-dates';
	}

	if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
		$block_classes .= ' has-author';
	}

	if ( isset( $attributes['displayExcerpt'] ) && $attributes['displayExcerpt'] ) {
		$block_classes .= ' has-excerpt';
	}

	if ( isset( $attributes['displayFeaturedImage'] ) && $attributes['displayFeaturedImage'] ) {
		$block_classes .= ' has-featured-image';

		if ( isset( $attributes['featuredImageAlignment'] ) ) {
			$block_classes .= ' has-featured-image--align' . $attributes['featuredImageAlignment'];
		}
	}

	$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $block_classes ) );

	return sprintf(
		'<ul %1$s>%2$s</ul>',
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
function ptqblock_block_init() {
	register_block_type_from_metadata(
		__DIR__,
		array( 'render_callback' => 'ptqblock_render_post_types_block' )
	);
}
add_action( 'init', 'ptqblock_block_init' );
