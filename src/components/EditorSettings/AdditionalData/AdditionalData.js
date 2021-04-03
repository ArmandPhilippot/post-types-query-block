import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function AdditionalData(props) {
	return (
		<PanelBody
			title={__('Additional Data', 'RPTBlock')}
			initialOpen={false}
		>
			Select
		</PanelBody>
	);
}

export default AdditionalData;
