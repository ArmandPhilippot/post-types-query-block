import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Sort(props) {
	return (
		<PanelBody title={__('Sort', 'RPTBlock')} initialOpen={false}>
			<PanelRow>
				<SelectControl
					label={__('Order by', 'RPTBlock')}
					options={[
						{
							value: 'author',
							label: __('Author', 'RPTBlock'),
						},
						{
							value: 'date',
							label: __('Publication date', 'RPTBlock'),
						},
						{
							value: 'modified',
							label: __('Update date', 'RPTBlock'),
						},
						{
							value: 'title',
							label: __('Title', 'RPTBlock'),
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
					label={__('Order:', 'RPTBlock')}
					options={[
						{
							value: 'asc',
							label: __('Ascending', 'RPTBlock'),
						},
						{
							value: 'desc',
							label: __('Descending', 'RPTBlock'),
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
