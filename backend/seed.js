require('dotenv').config();
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');
const Scenario = require('./models/Scenario');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Đã kết nối MongoDB để seeding...');

    // Xóa dữ liệu cũ (Tùy chọn)
    await Feedback.deleteMany({});
    await Scenario.deleteMany({});
    console.log('Đã dọn dẹp Collection cũ.');

    // 1. Tạo Feedbacks
    const feedbacks = [
      {
        caseId: '#TRG-4821',
        reporter: 'Dr. Nguyen Minh',
        reporterType: 'Doctor',
        subject: 'Bỏ sót cờ đỏ viêm ruột thừa',
        severity: 'high',
        patientMessage: 'Tôi bị đau quặn từng cơn ở bụng dưới bên phải từ tối hôm qua, nay có sốt nhẹ.',
        aiMessage: 'Triệu chứng của bạn có vẻ là rối loạn tiêu hóa nhẹ. Hãy nghỉ ngơi và uống nhiều nước.',
        aiAssessment: 'Mức độ Thấp (Low)',
        reportedIssue: 'Bệnh nhân có dấu hiệu rõ ràng của viêm ruột thừa (đau hố chậu phải + sốt) nhưng AI lại kết luận là rối loạn tiêu hóa nhẹ.',
        status: 'pending',
        aiResultEvaluation: 'unreviewed'
      },
      {
        caseId: '#TRG-4819',
        reporter: 'Patient Report',
        reporterType: 'Patient',
        subject: 'Phân loại sai mức độ khẩn cấp',
        severity: 'medium',
        patientMessage: 'Tôi bị đau ngực râm ran và khó thở kéo dài khoảng 10 phút.',
        aiMessage: 'Đau ngực có thể do nhiều nguyên nhân như trào ngược dạ dày. Hãy đặt lịch khám Nội khoa trong tuần tới.',
        aiAssessment: 'Mức độ TB (Medium)',
        reportedIssue: 'Đau ngực và khó thở ở người lớn tuổi cần được coi là Khẩn cấp (nghi ngờ nhồi máu cơ tim). AI không cảnh báo đi cấp cứu ngay.',
        status: 'reviewed',
        aiResultEvaluation: 'incorrect',
        expertReply: 'Đã xác nhận lỗi. Kịch bản đau ngực đã được nâng mức độ ưu tiên lên Khẩn Cấp.'
      },
      {
        caseId: '#TRG-4802',
        reporter: 'Dr. Tran Van A',
        reporterType: 'Doctor',
        subject: 'Thiếu cảnh báo tương tác thuốc',
        severity: 'high',
        patientMessage: 'Tôi đang uống thuốc chống đông máu Warfarin, giờ bị đau đầu quá có thể uống Aspirin không?',
        aiMessage: 'Bạn có thể dùng Aspirin để giảm đau đầu.',
        aiAssessment: 'Mức độ Thấp (Low)',
        reportedIssue: 'Aspirin kết hợp Warfarin gây nguy cơ xuất huyết nghiêm trọng. AI không cảnh báo chống chỉ định này.',
        status: 'pending',
        aiResultEvaluation: 'unreviewed'
      },
      {
        caseId: '#TRG-4795',
        reporter: 'Patient Report',
        reporterType: 'Patient',
        subject: 'AI lặp lại câu hỏi',
        severity: 'low',
        patientMessage: 'Tôi đã nói là tôi không bị sốt ở câu trước rồi.',
        aiMessage: 'Bạn có đang bị sốt hay nhiệt độ cơ thể cao không?',
        aiAssessment: 'Mức độ Thấp (Low)',
        reportedIssue: 'AI hỏi lại một triệu chứng mà tôi đã phủ nhận trước đó, làm mất thời gian.',
        status: 'pending',
        aiResultEvaluation: 'unreviewed'
      }
    ];

    await Feedback.insertMany(feedbacks);
    console.log('Đã chèn 4 Feedbacks.');

    // 2. Tạo Scenarios
    const scenarios = [
      {
        scenarioId: 'SCN-1048',
        title: 'Viêm ruột thừa cấp',
        department: 'Tiêu hóa',
        urgency: 'emergency',
        description: 'Đau bụng dưới bên phải, sốt, buồn nôn, điểm đau MacBurney dương tính.',
        redFlagsRules: "IF (abdominal_pain_location = 'lower_right') AND (fever = true) AND (nausea = true) -> TRIGGER(Appendicitis_Alert)",
        aiScript: "1. Hỏi vị trí đau chính xác.\n2. Nếu đau hố chậu phải: Hỏi thêm sốt/buồn nôn.\n3. Nếu có >= 2 triệu chứng: Cảnh báo đi cấp cứu.",
        lastUpdatedBy: 'Chuyên gia Minh'
      },
      {
        scenarioId: 'SCN-1052',
        title: 'Nhồi máu cơ tim (Đột quỵ tim)',
        department: 'Tim mạch',
        urgency: 'emergency',
        description: 'Đau thắt ngực lan ra tay trái, vã mồ hôi, khó thở đột ngột.',
        redFlagsRules: "IF (chest_pain = true) AND (pain_radiation = 'left_arm' OR 'jaw') AND (sweating = true) -> TRIGGER(HeartAttack_Alert)",
        aiScript: "1. Ưu tiên hàng đầu: Xác nhận có khó thở và vã mồ hôi không.\n2. Bỏ qua các câu hỏi tiền sử không cần thiết.\n3. Báo gọi 115 ngay lập tức.",
        lastUpdatedBy: 'Chuyên gia Minh'
      },
      {
        scenarioId: 'SCN-1011',
        title: 'Sốt xuất huyết Dengue',
        department: 'Truyền nhiễm',
        urgency: 'high',
        description: 'Sốt cao liên tục >39 độ, đau hốc mắt, nhức mỏi cơ, xuất huyết dưới da.',
        redFlagsRules: "IF (fever_duration > 2) AND (eye_pain = true) AND (bleeding = true) -> TRIGGER(Dengue_Warning)",
        aiScript: "1. Hỏi ngày thứ mấy của sốt.\n2. Hỏi có chảy máu chân răng hay chấm đỏ dưới da không.\n3. Cảnh báo không được uống Aspirin/Ibuprofen hạ sốt.",
        lastUpdatedBy: 'Bác sĩ Lê'
      },
      {
        scenarioId: 'SCN-0994',
        title: 'Trào ngược dạ dày thực quản (GERD)',
        department: 'Tiêu hóa',
        urgency: 'low',
        description: 'Ợ hơi, ợ chua, nóng rát thượng vị sau ăn hoặc khi nằm.',
        redFlagsRules: "IF (heartburn = true) AND (symptoms_after_meal = true) AND (chest_pain_rule_out_heart = true) -> TRIGGER(GERD_Advice)",
        aiScript: "1. Loại trừ nguyên nhân đau tim trước tiên.\n2. Nếu đau rát sau ăn: Khuyên kê cao đầu giường, tránh ăn no trước khi ngủ.\n3. Đề nghị khám ngoại trú.",
        lastUpdatedBy: 'Hệ thống'
      }
    ];

    await Scenario.insertMany(scenarios);
    console.log('Đã chèn 4 Scenarios.');

    console.log('--- Hoàn tất việc tạo dữ liệu mẫu (Seeding) ---');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi seed data:', error);
    process.exit(1);
  }
};

seedData();
