import React, { useState } from 'react';
import { User, Mail, Phone, Building2, Shield, Bell, Moon, Globe, Camera, Save, CheckCircle2, Key, Lock, Eye, EyeOff } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Nguyễn Chuyên Gia',
    email: 'chuyengia@medtriage.vn',
    phone: '0912 345 678',
    department: 'Hệ thống AI',
    role: 'Chuyên gia AI',
    bio: 'Chuyên gia phân tích và huấn luyện hệ thống AI Triage cho bệnh viện.'
  });

  const [notifications, setNotifications] = useState({
    emailFeedback: true,
    emailReport: true,
    pushNewCase: true,
    pushUrgent: true,
    soundAlert: false,
    weeklyDigest: true
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', icon: User, label: 'Hồ sơ cá nhân' },
    { id: 'notifications', icon: Bell, label: 'Thông báo' },
    { id: 'security', icon: Shield, label: 'Bảo mật' },
    { id: 'preferences', icon: Globe, label: 'Tùy chọn' },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 overflow-y-auto font-sans text-gray-800 scrollbar-hide">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Cài đặt cá nhân</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Quản lý hồ sơ, thông báo và tùy chọn hệ thống</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
            saved ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
          }`}
        >
          {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
          {saved ? 'Đã lưu!' : 'Lưu thay đổi'}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Left: Tab Navigation */}
        <div className="w-[220px] shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-col gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Avatar Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-28 relative">
                <div className="absolute -bottom-10 left-8 flex items-end gap-5">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-black text-blue-600 border-4 border-white">
                      CG
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors">
                      <Camera size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-14 p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><User size={14} className="text-gray-400"/> Họ và tên</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={e => setProfile({...profile, fullName: e.target.value})}
                      className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><Mail size={14} className="text-gray-400"/> Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                      className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><Phone size={14} className="text-gray-400"/> Số điện thoại</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={e => setProfile({...profile, phone: e.target.value})}
                      className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><Building2 size={14} className="text-gray-400"/> Phòng ban</label>
                    <input
                      type="text"
                      value={profile.department}
                      onChange={e => setProfile({...profile, department: e.target.value})}
                      className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Giới thiệu bản thân</label>
                    <textarea
                      value={profile.bio}
                      onChange={e => setProfile({...profile, bio: e.target.value})}
                      rows={3}
                      className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm font-medium transition-all resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-base font-bold text-gray-900 mb-6">Tùy chỉnh thông báo</h3>
              <div className="flex flex-col gap-5">
                {[
                  { key: 'emailFeedback', icon: Mail, label: 'Thông báo Feedback mới qua Email', desc: 'Nhận email khi có Feedback từ bác sĩ hoặc bệnh nhân' },
                  { key: 'emailReport', icon: Mail, label: 'Báo cáo tuần qua Email', desc: 'Nhận tóm tắt hiệu suất AI hàng tuần' },
                  { key: 'pushNewCase', icon: Bell, label: 'Thông báo đẩy: Case mới', desc: 'Hiển thị pop-up khi có case triage mới cần xem' },
                  { key: 'pushUrgent', icon: Bell, label: 'Thông báo khẩn cấp', desc: 'Luôn nhận cảnh báo cho các case mức Cấp cứu' },
                  { key: 'soundAlert', icon: Bell, label: 'Âm thanh cảnh báo', desc: 'Phát âm thanh khi có thông báo quan trọng' },
                  { key: 'weeklyDigest', icon: Mail, label: 'Bản tin tuần (Weekly Digest)', desc: 'Tóm tắt hệ thống gửi vào sáng thứ Hai hàng tuần' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2"><Key size={18} className="text-blue-600" /> Đổi mật khẩu</h3>
                <div className="flex flex-col gap-5 max-w-md">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Mật khẩu hiện tại</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu hiện tại"
                        className="w-full h-11 px-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm transition-all"
                    />
                  </div>
                  <button className="self-start px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95">
                    Cập nhật mật khẩu
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2"><Lock size={18} className="text-blue-600" /> Phiên đăng nhập</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { device: 'Chrome — Windows 10', ip: '42.115.182.150', time: 'Đang hoạt động', active: true },
                    { device: 'Safari — iPhone 15', ip: '42.115.182.152', time: '2 giờ trước', active: false },
                    { device: 'Firefox — macOS', ip: '113.161.72.88', time: 'Hôm qua', active: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{s.device}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">IP: {s.ip} — {s.time}</p>
                      </div>
                      {s.active ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Đang dùng</span>
                      ) : (
                        <button className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Đăng xuất</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-base font-bold text-gray-900 mb-6">Tùy chọn hệ thống</h3>
              <div className="flex flex-col gap-6 max-w-lg">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><Globe size={14} className="text-gray-400"/> Ngôn ngữ</label>
                  <select className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium cursor-pointer">
                    <option>Tiếng Việt</option>
                    <option>English</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5"><Moon size={14} className="text-gray-400"/> Giao diện</label>
                  <div className="flex gap-3">
                    {['Sáng (Light)', 'Tối (Dark)', 'Tự động'].map((theme, i) => (
                      <label key={i} className={`flex-1 flex items-center justify-center py-3 border-2 rounded-xl cursor-pointer transition-all text-sm font-bold ${
                        i === 0 ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}>
                        <input type="radio" name="theme" className="sr-only" defaultChecked={i === 0} />
                        {theme}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Múi giờ</label>
                  <select className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium cursor-pointer">
                    <option>Asia/Ho_Chi_Minh (UTC+7)</option>
                    <option>Asia/Tokyo (UTC+9)</option>
                    <option>Europe/London (UTC+0)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Số bản ghi hiển thị mỗi trang</label>
                  <select className="h-11 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium cursor-pointer">
                    <option>10 bản ghi</option>
                    <option>25 bản ghi</option>
                    <option>50 bản ghi</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
