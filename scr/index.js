const express = require('express');
const socket = require("socket.io");
const app = express();

/* app.use(cors({
    origin: '*'
}));
app.use(bodyParser); */
let x = true;

// middlewars
app.use(express.json());
app.use(express.urlencoded({extended : false}));
// routes
app.use(require('./routes/index'));

const server = app.listen(3000, () => {
  console.log("Started in 3000");
});

const io = socket(server);

io.sockets.on("connection", (socket) => {
  console.log(`new connection id: ${socket.id}`);
  sendData(socket);
});

function sendData(socket) {

//pengiriman data ke fornend

  if (x) {
    socket.emit(
    "data",
    Array.from({ length: 13 }, () => Math.floor(Math.random() * 590) + 10) //data dumy
    );
    x = !x;
  } else {
    socket.emit(
    "data",
    Array.from({length: 13}, () => Math.floor(Math.random() * 590) + 10) //data dumy
    );
    x = !x;
  }
  console.log(`data is ${x}`);
  setTimeout(() => {
    sendData(socket);
  }, 3000);
}