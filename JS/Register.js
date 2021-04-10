function register(event)
{
var name = $("input[name= fullname]").val();
var profile =  $("input[name= 'profileImg']:checked").val();

var gender= $("input[name='gender']:checked").val();
var Employepayrolllist=[];
var department = [];
$.each($("input[name='department']:checked"), function(){
department.push($(this).val());
});
}
  