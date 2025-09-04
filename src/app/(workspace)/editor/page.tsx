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
        <div className="flex w-[600px] rounded-md border border-dashed border-gray-300 bg-white">
          <p className="p-4">Canvas Area</p>
        </div>
      </div>
    </div>
  );
}
