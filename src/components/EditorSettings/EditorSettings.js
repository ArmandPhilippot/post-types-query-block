import { InspectorControls } from '@wordpress/block-editor';
import { Panel } from '@wordpress/components';
import PostDetails from './PostDetails/PostDetails';
import Filters from './Filters/Filters';
import PostTypes from './PostTypes/PostTypes';
import Sort from './Sort/Sort';
import FeaturedImage from './FeaturedImage/FeaturedImage';
import LayoutOptions from './LayoutOptions/LayoutOptions';

/**
 * The EditorSettings function describes the structure of settings for the
 * Post_Types_Query block in the editor.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function EditorSettings(props) {
	return (
		<InspectorControls key='settings'>
			<div id='ptqblock-controls' className='ptqblock-controls'>
				<Panel>
					<LayoutOptions {...props} />
					<PostTypes {...props} />
					<Filters {...props} />
					<Sort {...props} />
					<PostDetails {...props} />
					<FeaturedImage {...props} />
				</Panel>
			</div>
		</InspectorControls>
	);
}

export default EditorSettings;
