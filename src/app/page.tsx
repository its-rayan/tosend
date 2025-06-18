import { ToolbarSeparator } from "@/components/editor/toolbar";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

export default function Page() {
  return (
    <main className="h-full">
      <div className="w-full h-11 border-b border-accent">
        <div className="h-full flex items-center justify-center gap-2">
          <div className="flex flex-row gap-1">
            <Button variant="ghost" size="icon" className="size-8">
              <Undo
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <Redo
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
          </div>

          <ToolbarSeparator />

          <div className="flex flex-row gap-1">
            <Button variant="ghost" size="icon" className="size-8">
              <Bold
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <Italic
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <Underline
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <Strikethrough
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
          </div>

          <ToolbarSeparator />

          <div className="flex flex-row gap-1">
            <Button variant="ghost" size="icon" className="size-8">
              <List
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <ListOrdered
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
          </div>

          <ToolbarSeparator />

          <div className="flex flex-row gap-1">
            <Button variant="ghost" size="icon" className="size-8">
              <AlignLeft
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <AlignCenter
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <AlignRight
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <AlignJustify
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
          </div>

          <ToolbarSeparator />

          <div className="flex flex-row gap-1">
            <Button variant="ghost" className="text-muted-foreground">
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-44px)] max-w-[640px] w-full mx-auto">
        <div className="p-10">Editor</div>
      </div>
    </main>
  );
}
