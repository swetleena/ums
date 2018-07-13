var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

global.USERS = [];


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/"+"home.html");
});

app.get('/regPage',(req,res)=>{
	// console.log(__dirname + "/"+"regPage.html")
    res.sendFile(__dirname + "/"+"regPage.html");
});


app.get('/userList',(req,res)=>{

 var doc = "<html><head><title>All Users</title></head><body>";
 var table = "<table>"
 var tableHeader = "<thead><th>UserName</th><th>eMailId</th><th>DOB</th><th>Mobile</th><th>Gender</th><th>Actions</th></thead>";
 var tableBody = "<tbody>";
 USERS.forEach(function(e){
                             var row="<form  method='post'><tr><td>"+e.username+"</td><td>"+e.email+"</td><td>"+e.dob+"</td><td>"+e.mobile+"</td><td><input type=\"button\" value=\"Edit\" onclick=\"window.location.href='http://localhost:3000/userList/edit'\"/> <button>Delete</button></td></tr>";
 
                             tableBody=tableBody+row;
 
   });
 tableBody+="</tbody>";
 table = table+tableHeader+tableBody+"</table>";
 doc = doc+table+"</body>" + "</html>";
 res.send(doc);

});


app.get('/userList/edit',(req,res)=>{

 var doc = "<html><head><title>All Users</title></head><body>";
 var table = "<table>"
 var tableHeader = "<thead><th>UserName</th><th>eMailId</th><th>DOB</th><th>Mobile</th><th>Gender</th><th>Actions</th></thead>";
 var tableBody = "<tbody>";
 USERS.forEach(function(e){
                             var row="<form action='/userList/update' method='post'><tr><td><input type='text' name='username'  value='"+e.username+"'/></td><td><input type='text' name='email' value='"+e.email+"'/></td><td><input type='text' name='dob' value='"+e.dob+"'/></td><td><input type='text' name='mobile' value='"+e.mobile+"'/></td><td><input type='text' name='gender' value='"+e.gender+"'></td><td><input type='submit' value='Update'/> <button>Delete</button></td></tr>";
 
                             
 
   });
 tableBody=tableBody+row;
 tableBody+="</tbody>";
 table = table+tableHeader+tableBody+"</table>";
 doc = doc+table+"</body>" + "</html>";
 res.send(doc);

});


app.post('/registration', (req, res)=>{
	if(req.body.username && req.body.email)
	{
		var user ={
			username : req.body.username,
			email : req.body.email,
			dob :req.body.dob,
			mobile :req.body.mobile, 
			gender : req.body.gender,
			dp :req.body.dp

		}
	//console.log(user)

     global.USERS.push(user);
     res.send('Record is inserted');
    }

   else
   {
   	res.send("Please fill the details");
   	// alert("Please fill all the required fields."); 
   } 
});


app.post('/userList/update', (req, res)=>{
  
  console.log(req.body.username);
 
    var user ={ username : req.body.username,
      email : req.body.email,
      dob :req.body.dob,
      mobile :req.body.mobile, 
      gender : req.body.gender,
      dp :req.body.dp }
     
      res.send("record updated successfully!!");
    
    
    
});

//app.get('/usersListManagement', (req, res)=> {
   // res.send(JSON.stringify(global.USERS, null, '2'));

//});


app.listen(3000,function() {
    console.log('Server is running at port 3000');
})