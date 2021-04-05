import { useSelect } from '@wordpress/data';

function EditorRendering(props) {
	/**
	 * Filter an array of Term objects to obtain terms Id.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} termArray An array containing term objects.
	 * @returns An array of term ID.
	 */
	const getSelectedTermsId = termArray => {
		const selectedTerms = termArray;
		let selectedTermsId = [];

		if (selectedTerms) {
			selectedTermsId = selectedTerms.map(category => category.id);
		}

		return selectedTermsId;
	};

	/**
	 * Get a list of posts by querying WordPress Rest API.
	 *
	 * @since 0.1.0
	 *
	 * @returns An array of posts.
	 */
	const getPostsList = () => {
		const categoriesId = getSelectedTermsId(
			props.attributes.selectedCategories
		);
		const tagsId = getSelectedTermsId(props.attributes.selectedTags);
		const postsList = useSelect(select =>
			select('core').getEntityRecords(
				'postType',
				props.attributes.selectedPostType,
				{
					per_page: props.attributes.postsToDisplay,
					order: props.attributes.order,
					orderby: props.attributes.orderBy,
					author: props.attributes.author,
					categories: categoriesId,
					tags: tagsId,
				}
			)
		);

		return postsList;
	};

	/**
	 * Create the HTML markup to display the posts list.
	 *
	 * @since 0.1.0
	 *
	 * @returns An array of `li` element containing.
	 */
	const renderPostsList = () => {
		const postsList = getPostsList();
		let postsListMarkup = [];

		if (postsList) {
			postsList.forEach(post => {
				postsListMarkup.push(
					<li>
						<a href={post.link}>{post.title.raw}</a>
					</li>
				);
			});
		}

		return postsListMarkup;
	};

	return <ul>{renderPostsList()}</ul>;
}

export default EditorRendering;
