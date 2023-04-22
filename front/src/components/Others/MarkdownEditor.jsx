import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../styles/others/MarkdownEditor.css";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";

function MarkdownEditor({ editorState, setEditorState = () => {} }) {
  const [markdown, setMarkdown] = useState(EditorState.createEmpty());

  // create a function to convert markdown to draftjs.
  useEffect(() => {
    const convertToDraft = () => {
      const contentBlock = markdownToDraft(editorState);
      if (contentBlock) {
        const contentState = convertFromRaw(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setMarkdown(editorState);
      }
    };
    convertToDraft();
  }, []);

  useEffect(() => {
    const convertToMarkdown = () => {
      setEditorState(markdown && draftToMarkdown(convertToRaw(markdown.getCurrentContent()))) || "";
    };
    convertToMarkdown();
  }, [markdown]);

  return (
    <div>
      <Editor
        toolbar={{
          options: ["inline", "list", "emoji", "history"],

          inline: {
            options: ["bold", "italic"],
          },
          textAlign: {
            options: ["left", "center", "right", "justify"],
          },
          history: {
            options: ["undo", "redo"],
          },
          emoji: {
            options: ["emoji"],
          },
        }}
        editorState={markdown}
        onEditorStateChange={(markdown) => setMarkdown(markdown)}
        editorClassName="editor"
        wrapperClassName="editorWrapper"
        toolbarClassName="editorToolbar"
      />
    </div>
  );
}

export default MarkdownEditor;
