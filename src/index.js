import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import './style.scss';

/**
 * Post_Types_Query block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 * @since 0.1.0
 */
registerBlockType('ptqblock/post-types-query', {
	apiVersion: 2,
	edit: Edit,
});
