import { Separator } from "@/components/ui/separator";

export const ToolbarGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1">{children}</div>
);

export const ToolbarSeparator = () => (
  <div className="h-5">
    <Separator orientation="vertical" />
  </div>
);
