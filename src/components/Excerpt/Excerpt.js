/**
 * Render a the post excerpt in the editor.
 *
 * @since 0.1.0
 *
 * @param {Object} post The post object.
 * @returns {WPElement} Element to render.
 */
function Excerpt(post) {
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
	 * @returns {String} The sanitized content.
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
	 * @returns {String} The sanitized excerpt.
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
	 * @returns {String} The excerpt to display.
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

	return getExcerpt(post);
}

export default Excerpt;
