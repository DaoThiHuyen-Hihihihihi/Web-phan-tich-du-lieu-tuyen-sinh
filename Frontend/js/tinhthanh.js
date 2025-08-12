const data = {
  provinces: {
    2024: {
      hanoi: {
        toan: { tong: 100000, TB: 7.2, lonhon5: 85000, behon5: 15000 },
        van: { tong: 98000, TB: 6.8, lonhon5: 80000, behon5: 18000 },
        vatly: { tong: 60000, TB: 7.5, lonhon5: 55000, behon5: 5000 },
      },
      hcm: {
        toan: { tong: 100000, TB: 7.2, lonhon5: 85000, behon5: 15000 },
        van: { tong: 98000, TB: 6.8, lonhon5: 80000, behon5: 18000 },
        vatly: { tong: 60000, TB: 7.5, lonhon5: 55000, behon5: 5000 },
      },
      danang: {
        toan: { tong: 50000, TB: 7.0, lonhon5: 45000, behon5: 5000 },
        van: { tong: 48000, TB: 6.5, lonhon5: 40000, behon5: 8000 },
        vatly: { tong: 30000, TB: 7.0, lonhon5: 28000, behon5: 2000 },
      },
    },
    2023: {
      hanoi: {
        toan: { tong: 100000, TB: 7.2, lonhon5: 85000, behon5: 15000 },
        van: { tong: 98000, TB: 6.8, lonhon5: 80000, behon5: 18000 },
        vatly: { tong: 60000, TB: 7.5, lonhon5: 55000, behon5: 5000 },
      },
      hcm: {
        toan: { tong: 100000, TB: 7.2, lonhon5: 85000, behon5: 15000 },
        van: { tong: 98000, TB: 6.8, lonhon5: 80000, behon5: 18000 },
        vatly: { tong: 60000, TB: 7.5, lonhon5: 55000, behon5: 5000 },
      },
    },
  },
};

const renderStatsCard = (data, title) => {
  return `
    <div class="subject-card">
      <div class="subject-title">${title}</div>
      <div class="score-stats">
        <div class="stat-box">
          <div class="label">Tổng số thí sinh</div>
          <div class="value">${data.tong.toLocaleString()}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm trung bình</div>
          <div class="value">${data.TB}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm > 5</div>
          <div class="value">${data.lonhon5.toLocaleString()}</div>
        </div>
        <div class="stat-box">
          <div class="label">Điểm < 5</div>
          <div class="value">${data.behon5.toLocaleString()}</div>
        </div>
      </div>
    </div>
  `;
};

const setupProvinceFilters = () => {
  const yearSelect = document.getElementById("year-select");
  const provinceSelect = document.getElementById("province-select");
  const displayArea = document.getElementById("province-data-display");

  const updateProvincesDropdown = (selectedYear) => {
    provinceSelect.innerHTML = '<option value="">Chọn tỉnh/thành phố</option>';
    const provincesInYear = data.provinces[selectedYear];
    if (provincesInYear) {
      for (const provinceKey in provincesInYear) {
        if (provincesInYear.hasOwnProperty(provinceKey)) {
          const option = document.createElement("option");
          option.value = provinceKey;
          option.textContent =
            provinceKey.charAt(0).toUpperCase() + provinceKey.slice(1);
          provinceSelect.appendChild(option);
        }
      }
    }
  };

  // Hàm để render dữ liệu
  const renderProvinceData = () => {
    const selectedYear = yearSelect.value;
    const selectedProvince = provinceSelect.value;

    if (!selectedYear || !selectedProvince) {
      displayArea.innerHTML =
        '<p class="placeholder-text">Vui lòng chọn năm và tỉnh/thành phố để xem dữ liệu.</p>';
      return;
    }

    const provinceData = data.provinces[selectedYear]?.[selectedProvince];

    if (!provinceData) {
      displayArea.innerHTML =
        '<p class="placeholder-text">Không tìm thấy dữ liệu cho lựa chọn này.</p>';
      return;
    }

    let htmlContent = "";
    for (const subject in provinceData) {
      const subjectData = provinceData[subject];
      htmlContent += renderStatsCard(
        subjectData,
        `Điểm trung bình môn ${subject.toUpperCase()}`
      );
    }
    displayArea.innerHTML = htmlContent;
  };
  for (const year in data.provinces) {
    if (data.provinces.hasOwnProperty(year)) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }
  yearSelect.addEventListener("change", () => {
    const selectedYear = yearSelect.value;
    updateProvincesDropdown(selectedYear);
    renderProvinceData();
  });

  provinceSelect.addEventListener("change", renderProvinceData);

  const initialYear = yearSelect.value;
  if (initialYear) {
    updateProvincesDropdown(initialYear);
  }
  renderProvinceData();
};

document.addEventListener("DOMContentLoaded", () => {
  setupProvinceFilters();
});
