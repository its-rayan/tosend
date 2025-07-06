"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// TipTap Editor
import { useEditor, EditorContent } from "@tiptap/react";

// TipTap Extensions
// https://tiptap.dev/api/extensions
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

// Lucide Icons
// https://lucide.dev/icons
import {
  Bold,
  Italic,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
  type LucideIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

// Editor Store
// This is a custom store for managing the editor instance
import { useEditorStore } from "@/store/use-editor-store";

const ToolbarSeparator = () => {
  return (
    <div className="h-5">
      <Separator orientation="vertical" />
    </div>
  );
};

const ToolbarGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-1">{children}</div>;
};

const ToolbarContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">{children}</div>
);

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center",
        isActive && "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};

const MainToolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo,
        onClick: () => editor?.chain().focus().redo().run(),
      },
    ],
    [
      {
        label: "Bold",
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
      {
        label: "Strikethrough",
        icon: Strikethrough,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
      },
    ],
    [
      {
        label: "Align Left",
        icon: AlignLeft,
        onClick: () => editor?.chain().focus().setTextAlign("left").run(),
        isActive: editor?.isActive({ textAlign: "left" }),
      },
      {
        label: "Align Center",
        icon: AlignCenter,
        onClick: () => editor?.chain().focus().setTextAlign("center").run(),
        isActive: editor?.isActive({ textAlign: "center" }),
      },
      {
        label: "Align Right",
        icon: AlignRight,
        onClick: () => editor?.chain().focus().setTextAlign("right").run(),
        isActive: editor?.isActive({ textAlign: "right" }),
      },
      {
        label: "Justify",
        icon: AlignJustify,
        onClick: () => editor?.chain().focus().setTextAlign("justify").run(),
        isActive: editor?.isActive({ textAlign: "justify" }),
      },
    ],
  ];

  return (
    <div
      role="toolbar"
      className="w-full h-[44px] flex items-center justify-center px-4 border-b border-accent"
    >
      <ToolbarContainer>
        <ToolbarGroup>
          {sections[0].map((section, index) => (
            <ToolbarButton
              key={index}
              onClick={section.onClick}
              icon={section.icon}
              isActive={section.isActive}
            />
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {sections[1].map((section, index) => (
            <ToolbarButton
              key={index}
              onClick={section.onClick}
              icon={section.icon}
              isActive={section.isActive}
            />
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {sections[2].map((section, index) => (
            <ToolbarButton
              key={index}
              onClick={section.onClick}
              icon={section.icon}
              isActive={section.isActive}
            />
          ))}
        </ToolbarGroup>
      </ToolbarContainer>
    </div>
  );
};

const Editor = () => {
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
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return <EditorContent editor={editor} />;
};

export default function Page() {
  return (
    <main className="h-full bg-white">
      <MainToolbar />
      <Editor />
    </main>
  );
}
