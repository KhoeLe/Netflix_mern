const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => {
    console.log("DB CONNECTION URL", process.env.MONGO_URL)
    console.log("DB CONNECTION ERR", err)
  });

app.use("/api/auth", authRouter);
app.use("/" ,(req, res)=>{
  return res.status(200).json("Hello World")
})

app.listen(process.env.PORT, () => {
  console.log("BE server running ");
});
 
  
