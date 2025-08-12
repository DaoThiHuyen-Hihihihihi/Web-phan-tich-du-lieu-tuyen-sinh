document.addEventListener("DOMContentLoaded", function () {
  const khuVucBtn = document.querySelector(".khu-vuc-btn");
  const khuVucGroup = document.querySelector(".khu-vuc-group");
  const checkboxGroup = document.querySelector(".checkbox-group");
  const khuVucCheckboxes = document.querySelectorAll('input[name="khu-vuc"]');
  const khuVucBadge = document.querySelector(".khu-vuc-group .badge");
  const toHopSelect = document.getElementById("to-hop-xet-tuyen");
  const thanhPhoSelect = document.getElementById("thanh-pho");
  const submitBtn = document.querySelector(".submit-btn");

  // Dữ liệu mẫu cho dropdowns
  const toHopData = ["A00", "A01", "B00", "C00", "D01"];
  const thanhPhoData = [
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Thanh Hóa",
  ];

  // Hàm để điền dữ liệu vào các thẻ select
  const populateDropdown = (selectElement, dataArray) => {
    dataArray.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      selectElement.appendChild(option);
    });
  };

  // Ẩn/Hiện checkbox khi click vào nút
  khuVucBtn.addEventListener("click", () => {
    checkboxGroup.style.display =
      checkboxGroup.style.display === "block" ? "none" : "block";
  });

  // Cập nhật số lượng khu vực đã chọn
  khuVucCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedCount = document.querySelectorAll(
        'input[name="khu-vuc"]:checked'
      ).length;
      khuVucBadge.textContent = selectedCount;
    });
  });

  // Xử lý khi click ra ngoài khu vực checkbox
  document.addEventListener("click", (event) => {
    if (!khuVucGroup.contains(event.target)) {
      checkboxGroup.style.display = "none";
    }
  });

  // Xử lý sự kiện khi submit form
  submitBtn.addEventListener("click", function (event) {
    // Ngăn chặn hành vi mặc định của thẻ <a> (chuyển hướng ngay lập tức)
    event.preventDefault();

    // Thu thập dữ liệu từ form
    const diemThi = document.getElementById("diem-thi").value;
    const diemHocBa = document.getElementById("diem-hoc-ba").value;
    const diemCong = document.getElementById("diem-cong").value;
    const diemNangLuc = document.getElementById("diem-nang-luc").value;
    const toHop = toHopSelect.value;
    const thanhPho = thanhPhoSelect.value;
    const khuVucDaChon = Array.from(khuVucCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    // Lưu dữ liệu vào localStorage hoặc thực hiện các thao tác khác
    const searchParams = {
      diemThi,
      diemHocBa,
      diemCong,
      diemNangLuc,
      toHop,
      thanhPho,
      khuVucDaChon,
    };

    localStorage.setItem("searchParams", JSON.stringify(searchParams));

    // Chuyển hướng đến trang danh sách kết quả
    window.location.href = submitBtn.getAttribute("href");
  });

  // Điền dữ liệu vào các thẻ select khi trang tải
  populateDropdown(toHopSelect, toHopData);
  populateDropdown(thanhPhoSelect, thanhPhoData);
});
