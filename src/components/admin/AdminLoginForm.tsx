import React, { useState } from 'react';
import { useRouter } from '../../lib/use-router.js';
import { api } from '../../lib/api-client.js';
import Button from '../ui/Button.js';
import Card from '../ui/Card.js';
import { KeyRound, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AdminLoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { navigate } = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.adminLogin(email, password);
      if (res.token) {
        localStorage.setItem('admin_token', res.token);
        // Refresh and route to admin console
        navigate('/admin');
      } else {
        setErrorMsg('Ошибка авторизации. Попробуйте снова.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Неверный логин или пароль. Пожалуйста, проверьте вводимые данные.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Decorative vector */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-24 w-90 h-90 rounded-full bg-slate-500/5 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-widest text-slate-900 uppercase">
            ВХОД В АДМИНКУ
          </h1>
          <p className="font-mono text-[10px] tracking-widest text-amber-800 uppercase font-semibold">
            Панель управления • Проект Я
          </p>
        </div>

        <Card className="p-8 sm:p-10 border border-stone-200 bg-white">
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 font-light flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Default credentials notice */}
            <div className="p-3.5 bg-amber-500/5 text-amber-900 text-xs rounded-lg border border-amber-500/10 font-light space-y-1">
              <p className="font-semibold font-mono tracking-wider">ДЕМО ДОСТУП:</p>
              <p>Email: <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">admin@project-ya.ru</code></p>
              <p>Пароль: <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">adminpassword</code></p>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-mono tracking-widest uppercase text-stone-600 font-medium">
                Email адрес
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@project-ya.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-stone-200 text-stone-900 text-sm rounded-md focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-mono tracking-widest uppercase text-stone-600 font-medium">
                Пароль
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] border border-stone-200 text-stone-900 text-sm rounded-md focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-xs font-semibold tracking-widest uppercase"
            >
              {loading ? 'Вход в систему...' : 'Войти в панель'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
export default AdminLoginForm;
