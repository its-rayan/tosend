import { auth } from '@/auth';
import SignOutButton from '@/components/auth/signout-button';

export default async function WorkspacePage() {
  const session = await auth();
  return (
    <div className="flex items-center gap-8">
      <div>
        <h1>Workspace</h1>
        {JSON.stringify(session)}
      </div>
      <SignOutButton />
    </div>
  );
}
