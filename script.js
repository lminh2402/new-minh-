// API Key — Trợ lý Khách (login.html)
const GROQ_API_KEY_LOGIN = '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';
// API Key — Trợ lý Bệnh nhân (patient-dashboard.html)
const GROQ_API_KEY_PATIENT = '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';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const CHAT_BACKEND_URL = 'http://localhost:5000/api/chat';

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initMedTriageChat() {
  const chatPopover = document.getElementById('ai-chat-popover');
  if (!chatPopover) return;

  const chatBody = chatPopover.querySelector('.chat-body');
  const chatInput =
    chatPopover.querySelector('#public-chat-input') ||
    chatPopover.querySelector('#patient-chat-input') ||
    chatPopover.querySelector('input[type="text"]');
  const sendBtn = chatPopover.querySelector('.send-btn');
  const floatingChatBtn = document.getElementById('floating-chat-btn');

  if (!chatBody || !chatInput || !sendBtn) {
    console.error('[MedTriage Chat] Thiếu phần tử chat:', { chatBody: !!chatBody, chatInput: !!chatInput, sendBtn: !!sendBtn });
    return;
  }

  // Ensure floating chat icons are rendered even when page scripts run
  // before the floating widget markup is fully processed.
  const floatingChatWidget = document.getElementById('floating-chat-widget');
  if (typeof lucide !== 'undefined') {
    if (floatingChatWidget) lucide.createIcons({ root: floatingChatWidget });
    lucide.createIcons({ root: chatPopover });
  }

  const chatMode = chatPopover.dataset.aiChat === 'patient' ? 'patient' : 'guest';
  const groqApiKey = chatMode === 'patient' ? GROQ_API_KEY_PATIENT : GROQ_API_KEY_LOGIN;

  let isFirstTime = chatBody.children.length === 0;
  let isSending = false;

  let messageHistory = [
    {
      role: 'system',
      content: `Vai trò: Bạn là trợ lý y tế thông minh MedTriage.

Nhiệm vụ:
1. Đặt câu hỏi khai thác thêm triệu chứng (Tuyệt đối KHÔNG đưa ra chẩn đoán ngay ở lượt đầu tiên. Hãy hỏi qua lại ít nhất 2-3 câu để hiểu rõ bệnh tình).
2. Sau khi đã hỏi đủ thông tin (2-3 lượt), mới được phép đưa ra chuẩn đoán sơ bộ và lời khuyên chăm sóc.

Quan trọng: CHỈ KHI đưa ra kết luận cuối cùng và khuyên bệnh nhân đi khám (sau 2-3 lượt), bạn MỚI ĐƯỢC kết thúc câu trả lời bằng lệnh [SHOW_BOOKING_WIDGET] kèm theo thông tin chuyên khoa phù hợp. Không bao giờ dùng lệnh này khi đang hỏi thêm thông tin.

Logic kích hoạt đặt lịch:
Nếu triệu chứng nhẹ (Cảm cúm, đau đầu nhẹ...): Khuyên tự theo dõi + [SHOW_BOOKING_WIDGET] (Chuyên khoa Nội tổng quát).
Nếu triệu chứng nặng/đặc thù (Đau ngực, khó thở, đau dạ dày cấp...): Yêu cầu đi khám gấp + [SHOW_BOOKING_WIDGET] (Chuyên khoa tương ứng).

Định dạng trả về:
Luôn trả về văn bản tư vấn trước, sau đó là lệnh trigger ở cuối cùng.`,
    },
  ];

  const existingWelcome = chatBody.querySelector('.msg.ai .msg-content');
  if (existingWelcome) {
    messageHistory.push({
      role: 'assistant',
      content: existingWelcome.textContent.trim(),
    });
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    msgDiv.innerHTML = `
      <div class="msg-content">${escapeHtml(text).replace(/\n/g, '<br>')}</div>
      <span class="time">${getCurrentTime()}</span>
    `;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function appendBookingWidget(specialty) {
    const bookFn = typeof openWizardModal === 'function' ? 'openWizardModal()' : 'openLoginModal()';
    const bookLabel = typeof openWizardModal === 'function' ? 'Đặt lịch ngay' : 'Đăng nhập để đặt lịch';
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg ai alert';
    msgDiv.style.borderLeftColor = 'var(--primary)';
    msgDiv.innerHTML = `
      <div class="msg-content emergency-widget" style="background-color: var(--primary-light);">
        <div class="e-header" style="color: var(--primary);">
          <i data-lucide="stethoscope"></i>
          <strong>Đề xuất chuyên khoa</strong>
        </div>
        <p style="color: var(--text-dark);">Dựa trên đánh giá sơ bộ, hệ thống khuyên bạn nên khám <strong>${escapeHtml(specialty)}</strong> để được chẩn đoán chính xác nhất.</p>
        <div class="e-actions">
          <button class="btn-primary" style="width: 100%;" onclick="${bookFn}"><i data-lucide="calendar-plus"></i> ${bookLabel}</button>
        </div>
      </div>
      <span class="time">${getCurrentTime()}</span>
    `;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  async function callGroq(messages) {
    const payload = {
      model: 'llama-3.1-8b-instant',
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    };

    try {
      const backendRes = await fetch(CHAT_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: chatMode, messages }),
      });
      if (backendRes.ok) {
        return await backendRes.json();
      }
    } catch (_) {
      // Backend không chạy — fallback gọi Groq trực tiếp
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || `HTTP ${response.status}`);
    }
    return data;
  }

  async function fetchAIResponse(userText) {
    messageHistory.push({ role: 'user', content: userText });

    try {
      const data = await callGroq(messageHistory);
      const aiReplyRaw = data.choices[0].message.content;

      let aiReplyClean = aiReplyRaw;
      let showBooking = false;
      let specialty = 'Nội tổng quát';

      const triggerRegex = /\[?SHOW_BOOKING_WIDGET\]?\s*(?:\((.*?)\))?/i;
      const match = aiReplyRaw.match(triggerRegex);

      if (match) {
        showBooking = true;
        if (match[1]) specialty = match[1].trim();
        aiReplyClean = aiReplyRaw.replace(triggerRegex, '').trim();
      }

      messageHistory.push({ role: 'assistant', content: aiReplyRaw });
      appendMessage(aiReplyClean, 'ai');

      if (showBooking) appendBookingWidget(specialty);
    } catch (error) {
      console.error('[MedTriage Chat] Lỗi Groq:', error);
      messageHistory.pop();
      appendMessage(
        `Xin lỗi, AI tạm thời không phản hồi (${error.message}). Hãy mở trang qua http://localhost (không dùng file://) và thử lại.`,
        'ai'
      );
    }
  }

  async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text || isSending) return;

    isSending = true;
    sendBtn.disabled = true;
    chatInput.value = '';
    appendMessage(text, 'user');

    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'msg ai';
    typingDiv.id = typingId;
    typingDiv.innerHTML = `
      <div class="msg-content">
        <i data-lucide="loader-2" style="animation: spin 1s linear infinite;"></i> Đang suy nghĩ...
      </div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    await fetchAIResponse(text);

    document.getElementById(typingId)?.remove();
    isSending = false;
    sendBtn.disabled = false;
    chatInput.focus();
  }

  sendBtn.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  });
  chatInput.addEventListener('click', (event) => event.stopPropagation());
  chatInput.addEventListener('mousedown', (event) => event.stopPropagation());

  window.sendMedTriageChatMessage = handleSendMessage;

  if (floatingChatBtn) {
    floatingChatBtn.addEventListener('click', () => {
      setTimeout(() => {
        if (!chatPopover.classList.contains('active') || !isFirstTime) return;
        isFirstTime = false;
        setTimeout(() => {
          const greetingText =
            'Chào bạn! Tôi có thể giúp phân tích triệu chứng và gợi ý bác sĩ/chuyên khoa phù hợp nhất tại phòng khám của chúng tôi. Bạn đang cảm thấy thế nào?';
          appendMessage(greetingText, 'ai');
          messageHistory.push({ role: 'assistant', content: greetingText });
        }, 400);
      }, 50);
    });
  }

  console.log(`[MedTriage Chat] Đã sẵn sàng — chế độ: ${chatMode}`);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMedTriageChat);
} else {
  initMedTriageChat();
}
