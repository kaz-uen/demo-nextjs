// ?（このコード全体で何をしているファイルなのか？）

'use server'

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createTask(title: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const insertData = user ? { title, user_id: user.id } : { title };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase.from('tasks').insert(insertData as any);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTaskComplete(taskId: string, completed: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tasks').update({ completed }).eq('id', taskId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tasks');
  return data;
}

export async function deleteTask(taskId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/tasks');
}
