var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

global.USERS = [];

// To get Home page
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/"+"home.html");
});

// To get user registration page after clicking on "User registration" button on home page
app.get('/regPage',(req,res)=>{
    res.sendFile(__dirname + "/"+"regPage.html");
});

// To get all the user list to manage users after clicking on "User list management" button on home page
app.get('/userList',(req,res)=>{

 var userDelete= "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n";
      userDelete+= "<script>function doDelete(eid){\n";
      userDelete+=   "$.ajax({\n";
      userDelete+=   "type: 'DELETE',\n";
      userDelete+=   "url: \"http://localhost:3000/userList/\"+eid+\"/delete\",\n";
      userDelete+=   "data: {eid: eid},\n";
      userDelete+=   "success: function(data){\n";
      userDelete+=   "alert('Deleted Sucessfully');\n";
      userDelete+=   "location.reload();\n";
      userDelete+=   " },\n";
      userDelete+=   "error: function(jqXHR, textStatus, errorThrown) {\n";
      userDelete+=   "alert('Some problem while deleting')\n"
      userDelete+=   "}});}</script>";


 var doc = "<html><head><title>All Users</title> "+userDelete+"</head><body>";
 var table = "<table>"
 var tableHeader = "<thead><th>UserName</th><th>eMailId</th><th>DOB</th><th>Mobile</th><th>Actions</th></thead>";
 var tableBody = "<tbody>";
 USERS.forEach(function(e){
                             var row="<tr><td>"+e.username+"</td>\n<td>"+e.email+"</td>\n<td>"+e.dob+"</td>\n<td>"+e.mobile+"</td>\n<td><button onclick=\"window.location.href='http://localhost:3000/userList/"+e.email+"'\"/>Edit</button>\n<button onclick=\"doDelete('"+e.email+"')\">Delete</button></td>\n</tr>\n";
 
                             tableBody=tableBody+row;
 
   });
 tableBody+="</tbody>";
 table = table+tableHeader+tableBody+"</table>";
 doc = doc+table+"</body>" + "</html>";
 res.send(doc);

});

// To get user's profile form to edit as a result of clicking on "edit" button to update user details
app.get('/userList/:eid',(req,res)=>{
var header= "<html><head><title>User Profile</title></head><body><h1>User Profile </h1>";
var userEmail = req.params.eid;
var form ="<form action ='/userlist/"+userEmail+"/update' method='post'>";
USERS.forEach(function(e){

  if(userEmail == e.email)
  {
 form+= "<div style='float:left'><table>";
 form+="<tr><td>Name:</td><td><input type='text' name='username' value ='"+ e.username +"'/></td></tr>";
 form+="<tr><td>Email:</td><td><input type='email' name='email' value = '"+e.email+"' disable/></td></tr>";
 form+="<tr><td>DOB:</td><td><input type='text' name='dob' value = '"+e.dob+"'/></td></tr>";
 form+="<tr><td>Mobile:</td><td><input type='text' name='mobile' value = '"+e.mobile+"'/></td></tr>";
 form+="</table></div>";
 form+="<div><img height ='100' width='100'/><br/><input type=' file' name='dp'/></div>";
 form+="<input type='submit' value='update'/></body></html>";

}


 }); 

var file= header+ form; 
res.send(file);
});

// To post the entered details of user at the time of registration by clicking "submit" button.
app.post('/registration', (req, res)=>{
if(req.body.username && req.body.email)
{
var user ={
username : req.body.username,
email : req.body.email,
dob :req.body.dob,
mobile :req.body.mobile, 
dp :req.body.dp

}
     global.USERS.push(user);
     res.send('Record is inserted');
    }

   else
   {
    res.send("Please fill the details");
    } 
});

// To post the users updated profile info on click of "update" button
app.post('/userList/:eid/update', (req, res)=>{
  
  console.log(req.body.username);
   var userEmail = req.params.eid;
   USERS.forEach(function(e){
   if(userEmail == e.email)
   {
      e.username = req.body.username,
      e.email = req.body.email,
      e.dob =req.body.dob,
      e.mobile =req.body.mobile, 
      e.dp =req.body.dp 
    }
  });

      res.send("record updated successfully!!");
    
    
    
});

// To delete user from the user list
app.delete('/userList/:eid/delete', (req, res)=>{
var userEmail = req.params.eid; 
var i=0;
var j;

USERS.forEach(function(e){
  if(userEmail == e.email)
  {
    j=i;
 
}
i++;
});
 
 global.USERS.splice(j,1); 
});
 
//app.get('/usersListManagement', (req, res)=> {
   // res.send(JSON.stringify(global.USERS, null, '2'));

//});


app.listen(3000,function() {
    console.log('Server is running at port 3000');
})
