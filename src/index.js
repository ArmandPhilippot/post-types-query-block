import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import './style.scss';

/**
 * Recent_Post_Types block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 * @since 0.1.0
 */
registerBlockType('rptblock/recent-post-types', {
	apiVersion: 2,
	edit: Edit,
	save: () => null,
});
