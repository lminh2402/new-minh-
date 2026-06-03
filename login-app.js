document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // Clear session on login page (user logged out)
  sessionStorage.removeItem('userRole');

  const roleCards = document.querySelectorAll('.role-card');
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');
  const togglePw = document.getElementById('toggle-pw');
  const pwInput = document.getElementById('password');
  let selectedRole = null;

  // Role selection - Click to login immediately
  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      // Highlight selected
      roleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      const selectedRole = card.getAttribute('data-role');
      sessionStorage.setItem('userRole', selectedRole);

      // Visual feedback
      const originalHtml = card.innerHTML;
      card.innerHTML = '<div style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 10px; padding: 12px 0;"><i data-lucide="loader-2" class="spin"></i> <span style="font-weight: 600;">Đang vào hệ thống...</span></div>';
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
});
