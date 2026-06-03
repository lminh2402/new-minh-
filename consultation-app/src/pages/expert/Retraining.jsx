import React, { useState, useEffect } from 'react';
import { Plus, Brain, CheckCircle2, Cpu, Trash2, Loader2, Bold, Italic, List, Wand2, Activity, Wind, ShieldAlert, Stethoscope } from 'lucide-react';

const Retraining = () => {
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    department: 'Tiêu hóa',
    urgency: 'low',
    redFlagsRules: '',
    aiScript: ''
  });

  const fetchScenarios = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/api/scenarios');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setScenarios(data);
      if (data.length > 0 && !currentScenario) {
        handleSelectScenario(data[0]);
      } else if (data.length === 0) {
        handleAddNew();
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Lỗi tải dữ liệu. Vui lòng bật Backend Server tại cổng 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, []);

  const handleSelectScenario = (scn) => {
    setCurrentScenario(scn);
    setFormData({
      title: scn.title || '',
      department: scn.department || 'Tiêu hóa',
      urgency: scn.urgency || 'low',
      redFlagsRules: scn.redFlagsRules || '',
      aiScript: scn.aiScript || ''
    });
  };

  const handleAddNew = () => {
    setCurrentScenario(null);
    setFormData({
      title: '',
      department: 'Tiêu hóa',
      urgency: 'low',
      redFlagsRules: '',
      aiScript: ''
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tên kịch bản!');
      return;
    }
    setIsSaving(true);
    const method = currentScenario ? 'PATCH' : 'POST';
    const url = currentScenario 
      ? `http://127.0.0.1:5000/api/scenarios/${currentScenario._id}` 
      : 'http://127.0.0.1:5000/api/scenarios';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          description: formData.title,
          lastUpdatedBy: 'Chuyên gia'
        })
      });

      if (response.ok) {
        const savedItem = await response.json();
        setCurrentScenario(savedItem);
        await fetchScenarios();
      } else {
        const errData = await response.json().catch(() => ({}));
        alert('Lỗi API: ' + (errData.message || 'Không lưu được kịch bản.'));
      }
    } catch (err) {
      alert('Lỗi kết nối tới Server MongoDB!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentScenario) return;
    if (!window.confirm('Bạn có chắc chắn muốn xóa kịch bản này không?')) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/scenarios/${currentScenario._id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCurrentScenario(null);
        await fetchScenarios();
        if (scenarios.length > 0) {
          handleSelectScenario(scenarios[0]);
        }
      } else {
        alert('Lỗi xóa kịch bản');
      }
    } catch (err) {
      alert('Lỗi kết nối tới Server MongoDB!');
    }
  };

  const getUrgencyClass = (urgency) => {
    switch(urgency) {
      case 'emergency': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyText = (urgency) => {
    switch(urgency) {
      case 'emergency': return 'Khẩn cấp';
      case 'high': return 'Mức Cao';
      case 'medium': return 'Mức TB';
      case 'low': return 'Mức Thấp';
      default: return 'Không rõ';
    }
  };

  const getDeptIcon = (dept) => {
    switch(dept) {
      case 'Tim mạch': return <Activity size={14} className="inline mr-1"/>;
      case 'Hô hấp': return <Wind size={14} className="inline mr-1"/>;
      case 'Truyền nhiễm': return <ShieldAlert size={14} className="inline mr-1"/>;
      default: return <Stethoscope size={14} className="inline mr-1"/>;
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* LEFT: SCENARIO LIBRARY (35%) */}
      <section className="w-[35%] min-w-[320px] bg-white border-r border-gray-200 flex flex-col z-0">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-gray-900">Thư viện Kịch bản ({scenarios.length})</h2>
          <button onClick={handleAddNew} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors">
            <Plus size={16} /> Thêm mới
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <select className="w-full h-9 px-3 border border-gray-200 rounded-md text-xs font-bold text-gray-700 bg-white outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tất cả chuyên khoa</option>
            <option>Tiêu hóa</option>
            <option>Tim mạch</option>
            <option>Hô hấp</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 scrollbar-hide">
          {isLoading ? (
            <div className="p-8 flex flex-col items-center justify-center text-gray-400 gap-2">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-sm">Đang tải kịch bản từ MongoDB...</span>
            </div>
          ) : error ? (
            <div className="p-5 text-center text-sm font-bold text-red-500 bg-red-50 rounded-xl border border-red-100">
              {error}
            </div>
          ) : scenarios.map((scn) => {
            const isActive = currentScenario && currentScenario._id === scn._id;
            return (
              <div 
                key={scn._id}
                onClick={() => handleSelectScenario(scn)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isActive ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-gray-900 pr-2 leading-tight">{scn.title}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${getUrgencyClass(scn.urgency)}`}>
                    {getUrgencyText(scn.urgency)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{scn.description || scn.redFlagsRules || 'Chưa có mô tả'}</p>
                <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400 pt-2 border-t border-gray-100/50">
                  <span className="flex items-center text-gray-600">{getDeptIcon(scn.department)} {scn.department}</span>
                  <span>Update: {new Date(scn.updatedAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RIGHT: AI RETRAINING WORKSPACE (65%) */}
      <section className="flex-1 bg-gray-50 flex flex-col relative overflow-hidden">
        <div className="h-20 px-8 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Chỉnh sửa kịch bản huấn luyện</h2>
            <p className="text-sm text-blue-600 font-medium flex items-center gap-2 mt-0.5">
              <Brain size={16} /> 
              {currentScenario ? `ID: #${currentScenario.scenarioId} — ${currentScenario.title}` : 'Tạo Kịch bản mới'}
            </p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <CheckCircle2 size={14} /> Đã đồng bộ
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="flex-2 flex flex-col gap-2 w-2/3">
              <label className="text-sm font-bold text-gray-700">Tên kịch bản (Triệu chứng chính)</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="VD: Sốt xuất huyết Dengue" 
                className="h-11 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2 w-1/3">
              <label className="text-sm font-bold text-gray-700">Chuyên khoa</label>
              <select 
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
                className="h-11 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium cursor-pointer"
              >
                <option value="Tiêu hóa">Tiêu hóa</option>
                <option value="Tim mạch">Tim mạch</option>
                <option value="Thần kinh">Thần kinh</option>
                <option value="Hô hấp">Hô hấp</option>
                <option value="Truyền nhiễm">Truyền nhiễm</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-700">Phân loại mức độ ưu tiên (Triage Urgency)</label>
            <div className="flex gap-3">
              {[
                { val: 'emergency', label: 'Khẩn cấp (Emergency)', color: 'red' },
                { val: 'high', label: 'Mức Cao (High)', color: 'orange' },
                { val: 'medium', label: 'Mức TB (Medium)', color: 'yellow' },
                { val: 'low', label: 'Mức Thấp (Low)', color: 'green' }
              ].map(opt => {
                const isActive = formData.urgency === opt.val;
                return (
                  <label 
                    key={opt.val} 
                    className={`flex-1 flex items-center justify-center py-3 border-2 rounded-xl cursor-pointer transition-all text-sm font-bold ${
                      isActive 
                        ? `border-${opt.color}-500 bg-${opt.color}-50 text-${opt.color}-700 ring-2 ring-${opt.color}-100` 
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="urgency" 
                      value={opt.val} 
                      checked={isActive} 
                      onChange={e => setFormData({...formData, urgency: e.target.value})}
                      className="sr-only" 
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Quy tắc nhận diện cờ đỏ (Red Flags & Rules)</label>
            <textarea 
              value={formData.redFlagsRules}
              onChange={e => setFormData({...formData, redFlagsRules: e.target.value})}
              rows="3" 
              placeholder="Nhập quy tắc logic (vd: IF pain > 7 AND fever > 38 THEN...)"
              className="p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono text-gray-700 resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-h-[250px]">
            <label className="text-sm font-bold text-gray-700">Kịch bản AI hỏi bệnh (Hướng dẫn hội thoại)</label>
            <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-1">
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Bold size={16}/></button>
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Italic size={16}/></button>
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><List size={16}/></button>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors">
                  <Wand2 size={14} /> Tạo bằng AI
                </button>
              </div>
              <textarea 
                value={formData.aiScript}
                onChange={e => setFormData({...formData, aiScript: e.target.value})}
                placeholder="Viết kịch bản để AI hỏi bệnh nhân..."
                className="flex-1 p-4 bg-transparent border-none focus:ring-0 outline-none text-sm text-gray-800 resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-gray-200 flex items-center justify-between shrink-0">
          {currentScenario ? (
            <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 font-bold text-sm rounded-xl transition-colors">
              <Trash2 size={18} /> Xóa kịch bản
            </button>
          ) : <div></div>}
          
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-xl transition-colors">
              Lưu nháp
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-2.5 text-white font-bold text-sm rounded-xl shadow-lg transition-all ${
                isSaving ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 active:scale-95'
              }`}
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Cpu size={18} />}
              {isSaving ? 'ĐANG HUẤN LUYỆN...' : 'LƯU & RETRAIN MODEL'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Retraining;
