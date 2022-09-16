const express = require("express");
const math = require("./operations");
const ExpressError = require("./newError");

const app = express();
//shows the home page gives links to empty operations
//witch causes an error to be thrown that tells the user how to use the operations
app.get("/", (req, res) => {
  res.send(
    '<p>Here are the math operations you can do with this "website"</p> <br> <a href="/mean">Mean</a> <br> <a href="/median">Median</a> <br> <a href="/mode">Mode</a> <br> <a href="/all">All</a>'
  );
});


//gets the mean of the numbers passed in
app.get("/mean", (req, res, next) => {
  let nums;
  try {
    nums = math.getNums(req.query.nums, "mean");
  } catch (e) {
    return next(e);
  }
  const val = math.mean(nums);
  res.json({ response: { operation: "mean", value: val } });
});

//gets the median of the numbers passed in
app.get("/median", (req, res, next) => {
  let nums;
  try {
    nums = math.getNums(req.query.nums, "median");
  } catch (e) {
    return next(e);
  }
  const val = math.median(nums);
  res.json({ response: { operation: "median", value: val } });
});

//gets the mode of the numbers passed in
app.get("/mode", (req, res, next) => {
  let nums;

  try {
    nums = math.getNums(req.query.nums, "mode");
  } catch (e) {
    return next(e);
  }

  const val = math.mode(nums);
  res.json({ response: { operation: "mode", value: val } });
});


//gets the mean, median, and mode of the numbers passed in
app.get("/all", (req, res, next) => {
  let nums;
  try {
    nums = math.getNums(req.query.nums, "all");
  } catch (e) {
    return next(e);
  }

  const mean = math.mean(nums);
  const median = math.median(nums);
  const mode = math.mode(nums);
  res.json({ response: { operation: "all", mean, median, mode } });
});

//shows 404 page
app.use((req, res, next) => {
  e = new ExpressError("page not found", 404);
  next(e);
});

///shows error page
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send(err.msg);
  }
  res.send(`Something went wrong! \n ${err}`);
});


//starts surver
app.listen(3000, () => {
  console.log("Server started at, http://127.0.0.1:3000");
});
