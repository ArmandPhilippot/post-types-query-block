import {
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Render the settings block used to select the post types.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function PostTypes(props) {
	const getPostTypesOptions = () => {
		const availablePosTypes = useSelect(select =>
			select('core').getPostTypes()
		);
		let filteredPostTypes = [];
		let postTypesOptions = [];

		if (availablePosTypes) {
			filteredPostTypes = availablePosTypes.filter(
				postType => postType.rest_base !== 'blocks'
			);
			postTypesOptions = filteredPostTypes.map(postType => ({
				label: postType.name,
				value: postType.slug,
			}));
		}

		return postTypesOptions;
	};

	return (
		<PanelBody title={__('Post Types', 'RPTBlock')} initialOpen={true}>
			<PanelRow>
				<SelectControl
					label={__('Post type to display:', 'RPTBlock')}
					onChange={value =>
						props.setAttributes({
							selectedPostType: value,
						})
					}
					options={getPostTypesOptions()}
					value={props.attributes.selectedPostType}
				/>
			</PanelRow>
			<PanelRow>
				<RangeControl
					label={__('Number of posts to display:', 'RPTBlock')}
					min={1}
					max={30}
					onChange={value =>
						props.setAttributes({ postsToDisplay: value })
					}
					value={props.attributes.postsToDisplay}
				/>
			</PanelRow>
		</PanelBody>
	);
}

export default PostTypes;
