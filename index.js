const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

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

  app.get("/", (req, res, next) => {
    throw new Error("Something went wrong!");
    res.send("Welcome to main route!");
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });


  
// routes middleware
// readdirSync("./routes").map((r) => app.use("/api/auth" ,authRouter, require("./routes/" + r)));




app.listen(process.env.PORT, () => {
  console.log("BE server running ");
}); 
   
     
    