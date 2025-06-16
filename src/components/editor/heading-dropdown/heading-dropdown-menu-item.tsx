import { type Editor } from "@tiptap/react";
import ToolbarButton from "../toolbar-button";
import { HeadingLevel } from "@/util/constants/editor";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

const isNodeInSchema = (nodeName: string, editor: Editor | null): boolean => {
  if (!editor?.schema) return false;
  return editor.schema.spec.nodes.get(nodeName) !== undefined;
};

export const headingIcons = {
  1: Heading1,
  2: Heading2,
  3: Heading3,
  4: Heading4,
  5: Heading5,
  6: Heading6,
};

export const headingShortcutKeys: Partial<Record<HeadingLevel, string>> = {
  1: "Ctrl-Alt-1",
  2: "Ctrl-Alt-2",
  3: "Ctrl-Alt-3",
  4: "Ctrl-Alt-4",
  5: "Ctrl-Alt-5",
  6: "Ctrl-Alt-6",
};

export function canToggleHeading(
  editor: Editor | null,
  level: HeadingLevel
): boolean {
  if (!editor) return false;

  try {
    return editor.can().toggleNode("heading", "paragraph", { level });
  } catch {
    return false;
  }
}

export function isHeadingActive(
  editor: Editor | null,
  level: HeadingLevel
): boolean {
  if (!editor) return false;
  return editor.isActive("heading", { level });
}

export function toggleHeading(
  editor: Editor | null,
  level: HeadingLevel
): void {
  if (!editor) return;

  if (editor.isActive("heading", { level })) {
    editor.chain().focus().setNode("paragraph").run();
  } else {
    editor.chain().focus().toggleNode("heading", "paragraph", { level }).run();
  }
}

export function getFormattedHeadingName(level: HeadingLevel): string {
  return `Heading ${level}`;
}

export function useHeadingState(editor: Editor | null, level: HeadingLevel) {
  const headingInSchema = isNodeInSchema("heading", editor);
  const isActive = isHeadingActive(editor, level);

  const Icon = headingIcons[level];
  const shortcutKey = headingShortcutKeys[level];
  const formattedName = getFormattedHeadingName(level);

  return {
    headingInSchema,
    isActive,
    Icon,
    shortcutKey,
    formattedName,
  };
}

export default function HeadingDropdownMenuItem({
  editor,
  level,
}: {
  editor: Editor | null;
  level: HeadingLevel;
}) {
  const { isActive, Icon } = useHeadingState(editor, level);

  return (
    <ToolbarButton onClick={() => console.log("heading")} isActive={isActive}>
      <span className="flex items-center w-full gap-2">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {getFormattedHeadingName(level) && (
          <span>{getFormattedHeadingName(level)}</span>
        )}
      </span>
    </ToolbarButton>
  );
}
