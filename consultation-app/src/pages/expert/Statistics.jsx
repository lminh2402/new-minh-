import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown, Activity, Users, Clock, Brain, Filter, CalendarDays } from 'lucide-react';

const Statistics = () => {
  const [period, setPeriod] = useState('month');

  // Mock data
  const kpis = [
    { icon: Activity, bg: 'bg-blue-100', color: 'text-blue-600', value: '4,821', label: 'Tổng lượt triage', change: '+18.2%', isUp: true },
    { icon: Users, bg: 'bg-emerald-100', color: 'text-emerald-600', value: '3,156', label: 'Bệnh nhân phục vụ', change: '+9.7%', isUp: true },
    { icon: Brain, bg: 'bg-purple-100', color: 'text-purple-600', value: '97.8%', label: 'Độ chính xác TB', change: '+1.2%', isUp: true },
    { icon: Clock, bg: 'bg-orange-100', color: 'text-orange-600', value: '24s', label: 'Thời gian phản hồi', change: '-5s', isUp: true },
  ];

  const monthlyData = [
    { label: 'T1', sessions: 320, accuracy: 91 },
    { label: 'T2', sessions: 410, accuracy: 92 },
    { label: 'T3', sessions: 380, accuracy: 93 },
    { label: 'T4', sessions: 520, accuracy: 94 },
    { label: 'T5', sessions: 600, accuracy: 95 },
    { label: 'T6', sessions: 490, accuracy: 94 },
    { label: 'T7', sessions: 580, accuracy: 96 },
    { label: 'T8', sessions: 650, accuracy: 96 },
    { label: 'T9', sessions: 700, accuracy: 97 },
    { label: 'T10', sessions: 620, accuracy: 97 },
    { label: 'T11', sessions: 750, accuracy: 98 },
    { label: 'T12', sessions: 800, accuracy: 98 },
  ];

  const maxSessions = Math.max(...monthlyData.map(d => d.sessions));

  const deptStats = [
    { dept: 'Tiêu hóa', sessions: 1240, accuracy: 98.1, errors: 24, color: 'bg-blue-500' },
    { dept: 'Tim mạch', sessions: 980, accuracy: 97.5, errors: 25, color: 'bg-red-500' },
    { dept: 'Thần kinh', sessions: 720, accuracy: 96.8, errors: 23, color: 'bg-purple-500' },
    { dept: 'Hô hấp', sessions: 650, accuracy: 97.2, errors: 18, color: 'bg-emerald-500' },
    { dept: 'Truyền nhiễm', sessions: 530, accuracy: 96.0, errors: 21, color: 'bg-orange-500' },
    { dept: 'Cơ Xương Khớp', sessions: 410, accuracy: 98.5, errors: 6, color: 'bg-indigo-500' },
    { dept: 'Da liễu', sessions: 291, accuracy: 99.0, errors: 3, color: 'bg-pink-500' },
  ];
  const maxDeptSessions = Math.max(...deptStats.map(d => d.sessions));

  const topErrors = [
    { type: 'Bỏ sót cờ đỏ (Red Flag)', count: 42, pct: 35, color: 'bg-red-500' },
    { type: 'Phân loại sai mức độ', count: 31, pct: 26, color: 'bg-orange-500' },
    { type: 'Thiếu câu hỏi quan trọng', count: 22, pct: 18, color: 'bg-yellow-500' },
    { type: 'Thời gian phản hồi chậm', count: 15, pct: 13, color: 'bg-blue-500' },
    { type: 'Lỗi khác', count: 10, pct: 8, color: 'bg-gray-400' },
  ];

  const hourlyData = [
    { hour: '06h', load: 12 }, { hour: '07h', load: 25 }, { hour: '08h', load: 65 },
    { hour: '09h', load: 90 }, { hour: '10h', load: 85 }, { hour: '11h', load: 70 },
    { hour: '12h', load: 40 }, { hour: '13h', load: 55 }, { hour: '14h', load: 80 },
    { hour: '15h', load: 75 }, { hour: '16h', load: 60 }, { hour: '17h', load: 45 },
    { hour: '18h', load: 30 }, { hour: '19h', load: 20 }, { hour: '20h', load: 15 },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-y-auto font-sans text-gray-800 scrollbar-hide">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Thống kê & Báo cáo</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Phân tích hiệu suất hệ thống AI Triage theo thời gian</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {[
              { val: 'week', label: '7 ngày' },
              { val: 'month', label: '30 ngày' },
              { val: 'quarter', label: 'Quý' },
              { val: 'year', label: 'Năm' },
            ].map(opt => (
              <button
                key={opt.val}
                onClick={() => setPeriod(opt.val)}
                className={`px-4 py-2 text-xs font-bold transition-all ${
                  period === opt.val ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button className="h-10 px-4 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-2 transition-all shadow-sm active:scale-95">
            <Download size={16} /> Xuất PDF
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xl font-black text-gray-900">{kpi.value}</span>
                <span className={`text-xs font-bold flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                  {kpi.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-bold">{kpi.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Sessions Bar Chart + Hourly Heatmap */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Sessions Over Time */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-gray-900">Lượt Triage theo tháng</h3>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Phiên chat</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Độ chính xác</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-1.5 h-[200px]">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <span className="text-[10px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">{d.sessions}</span>
                <div
                  className="w-full max-w-[32px] bg-blue-500 rounded-t-md transition-all duration-500 hover:bg-blue-600 cursor-pointer"
                  style={{ height: `${(d.sessions / maxSessions) * 180}px` }}
                ></div>
                <span className="text-[11px] font-bold text-gray-500">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Giờ cao điểm</h3>
          <div className="flex flex-col gap-1.5">
            {hourlyData.map((h, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <span className="text-[11px] font-bold text-gray-500 w-7 shrink-0">{h.hour}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden">
                  <div
                    className={`h-full rounded-sm transition-all duration-500 ${
                      h.load > 80 ? 'bg-red-400' : h.load > 50 ? 'bg-orange-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${h.load}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-gray-500 w-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">{h.load}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3 text-[10px] font-bold text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Thấp</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> TB</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Cao</span>
          </div>
        </div>
      </div>

      {/* Row 2: Department Stats + Error Distribution */}
      <div className="grid grid-cols-3 gap-6">
        {/* Department Performance */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Hiệu suất theo Chuyên khoa</h3>
            <button className="text-xs text-gray-500 font-bold flex items-center gap-1 hover:text-blue-600 transition-colors"><Filter size={14}/> Lọc</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Chuyên khoa</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Phiên Triage</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Biểu đồ</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Độ chính xác</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Lỗi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deptStats.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${d.color}`}></span>
                      <span className="text-sm font-bold text-gray-900">{d.dept}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-700">{d.sessions.toLocaleString()}</td>
                  <td className="px-5 py-3.5 w-[200px]">
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${d.color} transition-all duration-700`} style={{ width: `${(d.sessions / maxDeptSessions) * 100}%` }}></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`text-sm font-black ${d.accuracy >= 98 ? 'text-emerald-600' : d.accuracy >= 97 ? 'text-blue-600' : 'text-orange-600'}`}>{d.accuracy}%</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-600">{d.errors}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Error Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-2">Phân bố loại lỗi AI</h3>
          <p className="text-xs text-gray-500 font-medium mb-6">Tổng: 120 lỗi trong 30 ngày qua</p>
          
          <div className="flex flex-col gap-5">
            {topErrors.map((err, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-800">{err.type}</span>
                  <span className="text-xs font-black text-gray-600">{err.count} ({err.pct}%)</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${err.color} transition-all duration-700`} style={{ width: `${err.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Tỷ lệ lỗi chung</span>
              <span className="text-lg font-black text-emerald-600">2.49%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div className="h-full rounded-full bg-emerald-500 w-[97.51%]"></div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium mt-1.5">97.51% phiên chat không có lỗi</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistics;
