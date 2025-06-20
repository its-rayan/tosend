"use client";
import {
  ToolbarContainer,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarButton,
} from "@/components/editor/toolbar";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/use-editor-store";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

export default function ToolbarContent() {
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
    <ToolbarContainer>
      <ToolbarGroup>
        {sections[0].map((section) => (
          <ToolbarButton
            key={section.label}
            icon={section.icon}
            isActive={section.isActive}
            onClick={section.onClick}
          />
        ))}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <Button variant="ghost" size="icon" className="size-8">
          <Bold className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <Italic
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <Underline
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <Strikethrough
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <Button variant="ghost" size="icon" className="size-8">
          <List className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <ListOrdered
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />

      <ToolbarGroup>
        <Button variant="ghost" size="icon" className="size-8">
          <AlignLeft
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <AlignCenter
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <AlignRight
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <AlignJustify
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </Button>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <Button variant="ghost" className="text-muted-foreground">
          <ImagePlus className="h-4 w-4" aria-hidden="true" />
          Add
        </Button>
      </ToolbarGroup>
    </ToolbarContainer>
  );
}
