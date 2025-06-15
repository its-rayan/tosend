import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { parseShortcutKeys } from "@/util/functions/shortcut";
import React from "react";

export const ShortcutDisplay: React.FC<{ shortcuts: string[] }> = ({
  shortcuts,
}) => {
  if (shortcuts.length === 0) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground ">
      {shortcuts.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </React.Fragment>
      ))}
    </div>
  );
};

export default function ToolbarButton({
  children,
  onClick,
  isActive,
  tooltip,
  shortcutKeys,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  tooltip?: string;
  shortcutKeys?: string;
}) {
  const isMac = React.useMemo(
    () =>
      typeof navigator !== "undefined" &&
      navigator.platform.toLowerCase().includes("mac"),
    []
  );

  const shortcuts = React.useMemo(
    () => parseShortcutKeys(shortcutKeys, isMac),
    [shortcutKeys, isMac]
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center",
            isActive &&
              "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {tooltip}
        <ShortcutDisplay shortcuts={shortcuts} />
      </TooltipContent>
    </Tooltip>
  );
}
