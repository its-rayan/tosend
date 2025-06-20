"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export const ToolbarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="w-full h-11 border-b border-accent">
    <div className="h-full flex items-center justify-center gap-2">
      {children}
    </div>
  </div>
);

export const ToolbarGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row gap-1">{children}</div>
);

export const ToolbarSeparator = () => (
  <div className="h-5">
    <Separator orientation="vertical" />
  </div>
);

export const ToolbarButton = ({
  isActive,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  isActive?: boolean | undefined;
  icon: LucideIcon;
}) => (
  <button
    className={cn(
      "text-sm p-2 flex items-center rounded-sm hover:bg-neutral-100 text-muted-foreground align-center",
      isActive && "bg-neutral-200 hover:bg-neutral-200 text-accent-foreground"
    )}
    {...props}
  >
    <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
  </button>
);
