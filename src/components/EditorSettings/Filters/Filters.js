import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Filters(props) {
	return (
		<PanelBody title={__('Filters', 'RPTBlock')} initialOpen={false}>
			Select
		</PanelBody>
	);
}

export default Filters;
