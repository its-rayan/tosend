import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { EditorHeader } from "./editor-header";
import { Toolbar } from "./toolbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <SidebarInset>
        {/* <EditorHeader /> */}
        <Toolbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
