'use server';

import connectToDbClient from '@/database/connect-db-client';
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

    await User.deleteOne({ _id: userId });

    const userExists = await User.findOne({ _id: userId });

    return {
      success: userExists ? false : true,
    };
  });
