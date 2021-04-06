import { Placeholder, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { postList } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import Excerpt from './Excerpt/Excerpt';
import PostMeta from './PostMeta/PostMeta';

/**
 * Render a Recent_Post_Types block in the editor.
 *
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function EditorRendering(props) {
	const blockProps = useBlockProps();
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
		return displayPublicationDate || displayUpdateDate || displayAuthor;
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
								<PostMeta
									attributes={props.attributes}
									post={post}
								/>
							)}
							{displayExcerpt && post.content && (
								<div>
									<Excerpt {...post} />
								</div>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default EditorRendering;
