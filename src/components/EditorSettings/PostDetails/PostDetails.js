import {
	CheckboxControl,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { _x, __ } from '@wordpress/i18n';

/**
 * Define the settings to display post meta and content.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function PostDetails(props) {
	const {
		displayAuthor,
		displayExcerpt,
		displayPublicationDate,
		displayUpdateDate,
		publicationDateLabel,
		updateDateLabel,
		authorLabel,
		hidePublicationDateLabel,
		hideUpdateDateLabel,
		hideAuthorLabel,
	} = props.attributes;

	return (
		<PanelBody title={__('Posts details', 'PTQBlock')} initialOpen={false}>
			<PanelRow>
				<fieldset className='ptqblock-controls__fieldset'>
					<legend className='ptqblock-controls__legend'>
						{__(
							'Select the information you want to display.',
							'PTQBlock'
						)}
					</legend>
					<fieldset className='ptqblock-controls__fieldset'>
						<legend>
							<CheckboxControl
								label={__('Publication date', 'PTQBlock')}
								checked={displayPublicationDate}
								onChange={value =>
									props.setAttributes({
										displayPublicationDate: value,
									})
								}
							/>
						</legend>
						{displayPublicationDate && (
							<div>
								<CheckboxControl
									label={__(
										'Hide publication date label?',
										'PTQBlock'
									)}
									checked={hidePublicationDateLabel}
									onChange={value =>
										props.setAttributes({
											hidePublicationDateLabel: value,
										})
									}
								/>
								{!hidePublicationDateLabel && (
									<TextControl
										label={__(
											'Replace publication date label',
											'PTQBlock'
										)}
										value={publicationDateLabel}
										onChange={value =>
											props.setAttributes({
												publicationDateLabel: value,
											})
										}
									/>
								)}
							</div>
						)}
					</fieldset>
					<fieldset className='ptqblock-controls__fieldset'>
						<legend>
							<CheckboxControl
								label={__('Update date', 'PTQBlock')}
								checked={displayUpdateDate}
								onChange={value =>
									props.setAttributes({
										displayUpdateDate: value,
									})
								}
							/>
						</legend>
						{displayUpdateDate && (
							<div>
								<CheckboxControl
									label={__(
										'Hide update date label?',
										'PTQBlock'
									)}
									checked={hideUpdateDateLabel}
									onChange={value =>
										props.setAttributes({
											hideUpdateDateLabel: value,
										})
									}
								/>
								{!hideUpdateDateLabel && (
									<TextControl
										label={__(
											'Replace update date label',
											'PTQBlock'
										)}
										value={updateDateLabel}
										onChange={value =>
											props.setAttributes({
												updateDateLabel: value,
											})
										}
									/>
								)}
							</div>
						)}
					</fieldset>
					<fieldset className='ptqblock-controls__fieldset'>
						<legend>
							<CheckboxControl
								label={__('Author', 'PTQBlock')}
								checked={displayAuthor}
								onChange={value =>
									props.setAttributes({
										displayAuthor: value,
									})
								}
							/>
						</legend>
						{displayAuthor && (
							<div>
								<CheckboxControl
									label={__('Hide author label?', 'PTQBlock')}
									checked={hideAuthorLabel}
									onChange={value =>
										props.setAttributes({
											hideAuthorLabel: value,
										})
									}
								/>
								{!hideAuthorLabel && (
									<TextControl
										label={__(
											'Replace author label',
											'PTQBlock'
										)}
										value={authorLabel}
										onChange={value =>
											props.setAttributes({
												authorLabel: value,
											})
										}
									/>
								)}
							</div>
						)}
					</fieldset>
					<CheckboxControl
						label={__('Post excerpt', 'PTQBlock')}
						checked={displayExcerpt}
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

export default PostDetails;
