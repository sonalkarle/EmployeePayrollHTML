$(document).ready(function(){
    var table = document.getElementById("emp-table");
    $(document).on('click','#delEmp',function(){   
  
      $.ajax({
        url: 'https://localhost:44390/EmployeePayroll/Delete/'+this.value,
        type: "DELETE",
        success: function (data) {
          
          console.log(data['success']);
          window.alert (data['sucess']);
          loadData();
  
        },
        error: function (error) {
            console.log(error);
       
        }
    });
    });

    $(document).on('click','#editEmp',function(){

      $.ajax({
        url: 'https://localhost:44390/EmployeePayroll/'+this.value,
        type: "GET",
        success: function(data){
          console.log(data['data']);
          updateEmp(data['data']);
          var updateResult=JSON.stringify(data['data']);
          localStorage.setItem("editEmp",updateResult);
         
        
        },
        error:function(error){
          console.log(error);
        }
      });
    });

loadData();
 function loadData() {  
    $.ajax({  
        url: "https://localhost:44390/EmployeePayroll",  
        type: "GET",
        success: function (result) {  
            window.alert(result);
            console.log(result);
            setEmpoyees(result['employees']);
              
        },  
        error: function (errormessage) {  
            alert(errormessage.responseText);  
        }  
    });  
}  
function setEmpoyees(employees){
    $("#emp-table").find("tr:gt(0)").remove();

    
    var i;
    for (i = 0; i < employees.length; i++) {
           var row = table.insertRow();
           row.value=employees[i]["employeeID"];
           row.insertCell().innerHTML = employees[i]["profile"];
           row.insertCell().innerHTML = employees[i]['employeeName'];
           row.insertCell().innerHTML = employees[i]['gender'];
          
         var s =  departmentStr(employees[i]['department']);
           row.insertCell().innerHTML = s;
           
           row.insertCell().innerHTML ='₹ '+ employees[i]['salary'];  
           row.insertCell().innerHTML = employees[i]['startDate'];
           row.insertCell().innerHTML = 
          ' <button class="tr-btn" id="delEmp" value='+employees[i]["employeeID"]+'><i class="fa fa-trash"></i></button>'+
             '<button class="edit-btn" id="editEmp" value='+employees[i]["employeeID"]+'><i class="fa fa-pencil"></i></button>';
  
    }
  }
  function departmentStr(dept){
    if(dept != null)
    {
      var s = "";
      for(var i = 0; i < dept.length; i++)
      {
        s += "<span class=\"dot\">"+dept[i]+"</span>&nbsp;&nbsp;"
      }
      return s;
    }
    
    return '';
  }
});