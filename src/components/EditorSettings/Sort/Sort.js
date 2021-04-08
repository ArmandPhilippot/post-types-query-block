import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Sort(props) {
	return (
		<PanelBody title={__('Sort', 'PTQBlock')} initialOpen={false}>
			<PanelRow>
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
			</PanelRow>
			<PanelRow>
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
			</PanelRow>
		</PanelBody>
	);
}

export default Sort;
