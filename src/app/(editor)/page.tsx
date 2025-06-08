import { Editor } from "./editor";
import { EditorToolbar } from "./editor-toolbar";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-5 px-4 py-10 pt-6">
      <div className="bg-muted/50 mx-auto w-full max-w-3xl rounded-xl">
        <EditorToolbar />
      </div>
      <div className="bg-muted/50 mx-auto min-h-screen w-full max-w-3xl">
        <Editor />
      </div>
    </div>
  );
}
