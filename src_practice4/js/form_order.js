const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const delivery = document.getElementById("delivery");
const address = document.getElementById("address");
const note = document.getElementById("note");
const noteCount = document.getElementById("noteCount");
const totalEl = document.getElementById("total");
const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const prices = {
    ao:150000,
    quan:200000,
    giay:300000
};
function showError(id,msg){
    document.getElementById(id).textContent = msg;
}
function clearError(id){
    document.getElementById(id).textContent = "";
}
function calculateTotal(){
    const p = product.value;
    const q = Number(quantity.value);
    if(prices[p] && q){
        const total = prices[p] * q;
        totalEl.textContent = total.toLocaleString("vi-VN");
    }
}
product.addEventListener("change",calculateTotal);
quantity.addEventListener("input",calculateTotal);
note.addEventListener("input",function(){
    const length = note.value.length;
    noteCount.textContent = length + "/200";
    if(length > 200){
        noteCount.classList.add("red");
        showError("noteError","Ghi chú tối đa 200 ký tự");
    }else{
        noteCount.classList.remove("red");
        clearError("noteError");
    }
});

form.addEventListener("submit",function(e){
    e.preventDefault();
    let valid = true;
    if(product.value===""){
        showError("productError","Vui lòng chọn sản phẩm");
        valid=false;
    }else clearError("productError");
    const q = Number(quantity.value);
    if(!Number.isInteger(q) || q<1 || q>99){
        showError("quantityError","Số lượng 1-99");
        valid=false;
    }else clearError("quantityError");
    const today = new Date();
    const selected = new Date(delivery.value);
    const max = new Date();
    max.setDate(today.getDate()+30);
    if(!delivery.value || selected<today || selected>max){
        showError("dateError","Ngày giao phải trong 30 ngày tới");
        valid=false;
    }else clearError("dateError");
    if(address.value.trim().length < 10){
        showError("addressError","Địa chỉ ít nhất 10 ký tự");
        valid=false;
    }else clearError("addressError");
    if(note.value.length>200){
        showError("noteError","Ghi chú tối đa 200 ký tự");
        valid=false;
    }
    const payment = document.querySelector("input[name='payment']:checked");
    if(!payment){
        showError("paymentError","Chọn phương thức thanh toán");
        valid=false;
    }else clearError("paymentError");
    if(!valid) return;
    const total = prices[product.value] * quantity.value;
    summary.innerHTML = `
    Sản phẩm: ${product.options[product.selectedIndex].text}<br>
    Số lượng: ${quantity.value}<br>
    Tổng tiền: ${total.toLocaleString("vi-VN")} VNĐ<br>
    Ngày giao: ${delivery.value}
    `;
    confirmBox.style.display="block";
});

confirmBtn.addEventListener("click",function(){
    alert("Đặt hàng thành công!");
    confirmBox.style.display="none";
    form.reset();
    totalEl.textContent = "0";
});

cancelBtn.addEventListener("click",function(){
    confirmBox.style.display="none";
});