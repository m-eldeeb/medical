require("dotenv").config();
const express = require("express");
const connect = require("./DB/connect");
const app = express();
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const {
  adminRouter,
  clientRouter,
  authRouter,
} = require("./modules/index.router");
const port = process.env.PORT;

const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
//session
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "mySessions",
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    expires: oneHourFromNow,
    store,
  })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// view engine
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// routes
app.use(adminRouter, clientRouter, authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

connect();
