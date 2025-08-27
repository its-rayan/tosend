import { getCurrentUser } from '@/lib/auth/session';

export default async function WorkspacePage() {
  const user = await getCurrentUser();
  return (
    <div className="flex items-center gap-8">
      <div>
        <h1>Workspace</h1>
        {JSON.stringify(user)}
      </div>
    </div>
  );
}
