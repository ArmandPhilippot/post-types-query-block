import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
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
	const { selectedPostType, postsToDisplay } = props.attributes;

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
		<PanelBody title={__('Post Types', 'PTQBlock')} initialOpen={true}>
			<SelectControl
				label={__('Post type to display:', 'PTQBlock')}
				onChange={value =>
					props.setAttributes({
						selectedPostType: value,
					})
				}
				options={getPostTypesOptions()}
				value={selectedPostType}
			/>
			<RangeControl
				label={__('Number of posts to display:', 'PTQBlock')}
				min={1}
				max={30}
				onChange={value =>
					props.setAttributes({ postsToDisplay: value })
				}
				value={postsToDisplay}
			/>
		</PanelBody>
	);
}

export default PostTypes;
