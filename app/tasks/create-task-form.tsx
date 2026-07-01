'use client';

import { useActionState } from 'react';
import { createTask, type CreateTaskState } from './actions';

const initialState: CreateTaskState = null;

export function CreateTaskForm() {
  // useActionState(action, 初期状態) → [結果, フォームに渡すaction, 送信中フラグ]
  const [state, formAction, isPending] = useActionState(createTask, initialState);

  return (
    <div>
      <form action={formAction}>
        <input name="title" type="text" placeholder="タスク名を入力" />
        <button type="submit" disabled={isPending}>追加</button>
      </form>
      {/* result.error?.title?._errors の配列をフォームの下に表示 */}
      {state?.error?.title?._errors?.map((error, i) => (
        <p key={i} style={{ color: 'red' }}>{error}</p>
      ))}
    </div>
  );
}
