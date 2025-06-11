'use server';

import { createUser } from '@/lib/db/queries';

export async function createUserAction(userId: string, email: string) {
  try {
    await createUser(userId, email);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
  }
}
