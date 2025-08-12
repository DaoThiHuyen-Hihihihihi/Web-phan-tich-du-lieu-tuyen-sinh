document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const sbdInput = document.getElementById("sbd-input");
  const resultContainer = document.getElementById("result-container");

  // Dữ liệu mẫu điểm thi
  const mockData = {
    "01234567": [
      { mon: "Toán", diem: 8.5 },
      { mon: "Ngữ Văn", diem: 7.0 },
      { mon: "Vật Lí", diem: 9.25 },
      { mon: "Hóa Học", diem: 8.75 },
      { mon: "Sinh Học", diem: 7.5 },
      { mon: "Ngoại Ngữ", diem: 9.0 },
      { mon: "Lịch Sử", diem: 6.5 },
    ],
    "07654321": [
      { mon: "Toán", diem: 9.0 },
      { mon: "Ngữ Văn", diem: 8.0 },
      { mon: "Tiếng Anh", diem: 9.5 },
    ],
    99999999: [
      { mon: "Toán", diem: 10 },
      { mon: "Ngữ Văn", diem: 9.5 },
      { mon: "Lịch Sử", diem: 9.75 },
      { mon: "Địa Lí", diem: 9.25 },
    ],
  };

  const renderResult = (sbd, scores) => {
    if (!scores) {
      resultContainer.innerHTML =
        '<p class="not-found">Không tìm thấy số báo danh này.</p>';
      return;
    }

    const tableRows = scores
      .map(
        (score) => `
      <tr>
        <td>${score.mon}</td>
        <td>${score.diem}</td>
      </tr>
    `
      )
      .join("");

    resultContainer.innerHTML = `
      <div class="sbd-container">
        <img src="../images/sbd.png" alt="So bao danh" />
        <div class="sbd-text">
          <p>Số báo danh</p>
          <p class="sbd-number">${sbd}</p>
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Môn</th>
              <th>Điểm</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  };

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const sbd = sbdInput.value.trim();
    const scores = mockData[sbd];
    renderResult(sbd, scores);
  });
});
