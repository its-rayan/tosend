"use client";

import { useEditorStore } from "@/store/use-editor-store";
import { Redo, Undo } from "lucide-react";
import ToolbarButton from "./toolbar-button";

type HistoryAction = "undo" | "redo";

const historyShortcutKeys: Partial<Record<HistoryAction, string>> = {
  undo: "Ctrl-z",
  redo: "Ctrl-Shift-z",
};

const historyActionLabels: Record<HistoryAction, string> = {
  undo: "Undo",
  redo: "Redo",
};

const historyIcons = {
  undo: Undo,
  redo: Redo,
};

export default function HistoryButton({ action }: { action: HistoryAction }) {
  const { editor } = useEditorStore();
  if (!editor) {
    return null;
  }
  const Icon = historyIcons[action];
  const actionLabel = historyActionLabels[action];
  const shortcutKey = historyShortcutKeys[action];

  return (
    <ToolbarButton
      onClick={() => editor.chain().focus()[action]().run()}
      tooltip={actionLabel}
      shortcutKeys={shortcutKey}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </ToolbarButton>
  );
}
