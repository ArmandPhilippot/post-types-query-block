import {
	BlockAlignmentToolbar,
	__experimentalImageSizeControl as ImageSizeControl,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	PanelRow,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Define the settings to display featured image.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function FeaturedImage(props) {
	const {
		displayFeaturedImage,
		featuredImageAlignment,
		featuredImageHeight,
		featuredImageWidth,
		featuredImageSlug,
	} = props.attributes;

	const {
		imageSizeOptions,
		defaultImageHeight,
		defaultImageWidth,
	} = useSelect(select => {
		const { getSettings } = select(blockEditorStore);
		const { imageSizes, imageDimensions } = getSettings();

		const imageSizesFiltered = imageSizes.filter(
			({ slug }) => slug !== 'full'
		);

		return {
			imageSizeOptions: imageSizesFiltered.map(({ name, slug }) => ({
				value: slug,
				label: name,
			})),
			defaultImageWidth: imageDimensions[featuredImageSlug]
				? imageDimensions[featuredImageSlug].width
				: 0,
			defaultImageHeight: imageDimensions[featuredImageSlug]
				? imageDimensions[featuredImageSlug].height
				: 0,
		};
	});

	return (
		<PanelBody title={__('Featured image', 'RPTBlock')} initialOpen={false}>
			<PanelRow>
				<ToggleControl
					label={__('Display featured image', 'RPTBlock')}
					help={
						displayFeaturedImage
							? __('Has featured image.', 'RPTBlock')
							: __('No featured image.', 'RPTBlock')
					}
					checked={displayFeaturedImage}
					onChange={value =>
						props.setAttributes({
							displayFeaturedImage: value,
						})
					}
				/>
			</PanelRow>
			{displayFeaturedImage && (
				<PanelRow>
					<fieldset>
						<legend className='rptblock-controls__legend'>
							{__('Define the featured image appearance:')}
						</legend>
						<ImageSizeControl
							imageHeight={defaultImageHeight}
							imageWidth={defaultImageWidth}
							imageSizeOptions={imageSizeOptions}
							width={featuredImageWidth}
							height={featuredImageHeight}
							slug={featuredImageSlug}
							onChange={value => {
								const newSizes = {};
								if (value.hasOwnProperty('width')) {
									newSizes.featuredImageWidth = value.width;
								}
								if (value.hasOwnProperty('height')) {
									newSizes.featuredImageHeight = value.height;
								}
								props.setAttributes(newSizes);
							}}
							onChangeImage={value =>
								props.setAttributes({
									featuredImageSlug: value,
									featuredImageHeight: undefined,
									featuredImageWidth: undefined,
								})
							}
						/>
						<BaseControl>
							<BaseControl.VisualLabel>
								{__('Image alignment', 'RPTBlock')}
							</BaseControl.VisualLabel>
							<BlockAlignmentToolbar
								controls={['left', 'center', 'right']}
								isCollapsed={false}
								isToolbar={false}
								isToolbarButton={false}
								onChange={value =>
									props.setAttributes({
										featuredImageAlignment: value,
									})
								}
								value={featuredImageAlignment}
							/>
						</BaseControl>
					</fieldset>
				</PanelRow>
			)}
		</PanelBody>
	);
}

export default FeaturedImage;
