const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const scoresRouter = require("./routes/scores");

const app = express();

const Config = require("./config");

const url = Config.get("REACT_APP_URL") || "http://localhost:8000";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: url,
    credentials: true,
  })
);

// add home endpoint for health checks
app.get("/", (req, res) => {
  res.send("Pac-Man API is online");
});

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/scores", scoresRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  next(err);
});

module.exports = app;
