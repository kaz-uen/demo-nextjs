import { createClient } from '@/app/lib/supabase/server';
import { createTask } from './actions';
import { TaskItem } from './task-item';
import { revalidatePath } from 'next/cache';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  created_at: string;
}

export default async function Page() {
  // ? （createServerClientを実行するとどうなる？）
  const supabase = await createClient();
  // ? （supabaseのtasksテーブルから全件取得している？）
  const { data }: { data: Task[] | null } = await supabase.from('tasks').select('*');

  async function handleSubmit(formData: FormData) {
    // ?
    'use server'
    // ? （引数にはformタグ内のinput要素の値が渡ってくる？）
    const title = formData.get('title') as string;
    // ?
    await createTask(title);
    // ?
    revalidatePath('/tasks');
  }

  return (
    <div>
      <h1>Tasks</h1>
      <form action={handleSubmit}>
        <input name="title" type="text" placeholder="タスク名を入力" />
        <button type="submit">追加</button>
      </form>
      <ul>
        {data?.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} completed={task.completed} />
        ))}
      </ul>
    </div>
  );
}
