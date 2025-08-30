'use server';

import connectToDbClient from '@/database/connect-db-client';
import Account from '@/database/models/account';
import User from '@/database/models/user';
import { actionClient } from '@/lib/actions/safe-action';
import { z } from 'zod';

const schema = z.object({
  userId: z.string().min(1),
});

export const deleteAccountAction = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput }) => {
    await connectToDbClient();

    const { userId } = parsedInput;

    // check and delete account object if user has one
    const dbAccount = await Account.findOne({ userId });
    if (dbAccount) {
      await Account.deleteOne({ userId });
    }

    await User.deleteOne({ _id: userId });

    const userExists = await User.findOne({ _id: userId });

    return {
      success: userExists ? false : true,
    };
  });
