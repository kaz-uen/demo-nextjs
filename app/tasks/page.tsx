import { createClient } from '@/app/lib/supabase/server';
import { TaskItem } from './task-item';
import { CreateTaskForm } from './create-task-form';

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

  return (
    <div>
      <h1>Tasks</h1>
      <CreateTaskForm />
      <ul>
        {data?.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} completed={task.completed} />
        ))}
      </ul>
    </div>
  );
}
