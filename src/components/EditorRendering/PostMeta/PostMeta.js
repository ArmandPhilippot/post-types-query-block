import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';

function PostMeta(props) {
	const authorsList = useSelect(select => select('core').getAuthors());
	const dateFormat = __experimentalGetSettings().formats.date;
	const {
		displayPublicationDate,
		displayUpdateDate,
		displayAuthor,
	} = props.attributes;
	const post = props.post;

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

	return (
		<dl>
			{displayPublicationDate && (
				<div>
					<dt>{__('Publication date:', 'RPTBlock')}</dt>
					<dd>
						<time dateTime={format('c', post.date_gmt)}>
							{dateI18n(dateFormat, post.date_gmt)}
						</time>
					</dd>
				</div>
			)}
			{displayUpdateDate && (
				<div>
					<dt>{__('Update date:', 'RPTBlock')}</dt>
					<dd>
						<time dateTime={format('c', post.modified_gmt)}>
							{dateI18n(dateFormat, post.modified_gmt)}
						</time>
					</dd>
				</div>
			)}
			{displayAuthor && (
				<div>
					<dt>{__('Author:', 'RPTBlock')}</dt>
					<dd>{getAuthorName(post.author)}</dd>
				</div>
			)}
		</dl>
	);
}

export default PostMeta;
