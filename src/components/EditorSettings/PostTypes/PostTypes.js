import { FormTokenField, PanelBody, PanelRow } from '@wordpress/components';
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
	const availablePosTypes = useSelect(select =>
		select('core').getPostTypes()
	);

	const getPostTypesSuggestion = () => {
		let suggestedPostTypes = [];

		if (availablePosTypes) {
			suggestedPostTypes = availablePosTypes.map(
				postType => postType.name
			);
		}

		return suggestedPostTypes;
	};

	const onChange = postTypesArray => {
		const selectedPostTypes = availablePosTypes.filter(availablePosType => {
			if (postTypesArray.includes(availablePosType.name)) {
				return postTypesArray.includes(availablePosType.name);
			} else if (
				postTypesArray.some(
					postType => postType.value === availablePosType.name
				)
			) {
				return postTypesArray;
			}
		});

		const updatedPostTypes = selectedPostTypes.map(
			({ name, ...prevProps }) => ({
				...prevProps,
				name: name,
				value: name,
			})
		);

		props.setAttributes({
			selectedPostTypes: updatedPostTypes,
		});
	};

	return (
		<PanelBody title={__('Post Types', 'RPTBlock')} initialOpen={true}>
			<PanelRow>
				<FormTokenField
					label={__('Select post types to use:', 'RPTBlock')}
					onChange={newArray => onChange(newArray)}
					suggestions={getPostTypesSuggestion()}
					value={props.attributes.selectedPostTypes}
				/>
			</PanelRow>
		</PanelBody>
	);
}

export default PostTypes;
