import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Define the way in which the different attributes should be combined into the
 * final markup, which is then serialized by the block editor into
 * `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function Save() {
	const blockProps = useBlockProps.save();

	return <div {...blockProps}>Your block.</div>;
}

export default Save;
