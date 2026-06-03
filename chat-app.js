document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('btn-send');
  const typingIndicator = document.getElementById('typing-indicator');
  const quickReplies = document.querySelectorAll('.quick-reply');
  const topicChips = document.querySelectorAll('.topic-chip');
  const historyItems = document.querySelectorAll('.history-item');

  // Auto-scroll to bottom
  function scrollToBottom() {
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
  }
  scrollToBottom();

  // Auto-resize textarea
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
  });

  // Time helper
  function getTime() {
    return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  // Add user message
  function addUserMessage(text) {
    const group = document.createElement('div');
    group.className = 'message-group user-group';
    group.innerHTML = `
      <div class="msg-content">
        <div class="msg-sender">Bạn <span class="msg-time">${getTime()}</span></div>
        <div class="msg-bubble user-msg"><p>${text}</p></div>
      </div>
      <div class="msg-avatar user-avatar-bubble"><span>NV</span></div>
    `;
    chatMessages.insertBefore(group, typingIndicator);
    scrollToBottom();
  }

  // Add AI message
  function addAIMessage(html) {
    const group = document.createElement('div');
    group.className = 'message-group ai-group';
    group.innerHTML = `
      <div class="msg-avatar ai-avatar"><i data-lucide="bot"></i></div>
      <div class="msg-content">
        <div class="msg-sender">AI Triage Bot <span class="msg-time">${getTime()}</span></div>
        <div class="msg-bubble ai-msg">${html}</div>
      </div>
    `;
    chatMessages.insertBefore(group, typingIndicator);
    lucide.createIcons();
    scrollToBottom();
  }

  // Show typing, then respond
  function simulateAIResponse(userText) {
    typingIndicator.style.display = 'flex';
    scrollToBottom();

    const delay = 1200 + Math.random() * 1000;
    setTimeout(() => {
      typingIndicator.style.display = 'none';

      // Simple keyword-based mock response
      let response;
      if (/sốt|cảm|cúm|nhiệt/i.test(userText)) {
        response = `<p>Bạn đang bị sốt — Bạn có thể cho tôi biết thêm:</p>
          <div class="assessment-questions">
            <div class="q-item"><span class="q-number">1</span><span>Nhiệt độ cơ thể hiện tại?</span></div>
            <div class="q-item"><span class="q-number">2</span><span>Bạn có đau họng, ho hoặc sổ mũi không?</span></div>
            <div class="q-item"><span class="q-number">3</span><span>Triệu chứng bắt đầu từ khi nào?</span></div>
          </div>`;
      } else if (/đau đầu|nhức đầu|migraine/i.test(userText)) {
        response = `<p>Tôi hiểu bạn đang bị đau đầu. Để đánh giá mức độ, xin cho biết:</p>
          <div class="assessment-questions">
            <div class="q-item"><span class="q-number">1</span><span>Mức độ đau từ 1-10?</span></div>
            <div class="q-item"><span class="q-number">2</span><span>Đau ở vị trí nào (trán, thái dương, sau gáy)?</span></div>
            <div class="q-item"><span class="q-number">3</span><span>Bạn có buồn nôn hoặc nhạy cảm với ánh sáng không?</span></div>
          </div>`;
      } else if (/đau ngực|khó thở|tim/i.test(userText)) {
        response = `<p>⚠️ <strong>Đau ngực và khó thở là triệu chứng cần được xử lý khẩn cấp.</strong></p>
          <p>Nếu bạn đang gặp tình trạng này ngay bây giờ, vui lòng gọi <strong>115</strong> hoặc đến phòng cấp cứu ngay lập tức.</p>
          <p>Bạn có thể mô tả thêm cơn đau (nhói, nặng ngực, lan ra cánh tay trái)?</p>`;
      } else {
        response = `<p>Cảm ơn bạn đã chia sẻ. Tôi ghi nhận triệu chứng của bạn.</p>
          <p>Để có thể đánh giá chính xác hơn, bạn có thể mô tả chi tiết thêm: mức độ đau (1-10), thời gian bắt đầu, và các triệu chứng kèm theo không?</p>`;
      }
      addAIMessage(response);
    }, delay);
  }

  // Send message
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addUserMessage(text);
    chatInput.value = '';
    chatInput.style.height = 'auto';
    simulateAIResponse(text);
  }

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Quick replies
  quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-reply');
      addUserMessage(text);
      // Hide quick replies after click
      btn.closest('.quick-reply-chips').style.display = 'none';
      simulateAIResponse(text);
    });
  });

  // Topic chips
  topicChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-topic');
      addUserMessage(text);
      simulateAIResponse(text);
    });
  });

  // History items
  historyItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      historyItems.forEach(h => h.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
