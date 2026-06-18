document.addEventListener('DOMContentLoaded', () => {
  // === INIT MOCK LOCALSTORAGE DATA ===
  const defaultServices = [
    {
      name: "Gói Tầm Soát Ung Thư",
      desc: "Xét nghiệm máu, siêu âm toàn diện, tầm soát dấu ấn ung thư",
      price: "2,500,000",
      duration: "120 phút",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Khám Tim Mạch Chuyên Sâu",
      desc: "Điện tim, siêu âm tim, đo huyết áp 24h và khám với BS chuyên khoa",
      price: "1,200,000",
      duration: "60 phút",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Gói Khám Tổng Quát Premium",
      desc: "Xét nghiệm máu, siêu âm, điện tâm đồ, nội soi tiêu hóa không đau",
      price: "3,200,000",
      duration: "180 phút",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Gói Tầm Soát Đột Quỵ",
      desc: "Chụp MRI não, siêu âm động mạch cảnh tầm soát nguy cơ xơ vữa",
      price: "4,500,000",
      duration: "150 phút",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=400&q=80",
      isActive: true
    },
    {
      name: "Gói Chăm Sóc Sức Khỏe Mẹ & Bé",
      desc: "Khám nhi khoa, tư vấn dinh dưỡng cho bé và tiêm chủng định kỳ",
      price: "1,800,000",
      duration: "90 phút",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Gói Khám Xương Khớp Chuyên Sâu",
      desc: "Chụp X-quang cột sống, đo mật độ xương và siêu âm khớp gối",
      price: "1,500,000",
      duration: "75 phút",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Gói Khám Phụ Khoa Toàn Diện",
      desc: "Khám phụ sản, siêu âm đầu dò, tầm soát ung thư cổ tử cung HPV",
      price: "1,600,000",
      duration: "90 phút",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Gói Tầm Soát Đái Tháo Đường",
      desc: "Đường huyết đói, chỉ số HbA1c, chức năng thận và tư vấn dinh dưỡng",
      price: "950,000",
      duration: "60 phút",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Gói Khám Da Liễu Thẩm Mỹ",
      desc: "Soi da, phân tích mụn, sắc tố và tư vấn liệu trình chăm sóc da khoa học",
      price: "850,000",
      duration: "45 phút",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Khám Nội tổng quát",
      desc: "Khám lâm sàng với BS chuyên khoa",
      price: "350,000",
      duration: "30 phút",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "Tư vấn Chuyên gia (Online)",
      desc: "Chat/Video call với BS trong 30 phút",
      price: "200,000",
      duration: "30 phút",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
      isActive: true
    },
    {
      name: "Nội soi dạ dày tiền mê",
      desc: "Nội soi không đau, áp dụng công nghệ NBI",
      price: "1,200,000",
      duration: "45 phút",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=400&auto=format&fit=crop",
      isActive: false
    }
  ];

  const defaultDoctors = [
    {
      name: "BS. Nguyễn Văn A",
      specialty: "Tiêu hóa",
      schedule: "14:00 - 18:00 Hôm nay",
      rating: "4.9",
      reviewsCount: 150,
      status: "Đang trực",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "BS. Trần Thị B",
      specialty: "Tim mạch",
      schedule: "08:00 - 12:00 Hôm nay",
      rating: "4.8",
      reviewsCount: 120,
      status: "Đang trực",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      isActive: true
    },
    {
      name: "BS. Lê Hoàng C",
      specialty: "Nhi khoa",
      schedule: "08:30 - 17:00 Hôm nay",
      rating: "4.9",
      reviewsCount: 95,
      status: "Có lịch hẹn",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "BS. Phạm Minh Đức",
      specialty: "Xương khớp",
      schedule: "09:00 - 16:30 Hôm nay",
      rating: "4.9",
      reviewsCount: 85,
      status: "Đang trực",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
      isActive: true
    },
    {
      name: "BS. Đỗ Thùy Linh",
      specialty: "Phụ sản",
      schedule: "13:30 - 17:30 Hôm nay",
      rating: "4.8",
      reviewsCount: 110,
      status: "Đang trực",
      image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=400&q=80",
      isActive: true
    },
    {
      name: "BS. Hoàng Lâm Tùng",
      specialty: "Da liễu",
      schedule: "08:00 - 11:30 Hôm nay",
      rating: "4.7",
      reviewsCount: 95,
      status: "Đang trực",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
      isActive: true
    }
  ];

  if (!localStorage.getItem('hospitalServices')) {
    localStorage.setItem('hospitalServices', JSON.stringify(defaultServices));
  }
  if (!localStorage.getItem('hospitalDoctors')) {
    localStorage.setItem('hospitalDoctors', JSON.stringify(defaultDoctors));
  }

  // === LOCALSTORAGE MIGRATION FOR BROKEN IMAGES ===
  (function() {
    let services = localStorage.getItem('hospitalServices');
    if (services && services.includes('photo-1594824813573-246434de83fb')) {
      services = services.replaceAll('photo-1594824813573-246434de83fb', 'photo-1576091160550-2173dba999ef');
      localStorage.setItem('hospitalServices', services);
    }
    let doctors = localStorage.getItem('hospitalDoctors');
    if (doctors) {
      let updated = false;
      if (doctors.includes('photo-1594824813573-246434de83fb')) {
        doctors = doctors.replaceAll('photo-1594824813573-246434de83fb', 'photo-1591604021695-0c69b7c05981');
        updated = true;
      }
      if (doctors.includes('photo-1579684214004-f22f620c8501')) {
        doctors = doctors.replaceAll('photo-1579684214004-f22f620c8501', 'photo-1537368910025-700350fe46c7');
        updated = true;
      }
      if (updated) {
        localStorage.setItem('hospitalDoctors', doctors);
      }
    }
  })();

  // === CAROUSEL SLIDER CONTROLLER ===
  window.scrollSlider = function(gridId, direction) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const card = grid.querySelector('.clinic-card');
    const gap = 24;
    const scrollAmount = card ? card.offsetWidth + gap : 324;
    grid.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  window.toggleSliderMode = function(gridId, btn) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const wrapper = grid.parentElement;
    const prevBtn = wrapper.querySelector('.slider-arrow.prev');
    const nextBtn = wrapper.querySelector('.slider-arrow.next');
    
    const isSlider = grid.classList.contains('slider-mode');
    if (isSlider) {
      grid.classList.remove('slider-mode');
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      btn.querySelector('span').innerText = 'Thu gọn';
      btn.querySelector('i').setAttribute('data-lucide', 'chevron-up');
    } else {
      grid.classList.add('slider-mode');
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
      btn.querySelector('span').innerText = 'Xem tất cả';
      btn.querySelector('i').setAttribute('data-lucide', 'chevron-right');
      grid.scrollLeft = 0;
      setTimeout(() => updateSliderArrows(gridId), 100);
    }
    if (window.lucide) window.lucide.createIcons({root: btn});
  };

  window.updateSliderArrows = function(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const wrapper = grid.parentElement;
    const prevBtn = wrapper.querySelector('.slider-arrow.prev');
    const nextBtn = wrapper.querySelector('.slider-arrow.next');
    if (!prevBtn || !nextBtn) return;

    if (!grid.classList.contains('slider-mode')) {
      prevBtn.classList.add('disabled');
      nextBtn.classList.add('disabled');
      return;
    }

    const scrollLeft = grid.scrollLeft;
    const maxScrollLeft = grid.scrollWidth - grid.clientWidth;

    if (scrollLeft <= 5) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }

    if (scrollLeft >= maxScrollLeft - 5) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  };

  function initSliderEvents(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.addEventListener('scroll', () => {
      window.updateSliderArrows(gridId);
    });
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => window.updateSliderArrows(gridId));
      ro.observe(grid);
    }
    setTimeout(() => window.updateSliderArrows(gridId), 100);
    setTimeout(() => window.updateSliderArrows(gridId), 400);
  }

  // Render doctors dynamically
  function renderLandingDoctors() {
    const doctorsGrid = document.getElementById('landing-doctors-grid');
    if (!doctorsGrid) return;
    const doctors = JSON.parse(localStorage.getItem('hospitalDoctors') || '[]');
    doctorsGrid.innerHTML = '';
    doctors.filter(doc => doc.isActive).forEach(doc => {
      doctorsGrid.insertAdjacentHTML('beforeend', `
        <div class="clinic-card premium-card" onclick="openLoginModal()">
          <div class="card-image" style="background-image: url('${doc.image}');">
            <span class="tag open">${doc.status}</span>
          </div>
          <div class="card-content">
            <h3>${doc.name}</h3>
            <p class="specialty">Chuyên khoa ${doc.specialty}</p>
            <div class="info-row"><i data-lucide="clock"></i><span>${doc.schedule}</span></div>
            <div class="info-row"><i data-lucide="star" class="star"></i><span>${doc.rating} (${doc.reviewsCount} đánh giá)</span></div>
            <div class="card-actions" style="margin-top: auto;">
              <button class="btn-primary" style="width: 100%;">Đặt lịch khám ngay</button>
            </div>
          </div>
        </div>
      `);
    });
    setTimeout(() => window.updateSliderArrows('landing-doctors-grid'), 50);
  }

  // Render packages dynamically
  function renderLandingPackages() {
    const packagesGrid = document.getElementById('landing-packages-grid');
    if (!packagesGrid) return;
    const services = JSON.parse(localStorage.getItem('hospitalServices') || '[]');
    packagesGrid.innerHTML = '';
    services.filter(svc => svc.isActive).forEach(svc => {
      const priceVal = parseInt(svc.price.toString().replace(/,/g, ''));
      packagesGrid.insertAdjacentHTML('beforeend', `
        <div class="clinic-card" onclick="openLoginModal()">
          <div class="card-image" style="background-image: url('${svc.image}');">
            <span class="tag" style="background: var(--primary); color: white;">Gói khám</span>
          </div>
          <div class="card-content">
            <h3>${svc.name}</h3>
            <p class="specialty">${svc.desc}</p>
            <div class="info-row"><i data-lucide="tag"></i><span style="font-weight: bold; color: var(--primary);">${priceVal.toLocaleString('vi-VN')}đ</span></div>
            <div class="info-row"><i data-lucide="clock"></i><span>Ước tính ${svc.duration}</span></div>
            <div class="card-actions" style="margin-top: auto;">
              <button class="btn-primary" style="width: 100%;">Đặt lịch ngay</button>
            </div>
          </div>
        </div>
      `);
    });
    setTimeout(() => window.updateSliderArrows('landing-packages-grid'), 50);
  }

  // Initial execution of dynamic rendering
  renderLandingDoctors();
  renderLandingPackages();
  initSliderEvents('landing-doctors-grid');
  initSliderEvents('landing-packages-grid');

  lucide.createIcons();

  // Clear session on login page (user logged out)
  sessionStorage.removeItem('userRole');

  // === LOGIN MODAL OPEN/CLOSE ===
  window.openLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.add('active');
    }
  };

  window.closeLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.remove('active');
    }
  };

  // Close modal when clicking overlay
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        closeLoginModal();
      }
    });
  }

  // === TAB SWITCHER FOR LOGIN FORM ===
  const tabQuick = document.getElementById('tab-quick-login');
  const tabForm = document.getElementById('tab-form-login');
  const quickPanel = document.getElementById('quick-login-panel');
  const formPanel = document.getElementById('form-login-panel');
  const headerDesc = document.getElementById('login-header-desc');

  if (tabQuick && tabForm) {
    tabQuick.addEventListener('click', () => {
      tabQuick.classList.add('active');
      tabForm.classList.remove('active');
      tabQuick.style.background = 'white';
      tabQuick.style.color = 'var(--primary)';
      tabForm.style.background = 'transparent';
      tabForm.style.color = 'var(--gray-500)';
      quickPanel.style.display = 'block';
      formPanel.style.display = 'none';
      if (headerDesc) headerDesc.innerText = 'Bấm vào vai trò của bạn để truy cập nhanh';
    });

    tabForm.addEventListener('click', () => {
      tabForm.classList.add('active');
      tabQuick.classList.remove('active');
      tabForm.style.background = 'white';
      tabForm.style.color = 'var(--primary)';
      tabQuick.style.background = 'transparent';
      tabQuick.style.color = 'var(--gray-500)';
      quickPanel.style.display = 'none';
      formPanel.style.display = 'block';
      if (headerDesc) headerDesc.innerText = 'Nhập email và mật khẩu của bạn để tiếp tục';
    });
  }

  // === QUICK ROLE CARD LOGIN ===
  const roleCards = document.querySelectorAll('.role-card');
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      const selectedRole = card.getAttribute('data-role');
      sessionStorage.setItem('userRole', selectedRole);

      // Visual feedback
      const originalHtml = card.innerHTML;
      card.innerHTML = '<div style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 10px; padding: 12px 0;"><i data-lucide="loader-2" class="spin"></i> <span style="font-weight: 600; font-size: 14px;">Đang vào...</span></div>';
      lucide.createIcons();
      card.style.pointerEvents = 'none';

      // Redirect
      setTimeout(() => {
        switch (selectedRole) {
          case 'patient':
            window.location.href = 'patient-dashboard.html';
            break;
          case 'doctor':
            window.location.href = 'doctor-dashboard.html';
            break;
          case 'clinic':
            window.location.href = 'clinics.html';
            break;
        }
      }, 600);
    });
  });

  // === PASSWORD TOGGLE ===
  const togglePwBtn = document.getElementById('toggle-pw');
  const pwInput = document.getElementById('login-password');
  if (togglePwBtn && pwInput) {
    togglePwBtn.addEventListener('click', () => {
      const isHidden = pwInput.type === 'password';
      pwInput.type = isHidden ? 'text' : 'password';
      togglePwBtn.innerHTML = isHidden
        ? '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>'
        : '<i data-lucide="eye" style="width: 18px; height: 18px;"></i>';
      lucide.createIcons();
    });
  }

  // === FORM SUBMIT VERIFICATION ===
  const credentialsForm = document.getElementById('login-credentials-form');
  const loginSubmitBtn = document.getElementById('login-submit-btn');

  if (credentialsForm) {
    credentialsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailVal = document.getElementById('login-email').value.trim().toLowerCase();
      const pwVal = pwInput.value.trim();

      let matchedUser = null;

      // Mock credentials accounts
      const mockAccounts = [
        { email: 'patient@medtriage.vn', password: '123', role: 'patient', redirect: 'patient-dashboard.html' },
        { email: 'doctor@medtriage.vn', password: '123', role: 'doctor', redirect: 'doctor-dashboard.html' },
        { email: 'clinic@medtriage.vn', password: '123', role: 'clinic', redirect: 'clinics.html' }
      ];

      const foundMock = mockAccounts.find(acc => acc.email === emailVal && acc.password === pwVal);
      if (foundMock) {
        matchedUser = foundMock;
      } else {
        // Registered localStorage accounts
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundReg = registeredUsers.find(acc => (acc.email === emailVal || acc.phone === emailVal) && acc.password === pwVal);
        if (foundReg) {
          matchedUser = {
            role: foundReg.role,
            redirect: foundReg.role === 'patient' ? 'patient-dashboard.html' : foundReg.role === 'doctor' ? 'doctor-dashboard.html' : 'clinics.html'
          };
        }
      }

      if (matchedUser) {
        loginSubmitBtn.classList.add('loading');
        loginSubmitBtn.innerHTML = '<span>Đang xác thực...</span>';
        sessionStorage.setItem('userRole', matchedUser.role);

        setTimeout(() => {
          window.location.href = matchedUser.redirect;
        }, 1000);
      } else {
        alert('Tài khoản hoặc mật khẩu không chính xác!\nTài khoản mẫu:\n- Người bệnh: patient@medtriage.vn / 123\n- Bác sĩ: doctor@medtriage.vn / 123');
      }
    });
  }

  // === PUBLIC AI CHATBOT FUNCTIONALITY ===
  window.toggleFloatingChat = function() {
    const popover = document.getElementById('ai-chat-popover');
    const fabIcon = document.getElementById('fab-icon');
    const widget = document.getElementById('floating-chat-widget');
    const chatInput = document.getElementById('public-chat-input');
    
    if (popover && fabIcon) {
      popover.classList.toggle('active');
      if (popover.classList.contains('active')) {
        fabIcon.setAttribute('data-lucide', 'x');
        widget?.classList.add('chat-open');
        widget?.classList.add('hint-dismissed');
        setTimeout(() => chatInput?.focus(), 150);
      } else {
        fabIcon.setAttribute('data-lucide', 'bot');
        widget?.classList.remove('chat-open');
      }
      lucide.createIcons();
    }
  };

  window.dismissFabHint = function() {
    document.getElementById('floating-chat-widget')?.classList.add('hint-dismissed');
  };

  // === HERO SEARCH SUBMIT ===
  window.handleSearchSubmit = function() {
    const input = document.getElementById('landing-search-input');
    const term = input ? input.value.trim() : '';
    if (term) {
      alert(`Đang tìm kiếm dịch vụ liên quan đến "${term}". Vui lòng đăng nhập để xem thông tin chi tiết và đặt lịch khám.`);
    }
    openLoginModal();
  };
});
