"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  Bold,
  Italic,
  type LucideIcon,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

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

export function Toolbar() {
  const { editor } = useEditorStore();
  if (!editor) {
    return null;
  }

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
        isActive: editor.isActive("bold"),
      },
      {
        label: "Italic",
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
      },
      {
        label: "Underline",
        icon: Underline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
      },
      {
        label: "Strikethrough",
        icon: Strikethrough,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
      },
    ],
  ];

  return (
    <div
      role="toolbar"
      className="flex h-14 shrink-0 gap-2 border border-b border-color-muted px-3"
    >
      <div className="bg-muted/50 flex flex-1"></div>

      <div className="mx-auto w-full max-w-3xl flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          {sections[0].map(({ icon: Icon, onClick, label, isActive }) => (
            <ToolbarButton
              key={label}
              onClick={onClick}
              isActive={isActive}
              icon={Icon}
            />
          ))}
        </div>
        <div className="h-5">
          <Separator orientation="vertical" />
        </div>
        {/* TODO: Add heading and font family buttons */}
        <div className="h-5">
          <Separator orientation="vertical" />
        </div>

        {/* Text decoration buttons */}
        <div className="flex items-center gap-1">
          {sections[1].map(({ icon: Icon, onClick, isActive, label }) => (
            <ToolbarButton
              key={label}
              onClick={onClick}
              isActive={isActive}
              icon={Icon}
            />
          ))}
        </div>
      </div>

      <div className="bg-muted/50 flex flex-1"></div>
    </div>
  );
}
