import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, MessageCircle, Flag, FileWarning, Cpu, Loader2, CheckCircle2 } from 'lucide-react';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeCase, setActiveCase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [aiAssessment, setAiAssessment] = useState('correct');
  const [expertReply, setExpertReply] = useState('');
  const [newRule, setNewRule] = useState('');

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/api/feedbacks');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setFeedbacks(data);
      if (data.length > 0 && !activeCase) {
        handleSelectCase(data[0]);
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối MongoDB Backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSelectCase = (fb) => {
    setActiveCase(fb);
    setAiAssessment(fb.aiResultEvaluation || 'correct');
    setExpertReply(fb.expertReply || '');
    // In actual system, newRule might be posted to scenarios, but here we just keep it local for UX
    setNewRule(fb.aiAssessment === 'Khẩn cấp' ? 'IF ... -> EMERGENCY' : ''); 
  };

  const handleUpdate = async () => {
    if (!activeCase) return;
    setIsSaving(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/feedbacks/${activeCase._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'reviewed',
          aiResultEvaluation: aiAssessment,
          expertReply: expertReply
        })
      });

      if (response.ok) {
        const updated = await response.json();
        setActiveCase(updated);
        await fetchFeedbacks();
      } else {
        alert('Lỗi API cập nhật');
      }
    } catch (err) {
      alert('Lỗi kết nối tới Server!');
    } finally {
      setIsSaving(false);
    }
  };

  const getSeverityIcon = (sev) => {
    if (sev === 'Cao' || sev === 'High') return <AlertTriangle size={18} className="text-red-500 shrink-0" />;
    if (sev === 'Trung bình' || sev === 'Medium') return <AlertCircle size={18} className="text-amber-500 shrink-0" />;
    return <CheckCircle2 size={18} className="text-green-500 shrink-0" />;
  };

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Khu vực A: Danh sách (30%) */}
      <section className="w-[30%] min-w-[320px] bg-white border-r border-gray-200 flex flex-col z-0">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-gray-900">Pending Feedbacks</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">{feedbacks.length}</span>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col gap-3">
          <div className="flex gap-2">
            <input type="date" className="flex-1 h-9 px-3 border border-gray-200 rounded-md text-xs font-medium text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            <input type="date" className="flex-1 h-9 px-3 border border-gray-200 rounded-md text-xs font-medium text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
          <select className="h-9 px-3 border border-gray-200 rounded-md text-xs font-bold text-gray-700 bg-white outline-none focus:border-blue-500">
            <option>Tất cả nguồn</option>
            <option>Nguồn: Bác sĩ</option>
            <option>Nguồn: Bệnh nhân</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 scrollbar-hide">
          {isLoading ? (
             <div className="p-8 flex flex-col items-center justify-center text-gray-400 gap-2">
               <Loader2 className="animate-spin" size={24} />
               <span className="text-sm">Đang tải báo cáo...</span>
             </div>
          ) : error ? (
            <div className="p-5 text-center text-sm font-bold text-red-500 bg-red-50 rounded-xl border border-red-100">
              {error}
            </div>
          ) : feedbacks.map((fb) => (
            <div 
              key={fb._id}
              className={`flex gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                activeCase && activeCase._id === fb._id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
              }`}
              onClick={() => handleSelectCase(fb)}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${fb.reporterType === 'Bác sĩ' || fb.reporterType === 'Doctor' ? 'bg-indigo-100 text-indigo-600' : 'bg-sky-100 text-sky-600'}`}>
                {fb.reporterType === 'Bác sĩ' || fb.reporterType === 'Doctor' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-900">{fb.caseId}</span>
                  <span className="text-[11px] text-gray-400">{new Date(fb.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium truncate mb-0.5">{fb.subject}</p>
                <p className="text-xs text-gray-500 font-medium flex justify-between items-center mt-1">
                  <span>{fb.reporter}</span>
                  <span className={`px-1.5 py-0.5 rounded ${fb.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {fb.status === 'reviewed' ? 'Đã xử lý' : 'Chờ xử lý'}
                  </span>
                </p>
              </div>
              {getSeverityIcon(fb.severity)}
            </div>
          ))}
          {feedbacks.length === 0 && !isLoading && !error && (
            <div className="p-8 text-center text-gray-400 font-medium">Chưa có feedback nào.</div>
          )}
        </div>
      </section>

      {/* Khu vực B: Không gian Chi tiết (70%) */}
      <section className="flex-1 flex flex-col bg-gray-50 overflow-hidden relative">
        {activeCase ? (
          <>
            <div className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">Case {activeCase.caseId}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeCase.status === 'reviewed' ? 'bg-green-100 border-green-300 text-green-700' : 'bg-amber-100 border-amber-300 text-amber-700'}`}>
                  {activeCase.status === 'reviewed' ? 'Đã xử lý' : 'Chờ xử lý'}
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-400">{new Date(activeCase.createdAt).toLocaleString('vi-VN')}</span>
            </div>

            <div className="flex-1 flex overflow-hidden">
              <div className="w-1/2 p-6 flex flex-col overflow-y-auto">
                <div className="flex items-center gap-2 mb-5">
                  <MessageCircle size={20} className="text-blue-600" />
                  <h3 className="text-base font-bold text-gray-900">Lịch sử Hội thoại</h3>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  <div className="max-w-[85%] self-start bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-3.5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-gray-700">Patient</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{activeCase.patientMessage}</p>
                  </div>

                  <div className="max-w-[85%] self-end bg-blue-50 border border-blue-100 rounded-2xl rounded-br-sm p-3.5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-blue-600">AI Triage Bot</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{activeCase.aiMessage}</p>
                  </div>

                  <div className="max-w-[85%] self-end bg-red-50 border border-red-200 rounded-2xl rounded-br-sm p-3.5 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-red-600">AI Assessment</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded"><Flag size={10}/> Flagged</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed font-semibold">{activeCase.aiAssessment}</p>
                  </div>
                </div>

                <div className="mt-auto bg-amber-50 border border-amber-300 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-2">
                    <FileWarning size={16} /> Báo cáo của {activeCase.reporterType}
                  </div>
                  <p className="text-sm text-gray-700 mb-2"><strong>Reporter:</strong> {activeCase.reporter}</p>
                  <div className="flex gap-2">
                    <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-800 leading-relaxed font-medium">{activeCase.reportedIssue}</p>
                  </div>
                </div>
              </div>

              <div className="w-1/2 p-6 flex flex-col overflow-y-auto bg-white border-l border-gray-200 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2 mb-5">
                  <Cpu size={20} className="text-blue-600" />
                  <h3 className="text-base font-bold text-gray-900">Xử lý & Cập nhật AI</h3>
                </div>

                <div className="flex flex-col gap-6 flex-1">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Kết quả đánh giá AI</label>
                    <div className="flex gap-3">
                      <label className={`flex-1 flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${aiAssessment === 'correct' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="assessment" value="correct" className="w-4 h-4 text-blue-600" checked={aiAssessment === 'correct'} onChange={() => setAiAssessment('correct')} />
                        <span className="text-sm font-bold text-gray-800">AI Xử lý Đúng</span>
                      </label>
                      <label className={`flex-1 flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${aiAssessment === 'incorrect' ? 'border-red-500 bg-red-50 ring-2 ring-red-100' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input type="radio" name="assessment" value="incorrect" className="w-4 h-4 text-red-600" checked={aiAssessment === 'incorrect'} onChange={() => setAiAssessment('incorrect')} />
                        <span className="text-sm font-bold text-gray-800">AI Báo cáo Sai</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Đề xuất cập nhật kịch bản (Nếu có)</label>
                    <textarea 
                      value={newRule}
                      onChange={e => setNewRule(e.target.value)}
                      className="w-full h-24 p-3 bg-white border border-gray-200 rounded-xl text-sm font-mono text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                      placeholder="Ghi chú rule để sau này update kịch bản..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phản hồi lại cho người báo cáo</label>
                    <textarea 
                      value={expertReply}
                      onChange={e => setExpertReply(e.target.value)}
                      className="w-full h-24 p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none leading-relaxed"
                      placeholder="Viết phản hồi cảm ơn và giải thích..."
                    ></textarea>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end shrink-0">
                  <button 
                    onClick={handleUpdate}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-xl shadow-lg transition-transform ${isSaving ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 active:scale-95'}`}
                  >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Cpu size={18} />}
                    {isSaving ? 'ĐANG LƯU...' : 'ĐÁNH DẤU HOÀN TẤT'}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
            Chọn một báo cáo ở bên trái để xem chi tiết
          </div>
        )}
      </section>
    </div>
  );
};

export default Feedback;
