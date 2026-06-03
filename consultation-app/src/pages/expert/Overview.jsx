import React from 'react';
import { Download, MessageCircle, CheckCircle2, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();

  const kpis = [
    { icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-100', value: '1,247', label: 'Tổng phiên chat', change: '+12.5%', isUp: true },
    { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-100', value: '98.5%', label: 'Độ chính xác AI', change: '+0.3%', isUp: true },
    { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-100', value: '12', label: 'Feedback chờ xử lý', change: '+4', isUp: false },
    { icon: Clock, color: 'text-purple-600', bg: 'bg-purple-100', value: '28s', label: 'Thời gian phản hồi TB', change: '-3s', isUp: true },
  ];

  const accuracyData = [
    { label: 'T2', acc: 92, err: 8 },
    { label: 'T3', acc: 94, err: 6 },
    { label: 'T4', acc: 93, err: 7 },
    { label: 'T5', acc: 96, err: 4 },
    { label: 'T6', acc: 95, err: 5 },
    { label: 'T7', acc: 97, err: 3 },
    { label: 'CN', acc: 98.5, err: 1.5, highlight: true },
  ];

  const feedbacks = [
    { id: '#TRG-4821', issue: 'Bỏ sót cờ đỏ viêm ruột thừa', source: 'Bác sĩ', sourceColor: 'bg-blue-100 text-blue-700', severity: 'Cao', severityColor: 'bg-red-100 text-red-700', status: 'Đang xử lý', statusColor: 'bg-blue-100 text-blue-700', time: '14 phút trước' },
    { id: '#TRG-4819', issue: 'Phân loại sai mức độ khẩn cấp', source: 'Bệnh nhân', sourceColor: 'bg-purple-100 text-purple-700', severity: 'Trung bình', severityColor: 'bg-orange-100 text-orange-700', status: 'Chờ xử lý', statusColor: 'bg-orange-100 text-orange-700', time: '1 giờ trước' },
    { id: '#TRG-4815', issue: 'Thiếu cảnh báo tương tác thuốc', source: 'Chuyên gia', sourceColor: 'bg-indigo-100 text-indigo-700', severity: 'Trung bình', severityColor: 'bg-orange-100 text-orange-700', status: 'Chờ xử lý', statusColor: 'bg-orange-100 text-orange-700', time: '3 giờ trước' },
    { id: '#TRG-4810', issue: 'AI phản hồi chậm > 60s', source: 'Bệnh nhân', sourceColor: 'bg-purple-100 text-purple-700', severity: 'Thấp', severityColor: 'bg-green-100 text-green-700', status: 'Đã xử lý', statusColor: 'bg-green-100 text-green-700', time: 'Hôm qua' },
    { id: '#TRG-4808', issue: 'Tư vấn đúng nhưng thiếu chi tiết', source: 'Bác sĩ', sourceColor: 'bg-blue-100 text-blue-700', severity: 'Thấp', severityColor: 'bg-green-100 text-green-700', status: 'Đã xử lý', statusColor: 'bg-green-100 text-green-700', time: 'Hôm qua' },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-y-auto font-sans text-gray-800 scrollbar-hide">
      
      {/* Page Title */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Tổng quan hệ thống</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Xin chào, Chuyên gia AI — hôm nay là 14/05/2026</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="h-10 px-4 border border-gray-200 rounded-xl text-sm text-gray-700 font-bold bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer">
            <option value="today">Hôm nay</option>
            <option value="week" selected>7 ngày qua</option>
            <option value="month">30 ngày qua</option>
          </select>
          <button className="h-10 px-4 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm active:scale-95">
            <Download size={16} /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xl font-black text-gray-900">{kpi.value}</span>
                <span className={`text-xs font-bold ${kpi.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                  {kpi.change}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-bold">{kpi.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Chart: AI Accuracy */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-gray-900">Xu hướng độ chính xác AI</h3>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Chính xác</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Sai lệch</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 h-[200px] mt-4">
            {accuracyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
                <div className={`w-full max-w-[40px] flex flex-col justify-end rounded-t-lg overflow-hidden h-full bg-gray-50 transition-all ${d.highlight ? 'ring-2 ring-blue-200 ring-offset-2' : ''}`}>
                  <div className="w-full bg-red-400 transition-all duration-500 hover:brightness-110 relative flex items-center justify-center group-hover:opacity-90" style={{ height: `${d.err}%` }}>
                    <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 absolute -top-5 text-red-500">{d.err}%</span>
                  </div>
                  <div className="w-full bg-blue-500 transition-all duration-500 hover:brightness-110 relative flex items-center justify-center" style={{ height: `${d.acc}%` }}>
                    <span className="text-[10px] font-bold text-white opacity-0 group-hover:opacity-100">{d.acc}%</span>
                  </div>
                </div>
                <span className={`text-xs font-bold ${d.highlight ? 'text-blue-600' : 'text-gray-500'}`}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart: Triage Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="text-base font-bold text-gray-900 mb-6">Phân loại Triage</h3>
          
          <div className="relative w-[180px] h-[180px] mx-auto mb-6">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#f1f5f9" strokeWidth="18"/>
              {/* Emergency (Red) - 15% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#ef4444" strokeWidth="18" strokeDasharray="56 321" strokeDashoffset="0" className="transition-all duration-1000 ease-out cursor-pointer hover:stroke-[22px]"/>
              {/* Urgent (Orange) - 25% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray="94 283" strokeDashoffset="-56" className="transition-all duration-1000 ease-out cursor-pointer hover:stroke-[22px]"/>
              {/* Normal (Green) - 60% */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray="226 151" strokeDashoffset="-150" className="transition-all duration-1000 ease-out cursor-pointer hover:stroke-[22px]"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-gray-900 leading-none">1,247</span>
              <span className="text-[11px] font-bold text-gray-500 mt-1">phiên</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-bold text-gray-700"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Thường (60%)</div>
              <span className="font-bold text-gray-900">748</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-bold text-gray-700"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Khẩn (25%)</div>
              <span className="font-bold text-gray-900">312</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-bold text-gray-700"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Cấp cứu (15%)</div>
              <span className="font-bold text-gray-900">187</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Feedback Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Feedback gần đây</h3>
          <button onClick={() => navigate('/expert/feedback')} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors">
            Xem tất cả <ArrowRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Case ID</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Vấn đề</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Nguồn</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Mức độ</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Trạng thái</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feedbacks.map((fb, idx) => (
                <tr key={idx} onClick={() => navigate('/expert/feedback')} className="hover:bg-gray-50/50 cursor-pointer transition-colors group">
                  <td className="px-5 py-4 text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{fb.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">{fb.issue}</td>
                  <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold ${fb.sourceColor}`}>{fb.source}</span></td>
                  <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold ${fb.severityColor}`}>{fb.severity}</span></td>
                  <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold ${fb.statusColor}`}>{fb.status}</span></td>
                  <td className="px-5 py-4 text-xs font-semibold text-gray-500">{fb.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Overview;
