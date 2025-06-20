import { ToolbarContent } from "@/components/editor/toolbar";

export default function Page() {
  return (
    <main className="h-full">
      <ToolbarContent />

      <div className="h-[calc(100vh-44px)] max-w-[640px] w-full mx-auto">
        <div className="p-10">Editor</div>
      </div>
    </main>
  );
}
