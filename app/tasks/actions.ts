// ?（このコード全体で何をしているファイルなのか？）

'use server'

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import * as z from 'zod'

const taskSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100)
});

// useActionState で受け取る createTask の戻り値（結果）の型
export type CreateTaskState = {
  error?: z.inferFormattedError<typeof taskSchema>;
} | null;

export async function createTask(
  _prevState: CreateTaskState,
  formData: FormData
): Promise<CreateTaskState> {
  const validatedFields = taskSchema.safeParse({
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    // { title?: { _errors: string[] }, _errors: string[] } の形で返す
    return { error: validatedFields.error.format() };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const insertData = user ? { title: validatedFields.data.title, user_id: user.id } : { title: validatedFields.data.title };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from('tasks').insert(insertData as any);

  if (error) {
    return { error: { _errors: [error.message] } };
  }

  revalidatePath('/tasks');
  return null;
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
