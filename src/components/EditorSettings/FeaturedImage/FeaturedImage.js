import {
	BlockAlignmentToolbar,
	__experimentalImageSizeControl as ImageSizeControl,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { BaseControl, PanelBody, ToggleControl } from '@wordpress/components';
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
		<PanelBody title={__('Featured image', 'PTQBlock')} initialOpen={false}>
			<ToggleControl
				label={__('Display featured image', 'PTQBlock')}
				help={
					displayFeaturedImage
						? __('Has featured image.', 'PTQBlock')
						: __('No featured image.', 'PTQBlock')
				}
				checked={displayFeaturedImage}
				onChange={value =>
					props.setAttributes({
						displayFeaturedImage: value,
					})
				}
			/>
			{displayFeaturedImage && (
				<fieldset>
					<legend className='ptqblock-controls__legend'>
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
							{__('Image alignment', 'PTQBlock')}
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
			)}
		</PanelBody>
	);
}

export default FeaturedImage;
