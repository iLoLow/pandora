function MarkdownEditor({ editorState, setEditorState }) {
	return (
		<div>
			<Editor
				editorState={editorState}
				onEditorStateChange={setEditorState}
				wrapperClassName="wrapper-class"
				editorClassName="editor-class"
				toolbarClassName="toolbar-class"
			/>
		</div>
	)
}

export default MarkdownEditor
