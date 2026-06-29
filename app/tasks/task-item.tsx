'use client'

import { updateTaskComplete, deleteTask } from './actions';

type Props = {
  id: string;
  title: string;
  completed: boolean;
}

export function TaskItem({ id, title, completed }: Props) {
  return (
    <li>
      {title}
      <input
        type="checkbox"
        defaultChecked={completed}
        onChange={(e) => updateTaskComplete(id, e.target.checked)}
      />
      <form action={deleteTask.bind(null, id)}>
        <button type="submit">削除</button>
      </form>
    </li>
  );
}
