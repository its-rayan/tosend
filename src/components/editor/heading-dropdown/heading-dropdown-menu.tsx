"use client";

import {
  ChevronDownIcon,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import React from "react";
import { useEditorStore } from "@/store/use-editor-store";
import HeadingDropdownMenuItem from "./heading-dropdown-menu-item";
import { HeadingLevel } from "@/util/constants/editor";
import { cn } from "@/lib/utils";

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

export default function HeadingDropdownMenu({
  levels = [1, 2, 3, 4, 5, 6],
}: {
  levels?: HeadingLevel[];
}) {
  const { editor } = useEditorStore();
  const getActiveIcon = React.useCallback(() => {
    if (!editor) return <Heading className="h-4 w-4" aria-hidden="true" />;

    const activeLevel = levels.find((level) =>
      editor.isActive("heading", { level })
    ) as HeadingLevel | undefined;

    if (!activeLevel) return <Heading className="h-4 w-4" aria-hidden="true" />;

    const ActiveIcon = headingIcons[activeLevel];
    return <ActiveIcon className="h-4 w-4" aria-hidden="true" />;
  }, [editor, levels]);

  if (!editor) {
    return null;
  }

  const isActive = editor?.isActive("heading") ?? false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center",
            isActive &&
              "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
          )}
        >
          {getActiveIcon()}
          <ChevronDownIcon className="h-3 w-3" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto" align="start">
        <DropdownMenuGroup>
          {levels.map((level) => (
            <DropdownMenuItem key={`heading-${level}`} asChild>
              <HeadingDropdownMenuItem editor={editor} level={level} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
