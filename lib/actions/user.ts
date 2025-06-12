'use server';

import { insertUser } from '@/lib/db/queries';

export async function insertUserAction(userId: string, email: string) {
  try {
    const user = await insertUser(userId, email);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
