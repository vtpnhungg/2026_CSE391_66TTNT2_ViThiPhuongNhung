// Bước 1: Truy xuất DOM
const inputStudentName = document.getElementById("studentName");
const inputStudentScore = document.getElementById("studentScore");
const btnAddStudent = document.getElementById("btn-add");
const tableBody = document.getElementById("tableBody");
const totalStudents = document.getElementById("total");
const avgScore = document.getElementById("avg");
//thêm sự kiện cho nút search
const inputSearch = document.getElementById("searchStudent");



// nhấn enter
inputStudentScore.addEventListener("keydown", function(e){
    if(e.key=="Enter"){
        btnAddStudent.click();
    }
})
// Bước 2: Sự kiện thêm sinh viên
btnAddStudent.addEventListener("click", function () {
    const studentName = inputStudentName.value.trim();
    const studentScore = parseFloat(inputStudentScore.value);
    let isValid = true;

    if (!studentName||!studentScore) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        isValid=false;
    }
    else if (studentScore < 0 || studentScore > 10) {
        alert("Vui lòng nhập lại điểm trong khoảng từ 0 đến 10");
        isValid=false;
    } 
    if(!isValid){
        return;
    }
    // Tạo dòng mới
    const tr = document.createElement("tr");
    const stt = document.createElement("td");
    stt.textContent = "";
    const name = document.createElement("td");
    name.textContent = studentName;
    const score = document.createElement("td");
    score.textContent = studentScore;
    const rank = document.createElement("td");
    let r = "";
    if (studentScore >= 8.5) {
        r = "Giỏi";
    } else if (studentScore >= 7) {
        r = "Khá";
    } else if (studentScore >= 5) {
        r = "Trung bình";

    } else {
        r = "Yếu";
    }
    rank.textContent = r;
    if(studentScore<5){
        tr.style.backgroundColor = "yellow";
    }
    // Cột hành động
    const action = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.classList.add("btn-delete");
    deleteBtn.addEventListener("click", function () {
        tr.remove();
        updateStudentOrder();
        updateStatistics();
    });
    action.appendChild(deleteBtn);
    // Ghép các ô vào dòng
    tr.appendChild(stt);
    tr.appendChild(name);
    tr.appendChild(score);
    tr.appendChild(rank);
    tr.appendChild(action)
    // Thêm vào bảng
    tableBody.appendChild(tr);
    // Reset input
    inputStudentName.value = "";
    inputStudentScore.value = "";
    // Cập nhật STT và thống kê
    updateStudentOrder();
    updateStatistics();
});
// Bước 3: Cập nhật STT
function updateStudentOrder() {
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}
// Bước 4: Cập nhật thống kê
function updateStatistics() {
    const rows = tableBody.querySelectorAll("tr");

    const total = rows.length;
    let sum = 0;

    rows.forEach(row => {
        const score = parseFloat(row.cells[2].textContent);
        sum += score;
    });

    totalStudents.textContent = `Tổng số sinh viên: ${total}`;
    avgScore.textContent = `Điểm trung bình: ${total ? (sum / total).toFixed(2) : 0}`;
}


inputSearch.addEventListener("input", function () {
    const keyword = inputSearch.value.toLowerCase().trim();
    const rows = tableBody.querySelectorAll("tr");
    let found = false;
    rows.forEach(row => {
        if (row.id === "noResult") return; // bỏ qua dòng thông báo
        const name = row.cells[1].textContent.toLowerCase();
        if (name.includes(keyword)) {
            row.style.display = "";
            found = true;
        } else {
            row.style.display = "none";
        }
    });
    let noResult = document.getElementById("noResult");
    if (!found && rows.length > 0) {
        if (!noResult) {
            const tr = document.createElement("tr");
            tr.id = "noResult";
            const td = document.createElement("td");
            td.colSpan = 5;
            td.textContent = "Không có kết quả";
            td.style.textAlign = "center";
            tr.appendChild(td);
            tableBody.appendChild(tr);
        }
    } else {
        if (noResult) {
            noResult.remove();
        }
    }
});
const filterRank = document.getElementById("filterRank");
filterRank.addEventListener("change", function () {
    const selected = filterRank.value;
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
        if (row.id === "noResult") return;
        const rank = row.cells[3].textContent;
        if (selected === "all" || rank === selected) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});
let sortAsc = true;
const sortScore = document.getElementById("sortScore");
sortScore.addEventListener("click", function () {
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    rows.sort((a, b) => {
        const scoreA = parseFloat(a.cells[2].textContent);
        const scoreB = parseFloat(b.cells[2].textContent);
        return sortAsc ? scoreA - scoreB : scoreB - scoreA;
    });
    sortAsc = !sortAsc;
    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));
    updateStudentOrder();
});








