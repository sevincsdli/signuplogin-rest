const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/auth");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const dbUrl =
  "mongodb+srv://sevincsdli49:omzMttfRvE6lu0m8@cluster0.nhdi8xq.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoute);
app.get("/", (req, res) => {
  res.send("home");
});

app.listen(port, () => {
  console.log("Server connected on port 3000");
});
