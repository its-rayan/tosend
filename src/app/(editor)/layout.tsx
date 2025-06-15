import HistoryButton from "@/components/editor/history-button";
import MarkButton from "@/components/editor/mark-button";
import { ToolbarGroup, ToolbarSeparator } from "@/components/editor/toolbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 border-b border-color-muted py-1">
          <div className="flex flex-1 items-center gap-2 px-3"></div>
          {/* Toolbar Content */}
          <div className=" flex flex-1 items-center gap-2">
            <ToolbarGroup>
              <HistoryButton action="undo" />
              <HistoryButton action="redo" />
            </ToolbarGroup>

            <ToolbarSeparator />

            <ToolbarGroup>
              <MarkButton type="bold" />
              <MarkButton type="italic" />
              <MarkButton type="underline" />
              <MarkButton type="strike" />
            </ToolbarGroup>
          </div>
          <div className="flex flex-1 items-center gap-2 px-3 justify-end"></div>
        </header>

        {/* Main content area for the editor */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
