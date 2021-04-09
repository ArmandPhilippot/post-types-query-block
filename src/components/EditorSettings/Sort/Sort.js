import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Render the sorting settings block used to reorder the post types.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function Sort(props) {
	return (
		<PanelBody title={__('Sort', 'PTQBlock')} initialOpen={false}>
			<SelectControl
				label={__('Order by', 'PTQBlock')}
				options={[
					{
						value: 'author',
						label: __('Author', 'PTQBlock'),
					},
					{
						value: 'date',
						label: __('Publication date', 'PTQBlock'),
					},
					{
						value: 'modified',
						label: __('Update date', 'PTQBlock'),
					},
					{
						value: 'title',
						label: __('Title', 'PTQBlock'),
					},
				]}
				value={props.attributes.orderBy}
				onChange={value =>
					props.setAttributes({
						orderBy: value,
					})
				}
			/>
			<SelectControl
				label={__('Order:', 'PTQBlock')}
				options={[
					{
						value: 'asc',
						label: __('Ascending', 'PTQBlock'),
					},
					{
						value: 'desc',
						label: __('Descending', 'PTQBlock'),
					},
				]}
				value={props.attributes.order}
				onChange={value =>
					props.setAttributes({
						order: value,
					})
				}
			/>
		</PanelBody>
	);
}

export default Sort;
