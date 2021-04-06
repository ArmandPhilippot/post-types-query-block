import { Placeholder, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { postList } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';

/**
 * Render a Recent_Post_Types block in the editor.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function EditorRendering(props) {
	const blockProps = useBlockProps();
	const authorsList = useSelect(select => select('core').getAuthors());
	const {
		selectedPostType,
		selectedCategories,
		selectedTags,
		selectedAuthor,
		postsToDisplay,
		order,
		orderBy,
		displayPublicationDate,
		displayUpdateDate,
		displayAuthor,
		displayFeaturedImage,
		displayExcerpt,
	} = props.attributes;

	/**
	 * Check if the post metadata (like publication date) are required.
	 *
	 * @since 0.1.0
	 *
	 * @returns {Boolean} True if one of the corresponding data is checked.
	 */
	const isPostMetaActivated = () => {
		return (
			props.attributes.displayPublicationDate ||
			props.attributes.displayUpdateDate ||
			props.attributes.displayAuthor
		);
	};

	/**
	 * Get terms Id from an array of term objects.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} termsArray An array containing term objects.
	 * @returns An array of term ID.
	 */
	const getTermsId = termsArray => {
		const selectedTerms = termsArray;
		let selectedTermsId = [];

		if (selectedTerms) {
			selectedTermsId = selectedTerms.map(term => term.id);
		}

		return selectedTermsId;
	};

	/**
	 * Get author name from id.
	 *
	 * @since 0.1.0
	 *
	 * @param {Int} authorId Author Id.
	 * @returns An author name matching the id.
	 */
	const getAuthorName = authorId => {
		let authorName = '';

		if (authorsList) {
			const author = authorsList.find(author => author.id === authorId);
			authorName = author.name;
		}

		return authorName;
	};

	/**
	 * Retrieve an array of posts based on editor settings.
	 */
	const postsList = useSelect(select => {
		const { getEntityRecords, getMedia } = select('core');
		const categoriesId = getTermsId(selectedCategories);
		const tagsId = getTermsId(selectedTags);

		const posts = getEntityRecords('postType', selectedPostType, {
			per_page: postsToDisplay,
			order: order,
			orderby: orderBy,
			author: selectedAuthor,
			categories: categoriesId,
			tags: tagsId,
		});

		if (posts) {
			const postsWithFeaturedImage = posts.map(post => {
				if (!post.featured_media) return post;

				const image = getMedia(post.featured_media);

				return { ...post, featured_image: image };
			});

			return postsWithFeaturedImage;
		}

		if (posts && displayFeaturedImage) {
			return postsWithFeaturedImage;
		} else {
			return posts;
		}
	});

	const hasPosts = Array.isArray(postsList) && postsList.length;

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

	if (!hasPosts) {
		return (
			<div {...blockProps}>
				<Placeholder
					icon={postList}
					label={__('Recent Posts Types', 'RPTBlock')}
				>
					{!Array.isArray(postsList) ? (
						<Spinner />
					) : (
						__('No posts found.', 'RPTBlock')
					)}
				</Placeholder>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			<ul>
				{postsList.map((post, i) => {
					const dateFormat = __experimentalGetSettings().formats.date;
					return (
						<li key={i}>
							{displayFeaturedImage && post.featured_image && (
								<img
									src={post.featured_image.source_url}
									alt={post.featured_image.alt_text}
								/>
							)}
							<a href={post.link}>
								{post.title.raw
									? post.title.raw
									: post.title.rendered}
							</a>
							{isPostMetaActivated() && (
								<dl>
									{displayPublicationDate && (
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
									{displayUpdateDate && (
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
									{displayAuthor && (
										<div>
											<dt>{__('Author:', 'RPTBlock')}</dt>
											<dd>
												{getAuthorName(post.author)}
											</dd>
										</div>
									)}
								</dl>
							)}
							{displayExcerpt && post.content && (
								<div>{getExcerpt(post)}</div>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default EditorRendering;
