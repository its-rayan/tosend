"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

export function Editor() {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "focus:outline-none bg-white text-black flex flex-col min-h-[1054px] w-[768px] cursor-text",
      },
    },
    extensions: [StarterKit, Image, ImageResize],
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
