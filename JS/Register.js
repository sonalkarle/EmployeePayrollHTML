function register(event){
    event.preventDefault(); 
  

 // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    var date = document.getElementById("start-date-year").value+'/'
    +document.getElementById("start-date-month").value+'/'
    +document.getElementById("start-date-day").value;
    var salary = document.getElementById("salary").value;
    var sal = parseFloat(salary).toFixed(3);
    var startDate = new Date(date);

        let reqData = {
            "profileimage":"Image",
            "employeeName": document.getElementById("fullname").value,
            "gender":document.querySelector('input[name="gender"]:checked').value,
            "salary":parseFloat(sal),
            "startDate":startDate,
            "department":[...document.querySelectorAll('input[name=department]:checked')].map(e => e.value),
            "notes":document.getElementById("notes").value
    }
  let rdata = JSON.stringify(reqData);
  var x = document.getElementById("snackbar");
  x.className = "show";
  
  $.ajax({
    url: 'https://localhost:44390/EmployeePayroll/Register',
    type: "POST",
    data: rdata,
    dataType: "json",
   
    contentType:'application/json',
    success: function (data) {
        console.log(data);
        x.innerHTML = "Registration successful";
        x.style.color = "green";
        setTimeout(function(){x.className = x.className.replace("show",""); },3000);
        loadData();
    },
    error: function (error) {
        console.log(error);
        x.innerHTML = "Registration successful";
        x.style.color = "green";
        setTimeout(function(){x.className = x.className.replace("show",""); },3000);
    }
            
    
});
}
$(document).ready(function(){
   
    AddDateField();
  });
function AddDateField() {
    var d = new Date();
  var n = d.getFullYear();
    var x = document.getElementById("start-date-year");
    var i;
    for (i = n; i > 1990; i--) {
    var option = document.createElement("option");
    option.text = i.toString();
    option.value = i;
    x.add(option);
    }
    var x = document.getElementById("start-date-month");
    
    for (i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.text = i.toString();
        option.value = i;
        x.add(option);
        }

    var x = document.getElementById("start-date-day");

    for (i = 1; i <= 31; i++) {
        var option = document.createElement("option");
        option.text = i.toString();
        option.value = i;
        x.add(option);
        }
        var x = document.getElementById("salary");
        for (i = 1; i <= 20; i++) {
            var option = document.createElement("option");
            option.text = (i*10000).toString();
            option.value = i*10000;
            x.add(option);
            }
  }
  function resetFields(){
    document.getElementById("registerform").reset();
  }
  