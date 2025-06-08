import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EditorHeader } from "./editor-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <SidebarInset>
        <EditorHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
