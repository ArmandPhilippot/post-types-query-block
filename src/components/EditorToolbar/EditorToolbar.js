import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { grid, list } from '@wordpress/icons';

function EditorToolbar(props) {
	const { postsLayout } = props.attributes;

	return (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					icon={list}
					title={__('List', 'PTQBlock')}
					isActive={postsLayout === 'list'}
					onClick={() => props.setAttributes({ postsLayout: 'list' })}
				/>
				<ToolbarButton
					icon={grid}
					title={__('Grid', 'PTQBlock')}
					isActive={postsLayout === 'grid'}
					onClick={() => props.setAttributes({ postsLayout: 'grid' })}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}

export default EditorToolbar;
