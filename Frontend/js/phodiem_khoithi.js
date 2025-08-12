const khoiThiData = [
  {
    id: "khoia",
    title: "PHỔ ĐIỂM KHỐI A",
    stats: {
      totalStudents: "1137417",
      avgScore: "6.80",
      above5: "693",
      below5: "637028",
    },
    distribution: [
      { score: "0.0", count: "10" },
      { score: "0.2", count: "15" },
      { score: "0.4", count: "20" },
      { score: "30.0", count: "100" },
    ],
  },
  {
    id: "khoia1",
    title: "PHỔ ĐIỂM KHỐI A1",
    stats: {
      totalStudents: "351733",
      avgScore: "6.98",
      above5: "5",
      below5: "34860",
    },
    distribution: [
      { score: "0.0", count: "5" },
      { score: "0.2", count: "8" },
      // ...
    ],
  },
  {
    id: "khoib",
    title: "PHỔ ĐIỂM KHỐI B",
    stats: {
      totalStudents: "345263",
      avgScore: "6.07",
      above5: "5",
      below5: "71921",
    },
    distribution: [],
  },
  {
    id: "khoic",
    title: "PHỔ ĐIỂM KHỐI C",
    stats: {
      totalStudents: "71649",
      avgScore: "5.75",
      above5: "5",
      below5: "23226",
    },
    distribution: [],
  },
  {
    id: "khoid",
    title: "PHỔ ĐIỂM KHỐI D",
    stats: {
      totalStudents: "71649",
      avgScore: "5.75",
      above5: "5",
      below5: "23226",
    },
    distribution: [],
  },
];

const khoiThiSelect = document.getElementById("khoi-thi-select");
const khoiThiCardsContainer = document.getElementById(
  "khoi-thi-cards-container"
);
const scoreDistributionContainer = document.getElementById(
  "score-distribution-container"
);

const createKhoiThiCardHTML = (khoi) => {
  return `
    <div class="subject-card" data-khoi-thi-id="${khoi.id}">
      <div class="subject-title">${khoi.title}</div>
      <div class="score-stats">
        <div class="stat-box">
          <div class="label">Tổng số thí sinh</div>
          <div class="value">${khoi.stats.totalStudents}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm trung bình</div>
          <div class="value">${khoi.stats.avgScore}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm &gt; 5</div>
          <div class="value">${khoi.stats.above5}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm &lt; 5</div>
          <div class="value">${khoi.stats.below5}</div>
        </div>
      </div>
    </div>
  `;
};

const createDistributionTableHTML = (distribution) => {
  if (!distribution || distribution.length === 0) {
    return `<p>Không có dữ liệu phổ điểm chi tiết cho khối thi này.</p>`;
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

const renderContent = (khoiId) => {
  khoiThiCardsContainer.innerHTML = "";
  scoreDistributionContainer.innerHTML = "";

  if (khoiId === "tatca") {
    khoiThiData.forEach((khoi) => {
      khoiThiCardsContainer.innerHTML += createKhoiThiCardHTML(khoi);
    });
  } else {
    const selectedKhoi = khoiThiData.find((khoi) => khoi.id === khoiId);
    if (selectedKhoi) {
      khoiThiCardsContainer.innerHTML = createKhoiThiCardHTML(selectedKhoi);
      scoreDistributionContainer.innerHTML = createDistributionTableHTML(
        selectedKhoi.distribution
      );
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  if (khoiThiSelect) {
    khoiThiSelect.addEventListener("change", function () {
      const selectedKhoiId = this.value;
      renderContent(selectedKhoiId);
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn, .active");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetPage = button.getAttribute("data-target");
      if (targetPage === "mon-thi-page") {
        window.location.href = "phodiem_monthi.html";
      } else if (targetPage === "khoi-thi-page") {
        window.location.href = "phodiem_khoithi.html";
      } else if (targetPage === "tinh-thanh-page") {
        window.location.href = "tinh-thanh.html";
      }
    });
  });

  renderContent("tatca");
});
