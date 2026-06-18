import React, { useState } from 'react';
import { 
  HeartPulse, Search, Bell, LogOut, LayoutDashboard, Brain, MessageSquareWarning, 
  BarChart3, Settings, AlertTriangle, ShieldCheck, AlertCircle, MessageCircle, 
  Flag, FileWarning, Cpu 
} from 'lucide-react';

const FeedbackDashboard = () => {
  const [activeTab, setActiveTab] = useState('feedback');
  const [activeCase, setActiveCase] = useState('TRG-4821');
  const [aiAssessment, setAiAssessment] = useState('incorrect');

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* 1. Header */}
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
            placeholder="Tìm kiếm báo cáo, bác sĩ, case…" 
            className="w-full h-11 pl-11 pr-4 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md">
            CG
          </div>
          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. Sidebar (15%) */}
        <aside className="w-[15%] min-w-[220px] bg-white border-r border-gray-200 flex flex-col justify-between p-4">
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
              { id: 'retraining', icon: Brain, label: 'AI Retraining' },
              { id: 'feedback', icon: MessageSquareWarning, label: 'Feedback' },
              { id: 'stats', icon: BarChart3, label: 'Thống kê' },
              { id: 'settings', icon: Settings, label: 'Cài đặt' },
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
        </aside>

        {/* 3. Main Content (85%) */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* Khu vực A: Danh sách (30%) */}
          <section className="w-[30%] min-w-[320px] bg-white border-r border-gray-200 flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Pending Feedbacks</h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">12</span>
            </div>
            
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col gap-3">
              <div className="flex gap-2">
                <input type="date" className="flex-1 h-9 px-3 border border-gray-200 rounded-md text-xs text-gray-600" defaultValue="2026-05-01" />
                <input type="date" className="flex-1 h-9 px-3 border border-gray-200 rounded-md text-xs text-gray-600" defaultValue="2026-05-13" />
              </div>
              <select className="h-9 px-3 border border-gray-200 rounded-md text-xs text-gray-600 bg-white">
                <option>Nguồn: Bác sĩ</option>
                <option>Nguồn: Bệnh nhân</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {/* Card 1 */}
              <div 
                className={`flex gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeCase === 'TRG-4821' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                }`}
                onClick={() => setActiveCase('TRG-4821')}
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-900">#TRG-4821</span>
                    <span className="text-[11px] text-gray-400">14 min ago</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium truncate mb-0.5">Missing Red Flag — Appendicitis</p>
                  <p className="text-xs text-gray-400">Dr. Nguyen Minh</p>
                </div>
                <AlertTriangle size={18} className="text-red-500 shrink-0" />
              </div>

              {/* Card 2 & 3 (Inactive) */}
              <div className="flex gap-3 p-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 cursor-pointer transition">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center shrink-0"><AlertCircle size={18} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-900">#TRG-4819</span><span className="text-[11px] text-gray-400">1 hr ago</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium truncate mb-0.5">Incorrect Urgency Classification</p>
                  <p className="text-xs text-gray-400">Patient Report</p>
                </div>
                <AlertCircle size={18} className="text-amber-500 shrink-0" />
              </div>
            </div>
          </section>

          {/* Khu vực B: Không gian Chi tiết (70%) */}
          <section className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
            
            {/* Header của Khu vực B */}
            <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">Case #TRG-4821</h2>
                <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-bold">Under Review</span>
              </div>
              <span className="text-sm text-gray-400">May 13, 2026 · 09:46 AM</span>
            </div>

            {/* Split Screen 50/50 */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Cột B1: Xem xét lỗi */}
              <div className="w-1/2 p-6 flex flex-col overflow-y-auto">
                <div className="flex items-center gap-2 mb-5">
                  <MessageCircle size={20} className="text-blue-600" />
                  <h3 className="text-base font-bold text-gray-900">Lịch sử Hội thoại</h3>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  {/* Chat Bubbles */}
                  <div className="max-w-[85%] self-start bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-3.5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-gray-700">Patient</span><span className="text-[10px] text-gray-400">09:31 AM</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">I have severe pain in my lower-right abdomen since last night. It's getting worse when I move.</p>
                  </div>

                  <div className="max-w-[85%] self-end bg-blue-50 border border-blue-100 rounded-2xl rounded-br-sm p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-blue-600">AI Triage Bot</span><span className="text-[10px] text-gray-400">09:31 AM</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">I understand you're experiencing abdominal pain. Can you rate the pain from 1-10? Any fever or nausea?</p>
                  </div>

                  <div className="max-w-[85%] self-end bg-red-50 border border-red-200 rounded-2xl rounded-br-sm p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-red-600">AI Triage Bot</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded"><Flag size={10}/> Flagged</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">Based on your symptoms, this appears to be a <strong>moderate gastric issue</strong>. I recommend scheduling a routine appointment within 48 hours.</p>
                  </div>
                </div>

                {/* Khối Cảnh báo */}
                <div className="mt-auto bg-amber-50 border border-amber-300 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-2">
                    <FileWarning size={16} /> Báo cáo của Bác sĩ
                  </div>
                  <p className="text-sm text-gray-700 mb-2"><strong>Reporter:</strong> Dr. Nguyen Minh — Gastroenterology</p>
                  <div className="flex gap-2">
                    <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-800 leading-relaxed">AI bỏ sót cờ đỏ viêm ruột thừa. Đau bụng dưới bên phải + sốt + buồn nôn với mức đau 8/10 là dấu hiệu rõ ràng của viêm ruột thừa cấp. Đáng lẽ phải phân loại là <em>Khẩn cấp (Emergency)</em>.</p>
                  </div>
                </div>
              </div>

              {/* Cột B2: Huấn luyện AI */}
              <div className="w-1/2 p-6 flex flex-col overflow-y-auto bg-white border-l border-gray-200 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2 mb-5">
                  <Cpu size={20} className="text-blue-600" />
                  <h3 className="text-base font-bold text-gray-900">Cập nhật Kiến thức AI</h3>
                </div>

                <div className="flex flex-col gap-6 flex-1">
                  
                  {/* Action 1: Radio Buttons */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Kết quả đánh giá AI</label>
                    <div className="flex gap-3">
                      <label className={`flex-1 flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${aiAssessment === 'correct' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="assessment" value="correct" className="w-4 h-4 text-blue-600" checked={aiAssessment === 'correct'} onChange={() => setAiAssessment('correct')} />
                        <span className="text-sm font-medium text-gray-800">AI Xử lý Đúng</span>
                      </label>
                      <label className={`flex-1 flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${aiAssessment === 'incorrect' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="assessment" value="incorrect" className="w-4 h-4 text-red-600" checked={aiAssessment === 'incorrect'} onChange={() => setAiAssessment('incorrect')} />
                        <span className="text-sm font-medium text-gray-800">AI Báo cáo Sai</span>
                      </label>
                    </div>
                  </div>

                  {/* Action 2: Textarea Lớn */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nhập quy tắc y khoa / Kịch bản mới</label>
                    <textarea 
                      className="w-full h-[150px] p-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                      defaultValue="IF lower-right abdominal pain + fever + nausea + pain ≥ 7/10 → Flag as EMERGENCY (Appendicitis suspected). Recommend immediate ER visit."
                    ></textarea>
                  </div>

                  {/* Action 3: Textarea Nhỏ */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phản hồi lại cho người báo cáo</label>
                    <textarea 
                      className="w-full h-20 p-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                      defaultValue="Cảm ơn bác sĩ Minh đã báo cáo lỗi nghiêm trọng này. Quy tắc về triệu chứng viêm ruột thừa đã được bổ sung và model AI sẽ được retrain với phân loại ưu tiên mới."
                    ></textarea>
                  </div>

                </div>

                {/* Action 4: Submit Button */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-transform active:scale-95">
                    <Cpu size={18} />
                    LƯU & CẬP NHẬT AI
                  </button>
                </div>

              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
