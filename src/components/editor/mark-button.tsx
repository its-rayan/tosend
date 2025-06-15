"use client";

import { useEditorStore } from "@/store/use-editor-store";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import ToolbarButton from "./toolbar-button";
import { capitalizeFirstLetter } from "@/util/functions/capitalize";

type Mark = "bold" | "italic" | "underline" | "strike";

export const markIcons = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strike: Strikethrough,
};

export const markShortcutKeys: Partial<Record<Mark, string>> = {
  bold: "Ctrl-b",
  italic: "Ctrl-i",
  underline: "Ctrl-u",
  strike: "Ctrl-Shift-s",
};

export default function MarkButton({ type }: { type: Mark }) {
  const { editor } = useEditorStore();
  if (!editor) {
    return null;
  }

  const label = capitalizeFirstLetter(type);
  const Icon = markIcons[type];
  const shortcutKey = markShortcutKeys[type];
  const isActive = editor.isActive(type);

  return (
    <ToolbarButton
      onClick={() => editor.chain().focus().toggleMark(type).run()}
      tooltip={label}
      shortcutKeys={shortcutKey}
      isActive={isActive}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </ToolbarButton>
  );
}
