import { CheckboxControl, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function AdditionalData(props) {
	return (
		<PanelBody
			title={__('Additional Data', 'RPTBlock')}
			initialOpen={false}
		>
			<PanelRow>
				<fieldset>
					<legend>
						{__(
							'Select the additional data you want to display.',
							'RPTBlock'
						)}
					</legend>
					<CheckboxControl
						label={__('Publication date', 'RPTBlock')}
						checked={props.attributes.displayPublicationDate}
						onChange={value =>
							props.setAttributes({
								displayPublicationDate: value,
							})
						}
					/>
					<CheckboxControl
						label={__('Update date', 'RPTBlock')}
						checked={props.attributes.displayUpdateDate}
						onChange={value =>
							props.setAttributes({
								displayUpdateDate: value,
							})
						}
					/>
					<CheckboxControl
						label={__('Author', 'RPTBlock')}
						checked={props.attributes.displayAuthor}
						onChange={value =>
							props.setAttributes({
								displayAuthor: value,
							})
						}
					/>
					<CheckboxControl
						label={__('Featured image', 'RPTBlock')}
						checked={props.attributes.displayFeaturedImage}
						onChange={value =>
							props.setAttributes({
								displayFeaturedImage: value,
							})
						}
					/>
					<CheckboxControl
						label={__('Post excerpt', 'RPTBlock')}
						checked={props.attributes.displayExcerpt}
						onChange={value =>
							props.setAttributes({
								displayExcerpt: value,
							})
						}
					/>
				</fieldset>
			</PanelRow>
		</PanelBody>
	);
}

export default AdditionalData;
