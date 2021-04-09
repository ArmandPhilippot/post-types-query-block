import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Render the settings block used to define the layout options.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function LayoutOptions(props) {
	const { postsLayout, displayListMarkers, gridColumns } = props.attributes;

	return (
		<PanelBody title={__('Layout options', 'PTQBlock')} initialOpen={true}>
			{postsLayout === 'list' && (
				<ToggleControl
					label={__('Display list markers', 'PTQBlock')}
					help={
						displayListMarkers
							? __('Has list markers.', 'PTQBlock')
							: __('No list markers.', 'PTQBlock')
					}
					checked={displayListMarkers}
					onChange={value =>
						props.setAttributes({
							displayListMarkers: value,
						})
					}
				/>
			)}
			{postsLayout === 'grid' && (
				<RangeControl
					label={__('Grid columns:', 'PTQBlock')}
					min={1}
					max={10}
					onChange={value =>
						props.setAttributes({
							gridColumns: value,
						})
					}
					value={gridColumns}
				/>
			)}
		</PanelBody>
	);
}

export default LayoutOptions;
