const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const midtransClient = require("midtrans-client");
var admin = require("firebase-admin");
var serviceAccount = require("./src/services/zwallet-hanif-firebase-adminsdk-rgop9-939ecfb826.json");

const db = require("./src/helper/db");
const AuthRoute = require("./src/routes/Auth");
const UserRoute = require("./src/routes/User");
const TransactionRoute = require("./src/routes/Transaction");
const TopupRoute = require("./src/routes/Topup");

//firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zwallet-hanif.firebaseio.com",
});
// admin.database.enableLogging(true);
// // buat sebuah reference terhadap node atau data pada database  untuk melakukan testing koneksi
// var db = admin.database();
// var invoicesRef = db.ref("/test");

//cors
app.use(cors()); //WAJIB DI ISI

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//image multer
app.use("/images", express.static("images"));

//socket io
io.on("connection", (socket) => {
  socket.on("initial-data", (idUser) => {
    socket.join(idUser);
    console.log(idUser);
    console.log("idUser socket io");
    db.query(`SELECT balance FROM user WHERE id=${idUser}`, (err, res) => {
      console.log(res[0]);
      io.to(idUser).emit("get-data", res[0].balance);
    });
  });
});

app.get("/", (req, res) => res.send("<h2> Success </h2>"));

app.use("/zwallet/api/v1/auth", AuthRoute);
app.use("/zwallet/api/v1/user", UserRoute);
app.use("/zwallet/api/v1/transaction", TransactionRoute);
app.use("/zwallet/api/v1/topup", TopupRoute);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
