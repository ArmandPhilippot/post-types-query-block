import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import './style.scss';
import { ReactComponent as BlockIcon } from './images/ptqblock-icon.svg';

/**
 * Post_Types_Query block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 * @since 0.1.0
 */
registerBlockType('ptqblock/post-types-query', {
	apiVersion: 2,
	title: __('Post Types Query Block', 'PTQBlock'),
	description: __(
		'Display a list of posts based on (custom) post types.',
		'PTQBlock'
	),
	icon: <BlockIcon />,
	example: {},
	edit: Edit,
});
