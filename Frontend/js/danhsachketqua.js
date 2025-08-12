document.addEventListener("DOMContentLoaded", () => {
  const mockData = [
    {
      ten_truong: "Đại học Bách khoa Hà Nội",
      ten_nganh: "Công nghệ thông tin",
      diem_chuan: 27.5,
      khu_vuc: "Bắc",
      to_hop: "A00",
      he_dai_hoc: "Đại học",
    },
    {
      ten_truong: "Đại học Quốc gia Hà Nội",
      ten_nganh: "Khoa học máy tính",
      diem_chuan: 26.8,
      khu_vuc: "Bắc",
      to_hop: "A01",
      he_dai_hoc: "Đại học",
    },
    {
      ten_truong: "Đại học FPT",
      ten_nganh: "Kỹ thuật phần mềm",
      diem_chuan: 25.5,
      khu_vuc: "Bắc, Trung, Nam",
      to_hop: "A00, A01, D01",
      he_dai_hoc: "Đại học",
    },
    {
      ten_truong: "Đại học Kinh tế Quốc dân",
      ten_nganh: "Kinh tế đối ngoại",
      diem_chuan: 26.0,
      khu_vuc: "Bắc",
      to_hop: "A00, A01, D01",
      he_dai_hoc: "Đại học",
    },
    {
      ten_truong: "Đại học Sài Gòn",
      ten_nganh: "Kế toán",
      diem_chuan: 24.5,
      khu_vuc: "Nam",
      to_hop: "A00, A01, D01",
      he_dai_hoc: "Đại học",
    },
  ];

  const diemThiInput = document.getElementById("diem-thi");
  const toHopSelect = document.getElementById("to-hop-xet-tuyen");
  const khuVucButtons = document.querySelectorAll(".khu-vuc-btn");
  const khuVucCheckboxes = document.querySelectorAll('input[name="khu-vuc"]');
  const thanhPhoSelect = document.getElementById("thanh-pho");
  const xemNgayBtn = document.querySelector(".submit-btn");
  const tableBody = document.querySelector("#results-table tbody");

  const renderTable = (data) => {
    tableBody.innerHTML = "";
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.ten_truong}</td>
                <td>${item.ten_nganh}</td>
                <td>${item.diem_chuan}</td>
                <td>${item.khu_vuc}</td>
                <td>${item.to_hop}</td>
                <td>${item.he_dai_hoc}</td>
            `;
      tableBody.appendChild(row);
    });
  };

  const filterData = () => {
    const diemThi = parseFloat(diemThiInput.value) || 0;
    const toHop = toHopSelect.value;
    const selectedKhuVuc = Array.from(khuVucCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const filteredResults = mockData.filter((item) => {
      const matchesDiem = item.diem_chuan <= diemThi;
      const matchesToHop = toHop === "" || item.to_hop.includes(toHop);
      const matchesKhuVuc =
        selectedKhuVuc.length === 0 ||
        selectedKhuVuc.some((kv) => item.khu_vuc.includes(kv));

      return matchesDiem && matchesToHop && matchesKhuVuc;
    });

    renderTable(filteredResults);
  };

  const toHopList = ["A00", "A01", "B00", "C00", "D01"];
  const thanhPhoList = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
  ];

  toHopList.forEach((toHop) => {
    const option = document.createElement("option");
    option.value = toHop;
    option.textContent = toHop;
    toHopSelect.appendChild(option);
  });

  thanhPhoList.forEach((thanhPho) => {
    const option = document.createElement("option");
    option.value = thanhPho;
    option.textContent = thanhPho;
    thanhPhoSelect.appendChild(option);
  });

  xemNgayBtn.addEventListener("click", (e) => {
    e.preventDefault();
    filterData();
  });

  khuVucButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const checkboxGroup = btn.nextElementSibling;
      checkboxGroup.style.display =
        checkboxGroup.style.display === "flex" ? "none" : "flex";
    });
  });

  khuVucCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      const badge = document.querySelector(".khu-vuc-btn .badge");
      const checkedCount = document.querySelectorAll(
        'input[name="khu-vuc"]:checked'
      ).length;
      badge.textContent = checkedCount;
    });
  });

  renderTable(mockData);
});
