document.addEventListener("DOMContentLoaded", function () {
  // Dữ liệu mẫu về điểm chuẩn
  const diemChuanData = [
    {
      stt: 1,
      nganh: "Công nghệ thông tin",
      diem_chuan: 25.5,
      he: "Đại học",
      khoi_thi: "A00",
      dia_chi: "Hà Nội",
    },
    {
      stt: 2,
      nganh: "Kinh tế",
      diem_chuan: 24.5,
      he: "Đại học",
      khoi_thi: "A01",
      dia_chi: "TP. Hồ Chí Minh",
    },
    {
      stt: 3,
      nganh: "Luật",
      diem_chuan: 26,
      he: "Đại học",
      khoi_thi: "C00",
      dia_chi: "Hà Nội",
    },
    {
      stt: 4,
      nganh: "Kế toán",
      diem_chuan: 22,
      he: "Cao đẳng",
      khoi_thi: "D01",
      dia_chi: "Thanh Hóa",
    },
    // Thêm dữ liệu khác ở đây
  ];

  // Lấy các phần tử từ DOM
  const universityTypeSelect = document.getElementById("university-type");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.querySelector(".search-button");
  const citySelect = document.getElementById("city");
  const majorSelect = document.getElementById("major");
  const resultsTableBody = document.getElementById("results-table-body");

  // Hàm để render dữ liệu vào bảng
  const renderTable = (data) => {
    resultsTableBody.innerHTML = ""; // Xóa dữ liệu cũ
    if (data.length === 0) {
      resultsTableBody.innerHTML =
        '<tr><td colspan="6">Không tìm thấy kết quả phù hợp.</td></tr>';
      return;
    }

    data.forEach((item) => {
      const row = `
        <tr>
          <td>${item.stt}</td>
          <td>${item.nganh}</td>
          <td>${item.diem_chuan}</td>
          <td>${item.he}</td>
          <td>${item.khoi_thi}</td>
          <td>${item.dia_chi}</td>
        </tr>
      `;
      resultsTableBody.innerHTML += row;
    });
  };

  // Hàm để lọc dữ liệu
  const filterData = () => {
    const type = universityTypeSelect.value;
    const searchTerm = searchInput.value.toLowerCase();
    const city = citySelect.value;
    const major = majorSelect.value;

    const filteredData = diemChuanData.filter((item) => {
      const matchesType =
        (type === "dai-hoc" && item.he === "Đại học") ||
        (type === "cao-dang" && item.he === "Cao đẳng");
      const matchesSearch =
        item.nganh.toLowerCase().includes(searchTerm) ||
        item.dia_chi.toLowerCase().includes(searchTerm);
      const matchesCity = city === "" || item.dia_chi === city;
      const matchesMajor = major === "" || item.nganh === major;

      return matchesType && matchesSearch && matchesCity && matchesMajor;
    });

    renderTable(filteredData);
  };

  // Gắn sự kiện cho các input và nút
  searchButton.addEventListener("click", filterData);
  universityTypeSelect.addEventListener("change", filterData);
  citySelect.addEventListener("change", filterData);
  majorSelect.addEventListener("change", filterData);

  // Hiển thị một bảng trống ban đầu
  renderTable([]);
});
