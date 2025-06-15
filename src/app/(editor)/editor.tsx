"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import { useEditorStore } from "@/store/use-editor-store";

export function Editor() {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor, error }) => {
      console.error("Content error:", error);
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none bg-white text-black flex flex-col min-h-[1054px] w-[768px] cursor-text",
      },
    },
    extensions: [StarterKit, Image, ImageResize, FontFamily, Underline],
    content: `<p>What do you want to send?</p>`,
    immediatelyRender: false,
  });

  return (
    <div className="size-full overflow-x-auto print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex print:py-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
