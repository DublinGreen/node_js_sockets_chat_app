"use strict";

const express = require('express');
const app = express();
const path = require('path');
const sqlString = require('sqlstring');
//const mysql = require('mysql');

const APP_PORT = 5555;

//Mysql connection parameters 
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "node_chat_app"
});

//Mysql connection test
//con.connect(function(err) {
//	console.log("Database Connected");
//});

const server = app.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`)
})

const io = require('socket.io').listen(server)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chatter', (message) => {
	var str = message;
	var n = str.indexOf(":");  
	var userName = str.substring(0,n);
	userName = userName.trim();
		
	var cleanUserNameForSql = sqlString.escape(userName);
	
	var userMessage = str.substring(n + 1,str.length);
	userMessage = userMessage.trim();
	var cleanUserMessageForSql = sqlString.escape(userMessage);
	
	var findAt = userMessage.indexOf("@");  
	var findFirstSpace = userMessage.indexOf(" ");  
	
	//process as private message
	if(findAt ===  0){
		//private message
		var toUserName = userMessage.substring(findAt + 1,findFirstSpace);	
		let cleantoUserNameForSql = sqlString.escape(toUserName);
		console.log("To User : " + toUserName);
		console.log("From User : " + userName);
		
		var cleanPrivateUserMessageForSql = sqlString.escape(userMessage.substring(findFirstSpace + 1,userMessage.length));	
		
		//add private messages to database
		var insertRecords = "INSERT INTO messages (from_username,to_username,message) VALUES("+ cleanUserNameForSql + "," +  cleantoUserNameForSql +  "," + cleanPrivateUserMessageForSql + ");";	
		console.log(insertRecords);
		/*
		con.query(insertRecords, function (err, result) {
			if (err) {
				//handle error
				throw err;
			}else{
				console.log("Message added to db");	
			}
		});
		*/
		
		io.emit('chatter', "Private~" +  toUserName + "^" + message);
	}else{
		//public message
		console.log('chatter : ', message);
		io.emit('chatter', message);	
	}
  })
})
