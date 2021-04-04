import { useSelect } from '@wordpress/data';

function EditorRendering(props) {
	const getPostsList = () => {
		const selectedPostTypes = props.attributes.selectedPostTypes;
		let postsList = [];
		let postTypeSlug = 'post';

		if (selectedPostTypes && selectedPostTypes.length === 1) {
			selectedPostTypes.forEach(postType => {
				postTypeSlug = postType.slug;
			});
		}

		postsList = useSelect(select =>
			select('core').getEntityRecords('postType', postTypeSlug, {
				per_page: props.attributes.postsToDisplay,
				order: props.attributes.order,
				orderby: props.attributes.orderBy,
				author: props.attributes.author,
			})
		);

		return postsList;
	};

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
