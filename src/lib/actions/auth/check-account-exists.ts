'use server';

import connectToDbClient from '@/database/connect-db-client';
import User from '@/database/models/user';
import { actionClient } from '@/lib/actions/safe-action';
import { email, z } from 'zod';

const schema = z.object({
  email: email(),
});

export const checkAccountExistsAction = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput }) => {
    await connectToDbClient();

    const { email } = parsedInput;

    const userExists = await User.findOne({ email });

    return {
      accountExists: !!userExists,
    };
  });
