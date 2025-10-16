
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE_URL || "";

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");
  const login = (t) => { localStorage.setItem("auth_token", t); setToken(t); };
  const logout = () => { localStorage.removeItem("auth_token"); setToken(""); };
  return { token, login, logout };
}

function Topbar({title}){
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-2xl bg-primary-600"></div>
          <span className="font-semibold">{title}</span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link className="hover:text-primary-700" to="/">الرئيسية</Link>
          <Link className="hover:text-primary-700" to="/dashboard">لوحة التحكم</Link>
          <Link className="hover:text-primary-700" to="/about">عن المنصة</Link>
        </nav>
      </div>
    </div>
  )
}

function LoginPage({auth}){
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  async function submit(e){
    e.preventDefault();
    try{
      const res = await fetch(apiBase + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if(!res.ok){ setMsg("فشل تسجيل الدخول"); return; }
      const data = await res.json();
      auth.login(data.token || "demo-token");
    } catch(err){ setMsg("تعذر الاتصال بالخادم"); }
  }
  if(auth.token) return <Navigate to="/dashboard" replace />;
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow">
        <h1 className="text-xl font-semibold mb-4">تسجيل الدخول</h1>
        <label className="block text-sm">البريد</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full border rounded-xl px-3 py-2 mb-3" />
        <label className="block text-sm">كلمة المرور</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border rounded-xl px-3 py-2 mb-4" />
        <button className="w-full rounded-xl bg-primary-700 text-white py-2">دخول</button>
        {msg && <p className="text-red-600 mt-3 text-sm">{msg}</p>}
      </form>
    </div>
  )
}

function Dashboard({auth, kind}){
  const [stats, setStats] = useState({projects:0, tasks:0, risk:0});
  useEffect(()=>{
    (async ()=>{
      try {
        const res = await fetch(apiBase + (kind==="admin"?"/admin/overview":"/user/overview"), {
          headers: { Authorization: "Bearer " + auth.token }
        });
        if(res.ok){ setStats(await res.json()); }
      } catch{}
    })();
  }, [auth.token, kind]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">لوحة مؤشرات {kind==="admin"?"الإدارة":"المستخدم"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="عدد المشاريع" value={stats.projects} />
        <Card title="عدد المهام" value={stats.tasks} />
        <Card title="مؤشر المخاطر" value={stats.risk} />
      </div>
      <div className="mt-6 bg-white p-4 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">نشاط حديث</h3>
        <ul className="list-disc pr-6 text-sm text-gray-700">
          <li>تجربة واجهة جديدة.</li>
          <li>تكامل API عبر المتغيرات البيئية.</li>
          <li>جاهزية للنشر على Render و Google Cloud.</li>
        </ul>
      </div>
    </div>
  )
}

function Card({title, value}){
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-1">{value ?? 0}</div>
    </div>
  )
}

function About(){
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 text-gray-700 leading-8">
      <h2 className="text-lg font-semibold mb-3">عن المنصة</h2>
      <p>واجهة حديثة خفيفة (React + Vite + Tailwind) تدعم العربية/RTL، قابلة للنشر فورًا.</p>
      <p>يمكن ضبط عنوان واجهة البرمجة عبر المتغير <code>VITE_API_BASE_URL</code>.</p>
    </div>
  )
}

export default function App({title, kind}){
  const auth = useAuth();
  return (
    <BrowserRouter>
      <Topbar title={title} />
      <Routes>
        <Route path="/" element={<LoginPage auth={auth} />} />
        <Route path="/dashboard" element={<Dashboard auth={auth} kind={kind} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
