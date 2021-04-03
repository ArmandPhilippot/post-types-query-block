import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function Sort(props) {
	return (
		<PanelBody title={__('Sort', 'RPTBlock')} initialOpen={false}>
			Select
		</PanelBody>
	);
}

export default Sort;
