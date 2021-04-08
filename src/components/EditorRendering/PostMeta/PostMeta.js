import { useSelect } from '@wordpress/data';
import { _x, __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';

function PostMeta(props) {
	const authorsList = useSelect(select => select('core').getAuthors());
	const dateFormat = __experimentalGetSettings().formats.date;
	const {
		displayPublicationDate,
		displayUpdateDate,
		displayAuthor,
		publicationDateLabel,
		updateDateLabel,
		authorLabel,
		hidePublicationDateLabel,
		hideUpdateDateLabel,
		hideAuthorLabel,
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
		<dl className='rptblock__meta'>
			{displayPublicationDate && (
				<div className='rptblock__meta-item'>
					<dt
						className={
							hidePublicationDateLabel
								? 'rptblock__meta-term screen-reader-text'
								: 'rptblock__meta-term'
						}
					>
						{publicationDateLabel}
					</dt>
					<dd className='rptblock__meta-description'>
						<time dateTime={format('c', post.date_gmt)}>
							{dateI18n(dateFormat, post.date_gmt)}
						</time>
					</dd>
				</div>
			)}
			{displayUpdateDate && (
				<div className='rptblock__meta-item'>
					<dt
						className={
							hideUpdateDateLabel
								? 'rptblock__meta-term screen-reader-text'
								: 'rptblock__meta-term'
						}
					>
						{updateDateLabel}
					</dt>
					<dd className='rptblock__meta-description'>
						<time dateTime={format('c', post.modified_gmt)}>
							{dateI18n(dateFormat, post.modified_gmt)}
						</time>
					</dd>
				</div>
			)}
			{displayAuthor && (
				<div className='rptblock__meta-item'>
					<dt
						className={
							hideAuthorLabel
								? 'rptblock__meta-term screen-reader-text'
								: 'rptblock__meta-term'
						}
					>
						{authorLabel}
					</dt>
					<dd className='rptblock__meta-description'>
						{getAuthorName(post.author)}
					</dd>
				</div>
			)}
		</dl>
	);
}

export default PostMeta;
