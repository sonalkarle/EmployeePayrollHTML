$(document).ready(function(){
    var result = localStorage.getItem("editEmp");
  // $('#Image').val(result.profileimage);
    result=JSON.parse(result);
    $('#fullname').val(result.employeeName);
    $("input[name=gender][value="+result.gender + "]").prop('checked',true);
    $("input[name=department][value=" + result.department1 + "]").prop('checked',true);
   
   
    $('#salary').val(result.salary);
    var day = new Date(result.startDate);
    $('#start-date-day').val(day.getDay());
    
    $('#start-date-month').val(day.getMonth());
    $('#start-date-year').val(day.getFullYear());
    $('#notes').val(result.notes);
    
});

function updateEmp(data)
{
    console.log("data in Update.js",data);
    location.replace('/Html/Update.html');
    

   
}
function update(event)
{
    event.preventDefault();

    var date = document.getElementById("start-date-year").value+'/'
    +document.getElementById("start-date-month").value+'/'
    +document.getElementById("start-date-day").value;
    var salary = document.getElementById("salary").value;
    var sal = parseFloat(salary).toFixed(3);
    var startDate = new Date(date);
    $.each($("input[name='department]:checked"),function(){
        department.push($(this).val());
    });
    var result = localStorage.getItem("editEmp");
    result=JSON.parse(result);

        let reqData = {
            
            "profileimage":"Image",
            "employeeName": document.getElementById("fullname").value,
            "gender":document.querySelector('input[name="gender"]:checked').value,
            "salary":parseFloat(sal),
            "startDate":startDate,
            "department":[...document.querySelectorAll('input[name=department]:checked')].map(e => e.value),
            "notes":document.getElementById("notes").value,
            "employeeID":result.employeeID
    }
  let rdata = JSON.stringify(reqData);
  var x = document.getElementById("snackbar");
  x.className = "show";
$.ajax ({
    url:'https://localhost:44390/EmployeePayroll/Update',
    type: "PUT",
    data: rdata,
    dataType:"json",

    contentType:'application/json',
    success: function(data){
        console.log(data);
        x.innerHTML="Update successfully";
        x.style.color ="green";
        setTimeout(function(){x.className = x.className.replace("show","");},3000);
        loadData();

    },
    error: function(error){
        console.log(error);
        x.innerHTML = "Update unsuccessfullly";
        x.style.color = "Red";
        setTimeout(function(){x.className = x.className.replace("show","");},3000);
    }
});

}



