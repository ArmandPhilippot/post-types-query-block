import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

function Filters(props) {
	const getAuthorOptions = () => {
		const authors = useSelect(select => select('core').getAuthors());

		let options = [{ value: '', label: __('All', 'RPTBlock') }];

		if (authors) {
			authors.forEach(author => {
				options.push({
					value: author.id,
					label: author.name,
				});
			});
		}

		return options;
	};

	return (
		<PanelBody title={__('Filters', 'RPTBlock')} initialOpen={false}>
			<PanelRow>
				<SelectControl
					label={__('Author:', 'RPTBlock')}
					options={getAuthorOptions()}
					value={props.attributes.author}
					onChange={value =>
						props.setAttributes({
							author: value,
						})
					}
				/>
			</PanelRow>
		</PanelBody>
	);
}

export default Filters;
