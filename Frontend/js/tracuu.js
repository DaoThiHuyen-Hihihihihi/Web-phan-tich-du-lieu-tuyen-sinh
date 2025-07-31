document.addEventListener("DOMContentLoaded", () => {
  // 1. Lấy các phần tử DOM
  const searchForm = document.getElementById("searchForm");
  const sbdInput = document.getElementById("sbdInput");
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const resultsContainer = document.getElementById("resultsContainer");

  //  Dữ liệu giả lập

  const mockStudentData = {
    "01234567": {
      soBaoDanh: "01234567",
      hoVaTen: "Đào Thị Huyền",
      ngaySinh: "15/05/2007",
      Mon1: 10,
      Mon2: 9,
      Mon3: 8,
      Mon4: 7,
    },
  };

  async function fetchStudentData(sbd) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = mockStudentData[sbd];
        if (data) {
          resolve({ success: true, data: data });
        } else {
          resolve({
            success: false,
            message: "Không tìm thấy số báo danh này. Vui lòng kiểm tra lại.",
          });
        }
      }, 1000);
    });
  }
  function displayResults(data) {
    resultsContainer.innerHTML = `
            <h2>Thông tin thí sinh</h2>
            <p><strong>Số báo danh:</strong> ${data.soBaoDanh}</p>
            <p><strong>Họ và tên:</strong> ${data.hoVaTen}</p>
            <p><strong>Ngày sinh:</strong> ${data.ngaySinh}</p>
            <h3>Điểm các môn:</h3>
            <div class="score-grid">
                ${
                  data.Mon1
                    ? `<div class="score-item"><div class="subject">Mon1</div><div class="score">${data.Mon1}</div></div>`
                    : ""
                }
                ${
                  data.Mon2
                    ? `<div class="score-item"><div class="subject">Mon2</div><div class="score">${data.Mon2}</div></div>`
                    : ""
                }
                ${
                  data.Mon3
                    ? `<div class="score-item"><div class="subject">Mon3</div><div class="score">${data.Mon3}</div></div>`
                    : ""
                }
                ${
                  data.Mon4
                    ? `<div class="score-item"><div class="subject">Mon4</div><div class="score">${data.Mon4}</div></div>`
                    : ""
                }
               
        `;
    resultsContainer.style.display = "block";
  }

  function hideAllMessages() {
    loadingMessage.style.display = "none";
    errorMessage.style.display = "none";
    resultsContainer.style.display = "none";
  }
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const soBaoDanh = sbdInput.value.trim();

    hideAllMessages();

    if (!soBaoDanh) {
      errorMessage.textContent = "Vui lòng nhập số báo danh.";
      errorMessage.style.display = "block";
      return;
    }
    loadingMessage.style.display = "block";

    try {
      const response = await fetchStudentData(soBaoDanh);

      loadingMessage.style.display = "none";

      if (response.success) {
        displayResults(response.data);
      } else {
        errorMessage.textContent = response.message;
        errorMessage.style.display = "block";
      }
    } catch (error) {
      loadingMessage.style.display = "none";
      errorMessage.textContent =
        "Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.";
      errorMessage.style.display = "block";
      console.error("Lỗi khi tìm kiếm:", error);
    }
  });
});
