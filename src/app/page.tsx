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
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";

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
  ImagePlus,
  ChevronDown,
  Heading as HeadingIcon,
  Heading1 as HeadingOneIcon,
  Heading2 as HeadingTwoIcon,
  Heading3 as HeadingThreeIcon,
  Heading4 as HeadingFourIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Clipboard,
} from "lucide-react";

// Editor Store
// This is a custom store for managing the editor instance
import { useEditorStore } from "@/store/use-editor-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeadingLevel } from "@/util/constants/editor";
import { Button } from "@/components/ui/button";

const defaultContent = `
  <h1>Welcome to ToSend 👋</h1>
  <p>Your space to design beautiful, responsive email templates—without the hassle.</p>

  <p></p>
  <h2>✨ Get Started</h2>
  <ul>
    <li>Add your logo, text, and images</li>
    <li>Drag and drop layout blocks</li>
    <li>Customize styles to match your brand</li>
  </ul>

  <p>Everything you create here is optimized for inboxes of all shapes and sizes.</p>
  <p></p>

  <p>Happy designing,<br/>The ToSend Team</p>
`;

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
  label,
}: {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label?: string;
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
      {label && <span className="ml-2">{label}</span>}
    </button>
  );
};

const ToolbarHeadingDropdown = () => {
  const { editor } = useEditorStore();

  const levels: HeadingLevel[] = [1, 2, 3, 4];

  const headingIcons: Partial<Record<HeadingLevel, LucideIcon>> = {
    1: HeadingOneIcon,
    2: HeadingTwoIcon,
    3: HeadingThreeIcon,
    4: HeadingFourIcon,
  };

  const getActiveIcon = () => {
    if (!editor) return <HeadingIcon className="h-4 w-4" aria-hidden="true" />;

    const activeLevel = levels.find((level) =>
      editor.isActive("heading", { level })
    ) as HeadingLevel | undefined;

    if (!activeLevel)
      return <HeadingIcon className="h-4 w-4" aria-hidden="true" />;

    const ActiveIcon = headingIcons[activeLevel] as LucideIcon;
    return <ActiveIcon className="h-4 w-4" aria-hidden="true" />;
  };

  const getCurrentHeading = () => {
    for (let level = 1; level <= 4; level++) {
      if (editor?.isActive("heading", { level })) {
        return getActiveIcon();
      }
    }
    return null; // No heading active, return null
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center",
            !!getCurrentHeading() &&
              "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
          )}
        >
          <span>
            {getCurrentHeading() || (
              <HeadingIcon className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
          <ChevronDown className="h-2 w-2" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {levels.map((level) => {
          const Icon = headingIcons[level] || HeadingOneIcon; // Default to HeadingOneIcon if not found
          return (
            <DropdownMenuItem key={`heading-${level}`} asChild>
              <button
                onClick={() => {
                  if (level < 1) {
                    editor?.chain().focus().setParagraph().run();
                  } else {
                    editor?.chain().focus().toggleHeading({ level }).run();
                  }
                }}
                className={cn(
                  "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground",
                  editor?.isActive("heading", { level }) &&
                    "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 mr-2" aria-hidden="true" />
                {`Heading ${level}`}
              </button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ToolbarListDropdown = () => {
  const { editor } = useEditorStore();

  const getCurrentList = () => {
    if (editor?.isActive("bulletList")) {
      return <List className="h-4 w-4" aria-hidden="true" />;
    }
    if (editor?.isActive("orderedList")) {
      return <ListOrdered className="h-4 w-4" aria-hidden="true" />;
    }

    return null; // No list active, return null
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center",
            !!getCurrentList() &&
              "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
          )}
        >
          <span>
            {getCurrentList() || (
              <List className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
          <ChevronDown className="h-2 w-2" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        <DropdownMenuItem asChild>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={cn(
              "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground",
              editor?.isActive("bulletList") &&
                "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
            )}
          >
            <List className="h-4 w-4 mr-2" aria-hidden="true" />
            {`Bullet List`}
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={cn(
              "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground",
              editor?.isActive("orderedList") &&
                "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
            )}
          >
            <ListOrdered className="h-4 w-4 mr-2" aria-hidden="true" />
            {`Ordered List`}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
    [
      {
        label: "Add Image",
        icon: ImagePlus,
        onClick: () => {
          const url = prompt("Enter image URL");
          if (url) {
            editor?.chain().focus().setImage({ src: url }).run();
          }
        },
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
          <ToolbarHeadingDropdown />
          <ToolbarListDropdown />
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
          <ToolbarButton
            onClick={() => {
              const url = prompt("Enter link URL");
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              }
            }}
            icon={LinkIcon}
            isActive={editor?.isActive("link") ? true : false}
          />
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

        <ToolbarSeparator />

        <ToolbarGroup>
          {sections[3].map((section, index) => (
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
          <Button
            size={"sm"}
            onClick={() => {
              if (editor) {
                const html = editor.getHTML();
                navigator.clipboard.writeText(html).then(() => {
                  alert("HTML copied to clipboard!");
                });
              } else {
                alert("Editor not initialized.");
              }
            }}
          >
            <Clipboard className="h-4 w-4" aria-hidden="true" />
            Copy HTML
          </Button>
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
    editorProps: {
      attributes: {
        class:
          "focus:outline-none p-12 flex flex-col h-full w-full text-base cursor-text",
      },
    },
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      ImageResize,
      Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
      }),
    ],
    content: defaultContent,
  });

  return (
    <div className="h-[calc(100vh-44px)] max-w-[640px] w-full mx-auto">
      <EditorContent editor={editor} />
    </div>
  );
};

export default function Page() {
  return (
    <main className="h-full bg-white">
      <MainToolbar />
      <Editor />
    </main>
  );
}
