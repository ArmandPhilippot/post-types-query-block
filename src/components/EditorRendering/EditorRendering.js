import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';

function EditorRendering(props) {
	const authorsList = useSelect(select => select('core').getAuthors());

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
	 * Get author from id.
	 *
	 * @since 0.1.0
	 *
	 * @param {Int} authorId Author Id.
	 * @returns An author object matching the id.
	 */
	const getPostAuthor = authorId =>
		authorsList.find(author => author.id === authorId);

	/**
	 * Determine if a read more link is present in content.
	 *
	 * @since 0.1.0
	 *
	 * @param {String} content The raw content of a post.
	 * @returns {Boolean} True if the content contains a read more link.
	 */
	const isReadMore = content => {
		return content.includes('<!-- wp:more -->');
	};

	/**
	 * Retrieve the content before a read more link.
	 *
	 * @since 0.1.0
	 *
	 * @param {String} content The raw content obtained from a WP post object.
	 * @returns The sanitized content.
	 */
	const getTeaser = content => {
		const splitContent = content.split('<!-- wp:more -->');
		const contentElement = document.createElement('div');

		contentElement.innerHTML = splitContent[0];

		const sanitizedContent =
			contentElement.textContent || contentElement.innerText || '';

		return sanitizedContent.trim();
	};

	/**
	 * Retrieve an excerpt ready to display.
	 *
	 * @since 0.1.0
	 *
	 * @param {String} excerpt The rendered excerpt obtained from a WP post object.
	 * @returns The sanitized excerpt.
	 */
	const sanitizeExcerpt = excerpt => {
		const excerptElement = document.createElement('div');

		excerptElement.innerHTML = excerpt;

		const moreLinkElements = excerptElement.getElementsByClassName(
			'more-link'
		);

		while (moreLinkElements.length > 0) {
			moreLinkElements[0].parentNode.removeChild(moreLinkElements[0]);
		}

		const sanitizedExcerpt =
			excerptElement.textContent || excerptElement.innerText || '';

		return sanitizedExcerpt;
	};

	/**
	 * Retrieve the excerpt either from the generated excerpt or the content if a
	 * more link exists.
	 *
	 * @since 0.1.0
	 *
	 * @param {Object} postObject A WP post object.
	 * @returns The excerpt to display.
	 */
	const getExcerpt = postObject => {
		let content = '';

		if (isReadMore(postObject.content.raw)) {
			content = getTeaser(postObject.content.raw);
		} else {
			content = sanitizeExcerpt(postObject.excerpt.rendered);
		}

		return content.trim();
	};

	/**
	 * Check if the rendering requires a publication date, an update date or an
	 * author.
	 *
	 * @since 0.1.0
	 *
	 * @returns {Boolean} True if one of the corresponding data is checked.
	 */
	const isMetadata = () => {
		return (
			props.attributes.displayPublicationDate ||
			props.attributes.displayUpdateDate ||
			props.attributes.displayAuthor
		);
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
		const dateFormat = __experimentalGetSettings().formats.date;
		let postsListMarkup = [];
		console.log(postsList);

		if (postsList) {
			postsList.forEach(post => {
				console.log(post);
				postsListMarkup.push(
					<li key={post.id}>
						<a href={post.link}>{post.title.raw}</a>
						{isMetadata() && (
							<dl>
								{props.attributes.displayPublicationDate && (
									<div>
										<dt>
											{__(
												'Publication date:',
												'RPTBlock'
											)}
										</dt>
										<dd>
											<time
												dateTime={format(
													'c',
													post.date_gmt
												)}
											>
												{dateI18n(
													dateFormat,
													post.date_gmt
												)}
											</time>
										</dd>
									</div>
								)}
								{props.attributes.displayUpdateDate && (
									<div>
										<dt>
											{__('Update date:', 'RPTBlock')}
										</dt>
										<dd>
											<time
												dateTime={format(
													'c',
													post.modified_gmt
												)}
											>
												{dateI18n(
													dateFormat,
													post.modified_gmt
												)}
											</time>
										</dd>
									</div>
								)}
								{props.attributes.displayAuthor &&
									getPostAuthor(post.author) && (
										<div>
											<dt>{__('Author:', 'RPTBlock')}</dt>
											<dd>
												{
													getPostAuthor(post.author)
														.name
												}
											</dd>
										</div>
									)}
							</dl>
						)}
						{props.attributes.displayExcerpt && (
							<div>{getExcerpt(post)}</div>
						)}
					</li>
				);
			});
		}

		return postsListMarkup;
	};

	return <ul>{renderPostsList()}</ul>;
}

export default EditorRendering;
