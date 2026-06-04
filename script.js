// Khai báo API Key của Groq (Lưu ý: Trong môi trường thực tế không nên hardcode key trên frontend)
const GROQ_API_KEY = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Hàm lấy thời gian hiện tại để hiển thị (VD: 10:30 AM)
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 giờ thì thành 12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

// Chờ DOM load xong mới thực thi
document.addEventListener('DOMContentLoaded', () => {
  // Đảm bảo icon Lucide được render cho toàn bộ trang
  if (typeof lucide !== 'undefined') lucide.createIcons();
  
  // 1. Lấy các DOM elements cần thiết từ giao diện
  const chatPopover = document.getElementById('ai-chat-popover');
  if (!chatPopover) return; // Tránh lỗi nếu không có popup này

  const chatBody = chatPopover.querySelector('.chat-body');
  const chatInput = chatPopover.querySelector('input[type="text"]');
  const sendBtn = chatPopover.querySelector('.send-btn');
  const floatingChatBtn = document.getElementById('floating-chat-btn');

  // Biến kiểm soát lần đầu tiên mở chat
  let isFirstTime = true;

  // Lắng nghe sự kiện click vào nút mở khung chat
  if (floatingChatBtn) {
    floatingChatBtn.addEventListener('click', () => {
      setTimeout(() => {
        // Kiểm tra xem khung chat có đang được mở ra không và có phải lần đầu không
        if (chatPopover.classList.contains('active') && isFirstTime) {
          isFirstTime = false; // Đánh dấu là đã chào
          
          // Chờ 0.5s (500ms) rồi tự động in tin nhắn chào
          setTimeout(() => {
            const greetingText = "Chào bạn! Tôi có thể giúp phân tích triệu chứng và gợi ý bác sĩ/chuyên khoa phù hợp nhất tại phòng khám của chúng tôi. Bạn đang cảm thấy thế nào?";
            appendMessage(greetingText, 'ai');
            messageHistory.push({ role: "assistant", content: greetingText });
          }, 500);
        }
      }, 50);
    });
  }

  // Mảng lưu trữ lịch sử tin nhắn để gửi cho AI (giúp AI nhớ ngữ cảnh)
  let messageHistory = [
    {
      role: "system",
      content: `Vai trò: Bạn là trợ lý y tế thông minh MedTriage.

Nhiệm vụ:
1. Đặt câu hỏi khai thác thêm triệu chứng (Tuyệt đối KHÔNG đưa ra chẩn đoán ngay ở lượt đầu tiên. Hãy hỏi qua lại ít nhất 2-3 câu để hiểu rõ bệnh tình).
2. Sau khi đã hỏi đủ thông tin (2-3 lượt), mới được phép đưa ra chuẩn đoán sơ bộ và lời khuyên chăm sóc.

Quan trọng: CHỈ KHI đưa ra kết luận cuối cùng và khuyên bệnh nhân đi khám (sau 2-3 lượt), bạn MỚI ĐƯỢC kết thúc câu trả lời bằng lệnh [SHOW_BOOKING_WIDGET] kèm theo thông tin chuyên khoa phù hợp. Không bao giờ dùng lệnh này khi đang hỏi thêm thông tin.

Logic kích hoạt đặt lịch:
Nếu triệu chứng nhẹ (Cảm cúm, đau đầu nhẹ...): Khuyên tự theo dõi + [SHOW_BOOKING_WIDGET] (Chuyên khoa Nội tổng quát).
Nếu triệu chứng nặng/đặc thù (Đau ngực, khó thở, đau dạ dày cấp...): Yêu cầu đi khám gấp + [SHOW_BOOKING_WIDGET] (Chuyên khoa tương ứng).

Định dạng trả về:
Luôn trả về văn bản tư vấn trước, sau đó là lệnh trigger ở cuối cùng.`
    }
  ];

  // 2. Hàm thêm tin nhắn vào giao diện (cả User và Bot)
  function appendMessage(text, sender) {
    const time = getCurrentTime();
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`; // sender là 'user' hoặc 'ai'
    
    msgDiv.innerHTML = `
      <div class="msg-content">
        ${text}
      </div>
      <span class="time">${time}</span>
    `;

    chatBody.appendChild(msgDiv);
    
    // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Hàm phụ để hiển thị Widget Đặt lịch
  function appendBookingWidget(specialty) {
    const time = getCurrentTime();
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ai alert`;
    msgDiv.style.borderLeftColor = 'var(--primary)';
    
    msgDiv.innerHTML = `
      <div class="msg-content emergency-widget" style="background-color: var(--primary-light);">
        <div class="e-header" style="color: var(--primary);">
          <i data-lucide="stethoscope"></i>
          <strong>Đề xuất chuyên khoa</strong>
        </div>
        <p style="color: var(--text-dark);">Dựa trên đánh giá sơ bộ, hệ thống khuyên bạn nên khám <strong>${specialty}</strong> để được chẩn đoán chính xác nhất.</p>
        <div class="e-actions">
          <button class="btn-primary" style="width: 100%;" onclick="openWizardModal()"><i data-lucide="calendar-plus"></i> Đặt lịch ngay</button>
        </div>
      </div>
      <span class="time">${time}</span>
    `;

    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // 3. Hàm gọi API của Groq để lấy câu trả lời
  async function fetchAIResponse(userText) {
    // Thêm câu hỏi của user vào lịch sử
    messageHistory.push({ role: "user", content: userText });

    try {
      // Gọi fetch API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // Tên model bạn muốn dùng
          messages: messageHistory,
          temperature: 0.7, // Điều chỉnh độ sáng tạo của AI
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiReplyRaw = data.choices[0].message.content;

      // Xử lý logic [SHOW_BOOKING_WIDGET]
      let aiReplyClean = aiReplyRaw;
      let showBooking = false;
      let specialty = "Nội tổng quát"; // Mặc định

      const triggerRegex = /\[?SHOW_BOOKING_WIDGET\]?\s*(?:\((.*?)\))?/i;
      const match = aiReplyRaw.match(triggerRegex);

      if (match) {
        showBooking = true;
        if (match[1]) {
          specialty = match[1].trim();
        }
        // Xóa lệnh trigger khỏi nội dung text hiển thị cho user
        aiReplyClean = aiReplyRaw.replace(triggerRegex, '').trim();
      }

      // Thêm câu trả lời nguyên bản của AI (có tag) vào lịch sử để duy trì ngữ cảnh
      messageHistory.push({ role: "assistant", content: aiReplyRaw });

      // Hiển thị câu trả lời (đã xóa tag) lên giao diện
      appendMessage(aiReplyClean, 'ai');

      // Nếu có trigger, hiển thị thêm widget đặt lịch ngay bên dưới
      if (showBooking) {
        appendBookingWidget(specialty);
      }

    } catch (error) {
      console.error("Lỗi khi gọi API Groq:", error);
      appendMessage("Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.", 'ai');
    }
  }

  // 4. Hàm xử lý logic khi gửi tin nhắn
  async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return; // Không làm gì nếu input rỗng

    // Xóa ô input
    chatInput.value = "";

    // Thêm tin nhắn của User vào giao diện
    appendMessage(text, 'user');

    // Thêm 1 dòng tin nhắn tạm "Đang gõ..." (Tuỳ chọn)
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
    
    // Gọi icon lucide nếu bạn có dùng thư viện Lucide (nếu có lỗi bạn có thể xóa đoạn này)
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Chờ AI phản hồi
    await fetchAIResponse(text);

    // Xóa dòng "Đang gõ..."
    const typingElem = document.getElementById(typingId);
    if (typingElem) {
      typingElem.remove();
    }
  }

  // 5. Gắn sự kiện click vào nút gửi
  sendBtn.addEventListener('click', handleSendMessage);

  // 6. Gắn sự kiện ấn phím Enter trong ô input
  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Ngăn chặn hành động mặc định của Enter (nếu có)
      handleSendMessage();
    }
  });

});
