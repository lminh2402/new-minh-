import React from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  HeartPulse, Search, Bell, LogOut, LayoutDashboard, Brain, MessageSquareWarning, 
  BarChart3, Settings, AlertTriangle, Home, Calendar, MessageSquare
} from 'lucide-react';

const MainLayout = ({ userRole, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  const doctorMenu = [
    { id: 'home', path: '/home', icon: Home, label: 'Trang chủ' },
    { id: 'calendar', path: '/calendar', icon: Calendar, label: 'Lịch làm việc' },
    { id: 'consultation', path: '/consultation', icon: LayoutDashboard, label: 'Không gian Tư vấn' },
    { id: 'bug_report', path: '/bug-report', icon: AlertTriangle, label: 'Báo cáo lỗi AI' },
    { id: 'settings', path: '/settings', icon: Settings, label: 'Cài đặt cá nhân' },
  ];

  const expertMenu = [
    { id: 'overview', path: '/expert/overview', icon: LayoutDashboard, label: 'Tổng quan' },
    { id: 'retraining', path: '/expert/retraining', icon: Brain, label: 'AI Retraining' },
    { id: 'feedback', path: '/expert/feedback', icon: MessageSquareWarning, label: 'Feedback' },
    { id: 'stats', path: '/expert/stats', icon: BarChart3, label: 'Thống kê' },
    { id: 'settings', path: '/settings', icon: Settings, label: 'Cài đặt cá nhân' },
  ];

  const currentMenu = userRole === 'expert' ? expertMenu : doctorMenu;
  const isExpert = userRole === 'expert';

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(isExpert ? '/expert/overview' : '/consultation')}>
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-sm">
            <HeartPulse size={24} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            MedTriage<span className="text-blue-600">AI</span>
          </span>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder={isExpert ? "Tìm kiếm báo cáo, bác sĩ, case…" : "Tìm kiếm bệnh nhân, hồ sơ…"}
            className="w-full h-11 pl-11 pr-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer">
            <div className={`flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-sm shadow-md ${isExpert ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'}`}>
              {isExpert ? 'CG' : 'BS'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-gray-900 leading-tight">{isExpert ? 'Chuyên gia AI' : 'BS. Tuấn Anh'}</p>
              <p className="text-[11px] text-gray-500 leading-tight">{isExpert ? 'System Admin' : 'Khoa Nội'}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition ml-2" title="Đăng xuất">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar (15%) */}
        <aside className="w-[15%] min-w-[220px] bg-white border-r border-gray-200 flex flex-col justify-between p-4 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <nav className="flex flex-col gap-1.5">
            {currentMenu.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content (85%) */}
        <main className="flex-1 flex overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
