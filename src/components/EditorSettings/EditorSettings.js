import { InspectorControls } from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PostDetails from './PostDetails/PostDetails';
import Filters from './Filters/Filters';
import PostTypes from './PostTypes/PostTypes';
import Sort from './Sort/Sort';
import FeaturedImage from './FeaturedImage/FeaturedImage';

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
					<PanelBody
						title={__('Layout options', 'PTQBlock')}
						initialOpen={true}
					>
						{props.attributes.postsLayout === 'list' && (
							<ToggleControl
								label={__('Display list markers', 'PTQBlock')}
								help={
									props.attributes.displayListMarkers
										? __('Has list markers.', 'PTQBlock')
										: __('No list markers.', 'PTQBlock')
								}
								checked={props.attributes.displayListMarkers}
								onChange={value =>
									props.setAttributes({
										displayListMarkers: value,
									})
								}
							/>
						)}
						{props.attributes.postsLayout === 'grid' && (
							<RangeControl
								label={__('Grid columns:', 'PTQBlock')}
								min={1}
								max={10}
								onChange={value =>
									props.setAttributes({
										gridColumns: value,
									})
								}
								value={props.attributes.gridColumns}
							/>
						)}
					</PanelBody>
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
