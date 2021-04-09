import {
	FormTokenField,
	PanelBody,
	SelectControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { _x, __ } from '@wordpress/i18n';

/**
 * Render the settings block used to filter the post types.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function Filters(props) {
	/**
	 * Retrieve the existing authors.
	 *
	 * @since 0.1.0
	 *
	 * @returns {Array} An array of author names.
	 */
	const getAuthorOptions = () => {
		const authors = useSelect(select => select('core').getAuthors());

		let options = [
			{ value: '', label: _x('All', 'author selection', 'PTQBlock') },
		];

		if (authors) {
			authors.forEach(author => {
				options.push({
					value: author.id,
					label: author.name,
				});
			});
		}

		return options;
	};

	const categories = useSelect(select =>
		select('core').getEntityRecords('taxonomy', 'category')
	);

	const tags = useSelect(select =>
		select('core').getEntityRecords('taxonomy', 'post_tag')
	);

	/**
	 * Use the term names as suggestion.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} termArray An array of term objects like category or tag.
	 * @returns {Array} An array containing only terms name.
	 */
	const getSuggestionFrom = termArray => {
		let suggestions = [];

		if (termArray) {
			suggestions = termArray.map(term => term.name);
		}

		return suggestions;
	};

	/**
	 * Prevent the registration of non-existent terms.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} newArray Values obtained from the input.
	 * @param {Array} termArray The array of term objects to compare with.
	 * @returns {Array} An array containing only the existing terms.
	 */
	const checkTermExistence = (newArray, termArray) => {
		const filteredTerms = termArray.filter(availableTerm => {
			if (newArray.includes(availableTerm.name)) {
				return newArray.includes(availableTerm.name);
			} else if (
				newArray.some(term => term.value === availableTerm.name)
			) {
				return newArray;
			}
		});
		return filteredTerms;
	};

	/**
	 * Transform an array of objects to comply with the expected format.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} objectsArray The array to modify.
	 * @returns {Array} An array of objects with a new property `value`.
	 */
	const updateObjectProps = objectsArray => {
		const updatedArray = objectsArray.map(({ name, ...prevProps }) => ({
			...prevProps,
			name: name,
			value: name,
		}));

		return updatedArray;
	};

	/**
	 * Register the new values inside the `selectedCategories` attribute.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} newArray Values obtained from the input.
	 * @param {Array} categoriesArray An array of category objects.
	 */
	const onCategoriesChange = (newArray, categoriesArray) => {
		const selectedCategories = checkTermExistence(
			newArray,
			categoriesArray
		);

		const updatedCategories = updateObjectProps(selectedCategories);

		props.setAttributes({
			selectedCategories: updatedCategories,
		});
	};

	/**
	 * Register the new values inside the `selectedTags` attribute.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} newArray Values obtained from the input.
	 * @param {Array} tagsArray An array of tag objects.
	 */
	const onTagsChange = (newArray, tagsArray) => {
		const selectedTags = checkTermExistence(newArray, tagsArray);

		const updatedTags = updateObjectProps(selectedTags);

		props.setAttributes({
			selectedTags: updatedTags,
		});
	};

	return (
		<PanelBody title={__('Filters', 'PTQBlock')} initialOpen={false}>
			<SelectControl
				label={__('Author:', 'PTQBlock')}
				options={getAuthorOptions()}
				help={__('Include only the selected author.', 'PTQBlock')}
				value={props.attributes.selectedAuthor}
				onChange={value =>
					props.setAttributes({
						selectedAuthor: value,
					})
				}
			/>
			<FormTokenField
				label={__('Categories:', 'PTQBlock')}
				onChange={newArray => onCategoriesChange(newArray, categories)}
				suggestions={getSuggestionFrom(categories)}
				value={props.attributes.selectedCategories}
			/>
			<FormTokenField
				label={__('Tags:', 'PTQBlock')}
				onChange={newArray => onTagsChange(newArray, tags)}
				suggestions={getSuggestionFrom(tags)}
				value={props.attributes.selectedTags}
			/>
		</PanelBody>
	);
}

export default Filters;
