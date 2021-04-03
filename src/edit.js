import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @since 0.1.0
 *
 * @return {WPElement} Element to render.
 */
function Edit() {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>Your block.</div>
  );
}

export default Edit;
