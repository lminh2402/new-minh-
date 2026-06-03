import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, User, Stethoscope, ShieldCheck, Mail, Lock, Eye, ArrowRight, Building2 } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('doctor');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(role);
    if (role === 'doctor') {
      navigate('/consultation');
    } else if (role === 'expert') {
      navigate('/expert/overview');
    } else {
      // If patient role is kept, though user said only doctor/expert needed
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-white overflow-hidden">
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-5/12 bg-blue-600 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-blue-600 shadow-lg">
            <HeartPulse size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">MedTriage<span className="text-blue-200">AI</span></span>
        </div>

        <div className="relative z-10 my-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Hệ thống phân loại<br/>bệnh nhân thông minh
          </h1>
          <p className="text-blue-100 text-lg mb-12 max-w-md leading-relaxed">
            Ứng dụng AI hỗ trợ triage, đánh giá triệu chứng và phân loại mức độ khẩn cấp — giúp bệnh nhân tiếp cận chăm sóc y tế nhanh hơn.
          </p>

          <div className="flex items-center gap-8 bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 w-fit">
            <div>
              <span className="block text-2xl font-black">24/7</span>
              <span className="text-blue-200 text-sm">Hỗ trợ liên tục</span>
            </div>
            <div className="w-px h-12 bg-blue-400/50"></div>
            <div>
              <span className="block text-2xl font-black">98.5%</span>
              <span className="text-blue-200 text-sm">Độ chính xác AI</span>
            </div>
            <div className="w-px h-12 bg-blue-400/50"></div>
            <div>
              <span className="block text-2xl font-black">&lt;30s</span>
              <span className="text-blue-200 text-sm">Phản hồi</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-200">
          <p>&copy; 2026 MedTriageAI. Bảo mật theo tiêu chuẩn HIPAA.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 xl:px-32 relative overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          
          <div className="flex lg:hidden items-center gap-2 mb-10">
             <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg">
              <HeartPulse size={20} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">MedTriage<span className="text-blue-600">AI</span></span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Chào mừng trở lại</h2>
            <p className="text-gray-500">Đăng nhập để tiếp tục sử dụng hệ thống</p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">Chọn vai trò của bạn</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setRole('doctor')}
                className={`flex flex-col items-start p-4 border-2 rounded-2xl transition-all text-left group ${
                  role === 'doctor' ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  role === 'doctor' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                }`}>
                  <Stethoscope size={20} />
                </div>
                <span className={`font-bold text-sm mb-1 ${role === 'doctor' ? 'text-blue-900' : 'text-gray-900'}`}>Bác sĩ</span>
                <span className="text-xs text-gray-500 font-medium">Tư vấn & Khám</span>
              </button>

              <button 
                type="button"
                onClick={() => setRole('expert')}
                className={`flex flex-col items-start p-4 border-2 rounded-2xl transition-all text-left group ${
                  role === 'expert' ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  role === 'expert' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'
                }`}>
                  <ShieldCheck size={20} />
                </div>
                <span className={`font-bold text-sm mb-1 ${role === 'expert' ? 'text-indigo-900' : 'text-gray-900'}`}>Chuyên gia AI</span>
                <span className="text-xs text-gray-500 font-medium">Đánh giá & Retrain</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  defaultValue={role === 'doctor' ? 'dr.tuananh@hospital.vn' : 'expert.admin@hospital.vn'}
                  className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-sm outline-none text-gray-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required
                  defaultValue="password123"
                  className="w-full h-12 pl-11 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all text-sm outline-none text-gray-900 font-medium"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors"></div>
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5L4.5 8L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              Đăng nhập <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute w-full border-t border-gray-200"></div>
            <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Hoặc đăng nhập bằng</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 h-11 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span className="text-sm font-bold text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-11 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Building2 size={18} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-700">SSO Bệnh viện</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm font-medium text-gray-600">
            Chưa có tài khoản? <a href="#" className="font-bold text-blue-600 hover:underline">Đăng ký tại đây</a>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;
