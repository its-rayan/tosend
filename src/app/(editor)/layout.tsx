import HistoryButton from "@/components/editor/history-button";
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
          </div>
          <div className="flex flex-1 items-center gap-2 px-3 justify-end"></div>
        </header>

        {/* Main content area for the editor */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
