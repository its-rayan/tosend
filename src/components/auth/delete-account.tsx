import { Button } from '@/components/ui/button';
import { deleteAccountAction } from '@/lib/actions/auth/delete-account';
import { AUTH_PAGES } from '@/util/constants/auth';
import { Loader2Icon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export default function DeleteAccount({
  children,
}: {
  children: React.ReactNode;
}) {
  const { executeAsync, isPending } = useAction(deleteAccountAction, {
    onError: ({ error }) => {
      console.error('Error deleting account:', error);
      toast.error(error.serverError);
    },
  });

  const { data: session } = useSession();
  if (!session) {
    toast.error('You must be logged in to delete your account');
    return;
  }

  const deleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!session.user?.id) {
      toast.error('You must be logged in to delete your account');
      return;
    }

    const result = await executeAsync({ userId: session.user.id });
    if (!result?.data) return;

    const { success } = result.data;
    if (!success) {
      toast.error('Failed to delete account');
      return;
    }

    signOut({ callbackUrl: AUTH_PAGES.SIGN_IN });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className={
                'bg-destructive hover:bg-destructive/80 text-destructive-foreground text-white'
              }
              onClick={deleteAccount}
            >
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
