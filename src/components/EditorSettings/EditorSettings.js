import { InspectorControls } from '@wordpress/block-editor';
import { Panel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PostDetails from './PostDetails/PostDetails';
import Filters from './Filters/Filters';
import PostTypes from './PostTypes/PostTypes';
import Sort from './Sort/Sort';
import FeaturedImage from './FeaturedImage/FeaturedImage';

/**
 * The EditorSettings function describes the structure of settings for the
 * Recent_Post_Types block in the editor.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function EditorSettings(props) {
	return (
		<InspectorControls key='settings'>
			<div id='rptblock-controls' className='rptblock-controls'>
				<Panel>
					<PostTypes
						attributes={props.attributes}
						setAttributes={props.setAttributes}
					/>
					<Filters
						attributes={props.attributes}
						setAttributes={props.setAttributes}
					/>
					<Sort
						attributes={props.attributes}
						setAttributes={props.setAttributes}
					/>
					<PostDetails
						attributes={props.attributes}
						setAttributes={props.setAttributes}
					/>
					<FeaturedImage
						attributes={props.attributes}
						setAttributes={props.setAttributes}
					/>
				</Panel>
			</div>
		</InspectorControls>
	);
}

export default EditorSettings;
