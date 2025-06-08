"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Editor() {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "focus:outline-none bg-white text-black flex flex-col min-h-[1054px] w-[768px] cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "default-test",
          },
        },
      }),
    ],
    content: `<h1>What do you want to send?</h1>`,
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
