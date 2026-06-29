import { signIn, signUp, signOut } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="mx-auto flex w-full max-w-[400px] flex-col gap-6 p-4">
        <h1 className="text-2xl font-bold">認証</h1>

        {error && (
          <p className="rounded bg-red-100 p-3 text-sm text-red-600">{error}</p>
        )}
        {message && (
          <p className="rounded bg-green-100 p-3 text-sm text-green-600">{message}</p>
        )}

        <section className="flex flex-col gap-2">
          <h2 className="font-semibold">ログイン</h2>
          <form action={signIn} className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              className="w-full rounded border p-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="パスワード"
              className="w-full rounded border p-2"
              required
            />
            <button type="submit" className="rounded bg-blue-500 p-2 text-white">
              ログイン
            </button>
          </form>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-semibold">アカウント作成</h2>
          <form action={signUp} className="flex flex-col gap-2">
            <input
              type="email"
              name="email"
              placeholder="メールアドレス"
              className="w-full rounded border p-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="パスワード"
              className="w-full rounded border p-2"
              required
            />
            <button type="submit" className="rounded bg-green-500 p-2 text-white">
              サインアップ
            </button>
          </form>
        </section>

        <section>
          <h2 className="mb-2 font-semibold">ログアウト</h2>
          <form action={signOut}>
            <button type="submit" className="rounded border p-2 text-sm">
              ログアウト
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
