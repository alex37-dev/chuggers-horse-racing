import Layout from '@/components/Layout';

export default function LoginPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="mt-2 text-slate-600">This is the placeholder login screen for the first deployable version. Next pass will wire this to Supabase auth.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Password" type="password" />
          <button className="w-full rounded-2xl bg-emerald-700 px-4 py-3 font-semibold text-white">Sign in</button>
        </div>
      </section>
    </Layout>
  );
}
