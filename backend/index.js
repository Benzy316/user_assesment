//importing neccessary modules
const express = require("express");
const dotenv = require("dotenv");
const { router } = require("./routes/users");
const cors = require("cors");

//creating module variable for easy of use
const app = express();
const port = process.env.PORT || 3000;

//to remove the CORS error
app.use(cors());

//setting templates
app.set("view engine");
dotenv.config();

app.get("/", (req, res) => {
  const person = {
    fullName: "Benard",
    email: "Otokpabenard@gmail.com",
    address: "44 Bajulaiye Road Shomolu Lagos",
  };
  res.render("index", { person });
});
app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
