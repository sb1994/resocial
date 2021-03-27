const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { notFound, errorHandler } = require("./middleware/error");
const cors = require("cors");
require("dotenv").config();

// database conntection
const db = process.env.DB_CONNECT;
mongoose.connect(
  db,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongo Db Connected");
  }
);

const app = express();
app.use(express.json());
// setting the cross origin
app.use(cors());

//setup the middleware

app.use(bodyParser.urlencoded({ extended: false }));

const users = require("./api/routes/users");
const posts = require("./api/routes/posts");

// attaching the api routes to the app instance
app.use("/api/users", users);
app.use("/api/posts", posts);

// ataching the error middleware to the app instance
app.use(errorHandler);
app.use(notFound);

// setting the landing routes for the server in deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const User = require("./api/models/User");
// users object for thos currently connected
let connectedUser = {};
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload._id;
    connectedUser[socket.userId] = await User.findById(socket.userId);
    next();
  } catch (err) {}
});
io.on("connection", (socket) => {
  console.log(`Socket Numbers: ${io.engine.clientsCount}`);
  io.emit("connectedUsers", { connectedUsers: Object.values(connectedUser) });
  socket.on("disconnect", () => {
    delete connectedUser[socket.userId];

    io.emit("broadcast", { connectedUsers: Object.values(connectedUser) });
    console.log(`Socket Numbers: ${io.engine.clientsCount}`);
    console.log("Disconnected: " + socket.userId);
  });
});
