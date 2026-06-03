// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // ── Card selection ──────────────────────────
  const cards = document.querySelectorAll('.feedback-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // ── Radio toggle visual state ───────────────
  const radioOptions = document.querySelectorAll('.radio-option');
  radioOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      radioOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // ── Save button feedback ────────────────────
  const saveBtn = document.getElementById('btn-save-update');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const original = saveBtn.innerHTML;
      saveBtn.innerHTML = '<i data-lucide="check"></i> Saved!';
      saveBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      lucide.createIcons();
      setTimeout(() => {
        saveBtn.innerHTML = original;
        saveBtn.style.background = '';
        lucide.createIcons();
      }, 2000);
    });
  }

  // ── Sidebar nav active toggle ───────────────
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      if (item.getAttribute('href') === '#') {
        e.preventDefault();
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
});
