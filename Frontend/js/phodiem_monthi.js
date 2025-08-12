const phodiemData = {
  toan: {
    title: "PHỔ ĐIỂM MÔN TOÁN",
    tong_thi_sinh: 1137417,
    diem_tb: 6.8,
    diem_lon_hon_5: 693,
    diem_be_hon_5: 637028,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
      { score: "0.4", count: 0 },
      { score: "0.6", count: 0 },
      { score: "0.8", count: 0 },
      { score: "1.0", count: 0 },
      { score: "1.2", count: 0 },
      { score: "1.4", count: 0 },
      { score: "1.6", count: 0 },
      { score: "1.8", count: 0 },
      { score: "2.0", count: 0 },
      { score: "2.2", count: 0 },
      { score: "2.4", count: 0 },
      { score: "2.6", count: 0 },
      { score: "2.8", count: 0 },
      { score: "3.0", count: 0 },
    ],
  },
  vatly: {
    title: "PHỔ ĐIỂM MÔN VẬT LÝ",
    tong_thi_sinh: 351733,
    diem_tb: 6.98,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 34860,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
  hoahoc: {
    title: "PHỔ ĐIỂM MÔN HÓA HỌC",
    tong_thi_sinh: 345263,
    diem_tb: 6.07,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 71921,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
  sinhoc: {
    title: "PHỔ ĐIỂM MÔN SINH HỌC",
    tong_thi_sinh: 71649,
    diem_tb: 5.75,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 23226,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
  van: {
    title: "PHỔ ĐIỂM MÔN VĂN",
    tong_thi_sinh: 71649,
    diem_tb: 5.75,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 23226,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
  lichsu: {
    title: "PHỔ ĐIỂM MÔN LỊCH SỬ",
    tong_thi_sinh: 71649,
    diem_tb: 5.75,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 23226,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
  dialy: {
    title: "PHỔ ĐIỂM MÔN ĐỊA LÝ",
    tong_thi_sinh: 71649,
    diem_tb: 5.75,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 23226,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
  gdcd: {
    title: "PHỔ ĐIỂM MÔN GDCD",
    tong_thi_sinh: 71649,
    diem_tb: 5.75,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 23226,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
  ngoaingu: {
    title: "PHỔ ĐIỂM MÔN NGOẠI NGỮ",
    tong_thi_sinh: 71649,
    diem_tb: 5.75,
    diem_lon_hon_5: 5,
    diem_be_hon_5: 23226,
    distribution: [
      { score: "0.0", count: 0 },
      { score: "0.2", count: 0 },
    ],
  },
};

// Lấy các phần tử cần thiết từ DOM
const subjectSelect = document.getElementById("subject-select");
const subjectCardsContainer = document.getElementById(
  "subject-cards-container"
);
const scoreDistributionContainer = document.getElementById(
  "score-distribution-container"
);

// Hàm để tạo HTML cho một card môn học
const createSubjectCardHTML = (data) => {
  return `
    <div class="subject-card" data-subject-id="${data.title}">
      <div class="subject-title">${data.title}</div>
      <div class="score-stats">
        <div class="stat-box">
          <div class="label">Tổng số thí sinh</div>
          <div class="value">${data.tong_thi_sinh.toLocaleString()}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm trung bình</div>
          <div class="value">${data.diem_tb}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm > 5</div>
          <div class="value">${data.diem_lon_hon_5.toLocaleString()}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm < 5</div>
          <div class="value">${data.diem_be_hon_5.toLocaleString()}</div>
        </div>
      </div>
    </div>
  `;
};

// Hàm để tạo HTML cho bảng phổ điểm
const createDistributionTableHTML = (distribution) => {
  if (distribution.length === 0) {
    return `<p>Không có dữ liệu phổ điểm chi tiết cho môn học này.</p>`;
  }

  const tableRows = distribution
    .map(
      (row) => `
    <tr>
      <td>${row.score}</td>
      <td>${row.count}</td>
    </tr>
  `
    )
    .join("");

  return `
    <table class="distribution-table">
      <thead>
        <tr>
          <th>Điểm</th>
          <th>Số lượng</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
};

// Hàm chính để render nội dung
const renderContent = (subjectKey) => {
  subjectCardsContainer.innerHTML = "";
  scoreDistributionContainer.innerHTML = "";

  if (subjectKey === "tatca") {
    // Render tất cả các card
    for (const key in phodiemData) {
      if (Object.hasOwnProperty.call(phodiemData, key)) {
        subjectCardsContainer.innerHTML += createSubjectCardHTML(
          phodiemData[key]
        );
      }
    }
  } else {
    // Render một card và bảng phổ điểm cụ thể
    const data = phodiemData[subjectKey];
    if (data) {
      subjectCardsContainer.innerHTML = createSubjectCardHTML(data);
      scoreDistributionContainer.innerHTML = createDistributionTableHTML(
        data.distribution
      );
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Gắn sự kiện cho dropdown
  if (subjectSelect) {
    subjectSelect.addEventListener("change", function () {
      const selectedKey = this.value;
      renderContent(selectedKey);
    });
  }

  // THÊM ĐOẠN CODE NÀY VÀO ĐỂ CÁC NÚT CÓ THỂ CLICK ĐƯỢC
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetPage = button.getAttribute("data-target");
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });

  renderContent("tatca");
});
