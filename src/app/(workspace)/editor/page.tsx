import { Button } from '@/components/ui/button';
import { Code, Save, Send } from 'lucide-react';

export default async function EditorPage() {
  return (
    <div>
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <div></div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="shadow-lg">
            <Send />
          </Button>
          <Button variant="outline" className="shadow-lg">
            <Save />
          </Button>
          <Button variant="outline" className="shadow-lg">
            <Code />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative h-[80vh] w-[600px] overflow-hidden rounded-md border border-dashed border-gray-300 bg-white">
          <p className="p-4">Canvas Area</p>
        </div>
      </div>
    </div>
  );
}
