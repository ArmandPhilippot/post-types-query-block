import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { Placeholder, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { postList } from '@wordpress/icons';
import EditorSettings from './components/EditorSettings/EditorSettings';
import EditorToolbar from './components/EditorToolbar/EditorToolbar';
import Excerpt from './components/Excerpt/Excerpt';
import PostMeta from './components/PostMeta/PostMeta';
import './editor.scss';

/**
 * Describe the structure of the Post_Types_Query block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function Edit(props) {
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
		featuredImageAlignment,
		featuredImageSlug,
		featuredImageHeight,
		featuredImageWidth,
		postsLayout,
		gridColumns,
		displayListMarkers,
	} = props.attributes;

	const blockProps = useBlockProps({
		className: classnames({
			ptqblock__list: true,
			'has-dates': displayPublicationDate || displayUpdateDate,
			'has-author': displayAuthor,
			'has-excerpt': displayExcerpt,
			'has-featured-image': displayFeaturedImage,
			'has-featured-image--align-left':
				displayFeaturedImage && featuredImageAlignment === 'left',
			'has-featured-image--align-right':
				displayFeaturedImage && featuredImageAlignment === 'right',
			'has-featured-image--align-center':
				displayFeaturedImage && featuredImageAlignment === 'center',
			'has-featured-image--align-wide':
				displayFeaturedImage && featuredImageAlignment === 'wide',
			'has-featured-image--align-full':
				displayFeaturedImage && featuredImageAlignment === 'full',
			'has-list-markers': postsLayout === 'list' && displayListMarkers,
			'is-grid': postsLayout === 'grid',
			[`columns-${gridColumns}`]: postsLayout === 'grid',
		}),
	});

	/**
	 * Get terms Id from an array of term objects.
	 *
	 * @since 0.1.0
	 *
	 * @param {Array} termsArray An array containing term objects.
	 * @returns {Array} An array of term ID.
	 */
	const getTermsId = termsArray => {
		const selectedTerms = termsArray;
		let selectedTermsId = [];

		if (selectedTerms) {
			selectedTermsId = selectedTerms.map(term => term.id);
		}

		return selectedTermsId;
	};

	const { postTypesOptions, postsList } = useSelect(select => {
		const { getEntityRecords, getMedia, getPostTypes } = select('core');
		const availablePostTypes = getPostTypes();
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

		return {
			postTypesOptions: !Array.isArray(availablePostTypes)
				? availablePostTypes
				: availablePostTypes.filter(
						postType => postType.rest_base !== 'blocks'
				  ),
			postsList: !Array.isArray(posts)
				? posts
				: posts.map(post => {
						if (!post.featured_media) return post;

						const image = getMedia(post.featured_media);

						return { ...post, featured_image: image };
				  }),
		};
	});

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
	 * Retrieve the source url from the post object based on featured image slug.
	 *
	 * @since 0.1.0
	 *
	 * @param {Object} post The post object with featured_image property.
	 * @returns {String} The source url to use.
	 */
	const getFeaturedImageSourceUrl = post => {
		const sourceUrl = post.featured_image.media_details.sizes[
			featuredImageSlug
		]
			? post.featured_image.media_details.sizes[featuredImageSlug]
					.source_url
			: post.featured_image.source_url;

		return sourceUrl;
	};

	const hasPosts = Array.isArray(postsList) && postsList.length;

	if (!hasPosts) {
		return (
			<div {...blockProps}>
				<EditorToolbar {...props} />
				<Placeholder
					icon={postList}
					label={__('Post Types Query Block', 'PTQBlock')}
				>
					{!Array.isArray(postsList) ? (
						<Spinner />
					) : (
						__('No posts found.', 'PTQBlock')
					)}
				</Placeholder>
				<EditorSettings {...props} />
			</div>
		);
	}

	return (
		<div>
			<EditorToolbar {...props} />
			<ul {...blockProps}>
				{postsList.map((post, i) => {
					return (
						<li key={i} className='ptqblock__item'>
							{displayFeaturedImage && post.featured_image && (
								<div
									className={
										featuredImageAlignment
											? `ptqblock__featured-image-wrapper align${featuredImageAlignment}`
											: 'ptqblock__featured-image-wrapper'
									}
								>
									<img
										src={getFeaturedImageSourceUrl(post)}
										alt={post.featured_image.alt_text}
										className='ptqblock__featured-image'
										style={{
											maxWidth: featuredImageWidth,
											maxHeight: featuredImageHeight,
										}}
									/>
								</div>
							)}
							<a href={post.link} className='ptqblock__link'>
								{post.title.raw
									? post.title.raw
									: post.title.rendered}
							</a>
							{isPostMetaActivated() && (
								<PostMeta post={post} {...props} />
							)}
							{displayExcerpt && post.content && (
								<div className='ptqblock__content'>
									<Excerpt {...post} />
								</div>
							)}
						</li>
					);
				})}
			</ul>
			<EditorSettings {...props} />
		</div>
	);
}

export default Edit;
