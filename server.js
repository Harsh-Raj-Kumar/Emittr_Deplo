const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const performanceRoutes = require("./routes/performanceRoutes");
const cors = require("cors");
const path = require('path');

dotenv.config(); // .env configuration

connectDb();
// function for database
const app = express();

app.use(express.json());

app.use(cors()); // cors
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.get("/", (req, res) => {
//   res.status(200).send("App is running successfully!");
// }); // running app

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/performance", performanceRoutes);

const port = process.env.PORT || 5000;
// port number

app.use(express.static(path.join(__dirname, './frontend/build')));
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  // listen function
  console.log(
    `Server is running on http://localhost:${port}`.cyan.bgWhite.bold
  );
});
