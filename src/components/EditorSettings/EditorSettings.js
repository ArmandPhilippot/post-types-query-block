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
					<PanelBody
						title={__('Layout options', 'RPTBlock')}
						initialOpen={true}
					>
						{props.attributes.postsLayout === 'list' && (
							<ToggleControl
								label={__('Display list markers', 'RPTBlock')}
								help={
									props.attributes.displayListMarkers
										? __('Has list markers.', 'RPTBlock')
										: __('No list markers.', 'RPTBlock')
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
								label={__('Grid columns:', 'RPTBlock')}
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
