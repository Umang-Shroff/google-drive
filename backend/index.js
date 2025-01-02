const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes")
const cookieParser = require('cookie-parser')
const connectToDb = require('./config/db')
connectToDb();

const app = express();
require("dotenv").config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

app.use("/",indexRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
