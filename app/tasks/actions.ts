// ?（このコード全体で何をしているファイルなのか？）

'use server'

import { createClient } from '@/app/lib/supabase/server';

export async function createTask(title: string, user_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tasks').insert({ title , user_id });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
