import React, { useState } from 'react';
import { 
  Home, Calendar, MessageSquare, AlertTriangle, Settings, 
  Search, Video, PhoneOff, Paperclip, Send, Image as ImageIcon,
  Brain, FileText, History, Clock, CheckCircle2, HeartPulse, Bell, LogOut, LayoutDashboard
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('consultation');
  const [activePatient, setActivePatient] = useState('PT-001');

  const patients = [
    { id: 'PT-001', name: 'Nguyễn Văn A', time: '08:30 AM', priority: 'red', status: 'Đang chat', age: 45, gender: 'Nam' },
    { id: 'PT-002', name: 'Trần Thị B', time: '09:00 AM', priority: 'orange', status: 'Đang chờ', age: 32, gender: 'Nữ' },
    { id: 'PT-003', name: 'Lê Văn C', time: '09:15 AM', priority: 'green', status: 'Đang chờ', age: 28, gender: 'Nam' },
    { id: 'PT-004', name: 'Phạm Thị D', time: '09:45 AM', priority: 'green', status: 'Đang chờ', age: 50, gender: 'Nữ' },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'red': return 'text-red-500';
      case 'orange': return 'text-orange-500';
      case 'green': return 'text-emerald-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityBg = (priority) => {
    switch(priority) {
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'green': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* 1. Header (Giống màn hình Chuyên gia) */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white">
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
            placeholder="Tìm kiếm bệnh nhân, hồ sơ…" 
            className="w-full h-11 pl-11 pr-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          {/* Profile Bác sĩ */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md">
              BS
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-gray-900 leading-tight">BS. Tuấn Anh</p>
              <p className="text-[11px] text-gray-500 leading-tight">Khoa Nội</p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition ml-2">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. Sidebar (15%) - Cấu trúc giống Chuyên gia */}
        <aside className="w-[15%] min-w-[220px] bg-white border-r border-gray-200 flex flex-col justify-between p-4">
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'home', icon: Home, label: 'Trang chủ' },
              { id: 'calendar', icon: Calendar, label: 'Lịch làm việc' },
              { id: 'consultation', icon: LayoutDashboard, label: 'Không gian Tư vấn' },
              { id: 'bug_report', icon: AlertTriangle, label: 'Báo cáo lỗi AI' },
              { id: 'settings', icon: Settings, label: 'Cài đặt cá nhân' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-blue-600' : 'text-gray-400'} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="px-4 text-xs font-semibold text-gray-400">v2.4.1</div>
        </aside>

        {/* 3. Main Content (85%) */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* Cột 1: Danh sách Bệnh nhân (Chiếm 30% của main) */}
          <section className="w-[30%] min-w-[320px] bg-white border-r border-gray-200 flex flex-col z-0">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h2 className="text-base font-bold text-gray-900">Hàng đợi hôm nay</h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">4</span>
            </div>
            
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Lọc bệnh nhân..." 
                  className="w-full h-9 pl-9 pr-4 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 scrollbar-hide">
              {patients.map(patient => (
                <div 
                  key={patient.id}
                  onClick={() => setActivePatient(patient.id)}
                  className={`flex flex-col gap-2 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    activePatient === patient.id 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-0.5">{patient.name}</h3>
                      <p className="text-xs text-gray-500">{patient.age} tuổi • {patient.gender}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                        <Clock size={12} className="text-gray-400" /> {patient.time}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-100/50">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${getPriorityBg(patient.priority)} shadow-sm`}></span>
                      <span className={`text-[11px] font-bold ${getPriorityColor(patient.priority)}`}>
                        {patient.priority === 'red' ? 'Cấp cứu' : patient.priority === 'orange' ? 'Khẩn' : 'Thường'}
                      </span>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      patient.status === 'Đang chat' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cột 2: Khung Chat Bác sĩ - Bệnh nhân (Chiếm phần lớn không gian còn lại: ~45%) */}
          <section className="flex-1 min-w-[400px] bg-[#f8fafc] flex flex-col border-r border-gray-200 relative">
            
            {/* Header */}
            <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base">
                  A
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Nguyễn Văn A</h2>
                  <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Đang trực tuyến
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors">
                  <Video size={16} />
                  Video Call
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors">
                  <PhoneOff size={16} />
                  Kết thúc khám
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              <div className="text-center mb-2">
                <span className="px-3 py-1 bg-gray-200/60 text-gray-600 rounded-full text-[11px] font-semibold">Hôm nay, 08:30 AM</span>
              </div>
              
              <div className="flex flex-col gap-5">
                {/* AI message representing patient intro */}
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Brain size={14} className="text-purple-600" />
                  </div>
                  <div className="bg-white border border-gray-200 p-3.5 rounded-2xl rounded-tl-sm shadow-sm">
                    <p className="text-xs text-gray-500 italic mb-1.5 font-medium">-- Bệnh nhân đã được chuyển tiếp từ AI Triage --</p>
                    <p className="text-sm text-gray-800 leading-relaxed">Chào bác sĩ, tôi bị đau bụng dữ dội vùng hố chậu phải từ rạng sáng nay, có kèm theo buồn nôn nhưng không nôn được.</p>
                    <span className="text-[10px] font-medium text-gray-400 mt-2 block">08:30 AM</span>
                  </div>
                </div>

                {/* Doctor message */}
                <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-sm">
                    BS
                  </div>
                  <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-sm shadow-sm">
                    <p className="text-sm leading-relaxed">Chào anh A, anh có đang bị sốt không? Mức độ đau từ 1 đến 10 anh đánh giá là mấy điểm?</p>
                    <span className="text-[10px] font-medium text-blue-200 mt-2 block text-right">08:32 AM</span>
                  </div>
                </div>

                {/* Patient message */}
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-700 font-bold text-xs">
                    A
                  </div>
                  <div className="bg-white border border-gray-200 p-3.5 rounded-2xl rounded-tl-sm shadow-sm">
                    <p className="text-sm text-gray-800 leading-relaxed">Tôi vừa đo nhiệt độ là 38.5 độ C. Đau khoảng 8/10 thưa bác sĩ, sờ vào rất đau.</p>
                    <span className="text-[10px] font-medium text-gray-400 mt-2 block">08:34 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
              <div className="flex items-end gap-2 p-1.5 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                <div className="flex gap-1 pb-1 px-1">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <Paperclip size={18} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <ImageIcon size={18} />
                  </button>
                </div>
                
                <textarea 
                  placeholder="Nhập tin nhắn tư vấn cho bệnh nhân..." 
                  className="flex-1 max-h-24 min-h-[38px] bg-transparent border-none focus:ring-0 resize-none py-2 text-sm outline-none text-gray-800"
                  rows="1"
                ></textarea>
                
                <button className="p-2 mb-0.5 mr-0.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm transition-transform active:scale-95">
                  <Send size={16} />
                </button>
              </div>

              {/* Quick Notes */}
              <div className="mt-3 relative">
                <textarea 
                  placeholder="Ghi chú nhanh / Chẩn đoán sơ bộ (Chỉ bác sĩ xem được)..." 
                  className="w-full h-16 p-3 bg-[#fefce8] border border-yellow-200 rounded-xl text-xs text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none resize-none placeholder-yellow-700/40 font-medium"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Cột 3: Trợ lý AI & Bệnh án (Chiếm ~25%) */}
          <section className="w-[25%] min-w-[280px] bg-white flex flex-col z-0 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
            <div className="h-16 p-5 border-b border-gray-200 flex items-center gap-2 bg-white shrink-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Brain size={18} className="text-indigo-600" />
              </div>
              <h2 className="text-base font-bold text-gray-900">AI Trợ lý Bệnh án</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 scrollbar-hide bg-[#f8fafc]/50">
              
              {/* Khối 1: Tóm tắt */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText size={16} className="text-blue-500" />
                  AI Tóm tắt tình trạng
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-700">
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></span>
                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Triệu chứng chính:</strong> Đau bụng hố chậu phải dữ dội, buồn nôn, sốt 38.5°C.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></span>
                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Thời gian phát bệnh:</strong> Rạng sáng nay (~5 tiếng trước).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0"></span>
                    <span className="leading-relaxed"><strong className="text-gray-900 font-semibold">Mức độ đau:</strong> 8/10 (Nghiêm trọng).</span>
                  </li>
                </ul>
              </div>

              {/* Khối 2: Gợi ý xử trí */}
              <div className="bg-emerald-50/80 rounded-xl p-4 shadow-sm border border-emerald-100/80">
                <h3 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Gợi ý xử trí tại nhà từ AI
                </h3>
                <ul className="space-y-2.5 text-xs text-emerald-900/90">
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0 shadow-sm"></span>
                    <span className="leading-relaxed font-medium">Nghi ngờ Viêm ruột thừa cấp (Appendicitis). Đã xếp loại CẤP CỨU.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0 shadow-sm"></span>
                    <span className="leading-relaxed">Đã khuyên bệnh nhân nhịn ăn uống, KHÔNG dùng thuốc giảm đau tự ý.</span>
                  </li>
                </ul>
              </div>

              {/* Khối 3: Lịch sử */}
              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all shadow-sm active:scale-95">
                <History size={16} className="text-gray-500" />
                Lịch sử chat gốc với AI
              </button>

            </div>

            {/* Khối cuối: Report Error */}
            <div className="p-4 mt-auto bg-white border-t border-gray-100 shrink-0">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-red-50 border border-red-200 hover:border-red-400 text-red-600 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 group">
                <AlertTriangle size={16} className="group-hover:scale-110 transition-transform" />
                Báo cáo lỗi chẩn đoán AI
              </button>
            </div>

          </section>

        </main>
      </div>
    </div>
  );
};

export default App;
