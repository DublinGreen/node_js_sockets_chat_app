Simple Chat
---
Simple Chat Application built with Node.js + socket.io. Written by DublinGreen

basic chat with sockets but can send private message that are stored in the mysql database.
Used a template engine (pug), contains basic css but using bootstrap and jquery CDN

-------------------------------------------------------
The database sql is in the app root dir, its called node_chat_app.sql. You need to create a new mysql database and import the sql file

only private messages are stored
to send a private message @<username> "message" e.g @dublin how are you doing

---------------------------------------
mysql details parameters
  host: 'localhost',
  user: 'root',
  password: '',
  database: "node_chat_app"

dependencies: {
	"cookie-parser": "^1.4.4",
	"express": "^4.15.4",
	"mysql": "^2.16.0",
	"pug": "^2.0.3",
	"socket.io": "^2.0.3",
	"socket.io-cookie": "0.0.1",
	"sqlstring": "^2.3.1"
}
-------------------
node js entry script app.js

to run, open the command line interface and navigate into the project directory . Run the node command < node ./app.js >. The port is  5555
Visit on your browser http://127.0.0.1:5555/ or better http://localhost:5555/ to be safe. For those that change their default local IP. Una well done oh.

The default username for a chatting is tizeti. You can change it but i suggest small letters only. its easier for every body that way.

We good?
email me for any issues or enquires about the project : greendublin007@gmail.com
-----------------
@author Idisimagha Bernard Dublin-Green \n
@version 1.1 \n
@Description Interview project for tizeti \n
@email greendublin007@gmail.com \n
