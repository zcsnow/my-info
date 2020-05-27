 
function InputInfo() {
    var Uname = "", Sex = "", Ages = "", Phone = "", sheng = "";
    Uname = document.getElementById("Uname").value;
    Sex = document.getElementById("Sex").value;
    Ages = document.getElementById("Ages").value;
    Phone = document.getElementById("Phone").value;
    sheng = document.getElementById("sheng").value;
    $.ajax({
        url: "GLAjax.ashx",
        data: { "UName": Uname, "Sex": Sex, "Ages": Ages, "Phone": Phone, "Sheng": sheng },
        contentType: "application/json;charset=utf-8",
        type: "GET",
        dataType: "json",
        aysnc: false,
        success: function (resute) {
            alert("录入成功！");
        }
    });
}
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?244e74d65b236982cf7234a043ba59fc";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();