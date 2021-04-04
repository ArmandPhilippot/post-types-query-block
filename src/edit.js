import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import EditorSettings from './components/EditorSettings/EditorSettings';
import EditorRendering from './components/EditorRendering/EditorRendering';

/**
 * Describe the structure of the Recent_Post_Types block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @since 0.1.0
 *
 * @returns {WPElement} Element to render.
 */
function Edit(props) {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<EditorRendering attributes={props.attributes} />
			<EditorSettings
				attributes={props.attributes}
				setAttributes={props.setAttributes}
			/>
		</div>
	);
}

export default Edit;
