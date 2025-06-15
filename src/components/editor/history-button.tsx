"use client";

import { cn } from "@/lib/utils";
import { type Editor } from "@tiptap/react";
import { Redo, Undo } from "lucide-react";

type HistoryAction = "undo" | "redo";

const historyIcons = {
  undo: Undo,
  redo: Redo,
};

const historyShortcutKeys: Partial<Record<HistoryAction, string>> = {
  undo: "Ctrl-z",
  redo: "Ctrl-Shift-z",
};

const historyActionLabels: Record<HistoryAction, string> = {
  undo: "Undo",
  redo: "Redo",
};

export default function HistoryButton({
  editor,
  action,
}: {
  editor?: Editor | null;
  action: HistoryAction;
}) {
  const Icon = historyIcons[action];
  return (
    <button
      onClick={() => {
        if (!editor) return;
        editor.chain().focus()[action]().run();
      }}
      className={cn(
        "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{historyActionLabels[action]}</span>
    </button>
  );
}
