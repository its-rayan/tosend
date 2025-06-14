"use client";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Image,
  Italic,
  LucideIcon,
  Redo,
  Underline,
  Undo,
} from "lucide-react";

const Icons = [
  {
    name: "image",
    icon: Image,
    alt: "Image",
  },
  {
    name: "bold",
    icon: Bold,
    alt: "Bold",
  },
  {
    name: "italic",
    icon: Italic,
    alt: "Italic",
  },
  {
    name: "underline",
    icon: Underline,
    alt: "Underline",
  },
  {
    name: "align-left",
    icon: AlignLeft,
    alt: "Align Left",
  },
  {
    name: "align-center",
    icon: AlignCenter,
    alt: "Align Center",
  },
  {
    name: "align-right",
    icon: AlignRight,
    alt: "Align Right",
  },
  {
    name: "undo",
    icon: Undo,
    alt: "Undo",
  },
  {
    name: "redo",
    icon: Redo,
    alt: "Redo",
  },
];

interface ToolbarButton {
  onClick: () => void;
  isActive: boolean;
  icon: LucideIcon;
  label: string;
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButton) => {
  return (
    <button
      key={Icon.name}
      onClick={onClick}
      className={cn(
        "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center",
        isActive && "bg-neutral-100 text-accent-foreground "
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};

export function EditorToolbar() {
  const { editor } = useEditorStore();
  if (!editor) {
    return null;
  }

  console.log("Editor instance:", { editor });

  return (
    <div className="flex h-full w-full bg-[#fff] items-center gap-1">
      <div className="flex items-center gap-2">
        {Icons.map((icon) => (
          <ToolbarButton
            key={icon.name}
            onClick={() => {}}
            isActive={false}
            icon={icon.icon}
            label={icon.alt}
          />
        ))}
      </div>
    </div>
  );
}
