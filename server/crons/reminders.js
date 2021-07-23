// https://www.npmjs.com/package/cron

const db = require("../models");
const User = db.User;

var CronJob = require("cron").CronJob;

const reminder = () => {
  //   reminder function here
  job.stop();
};

// Every one minute
var job = new CronJob(
  "* * * * * *",
  reminder,
  null,
  true,
  "America/Costa_Rica"
);

// job.start();

// Let it execute only once for testing purposes
// setTimeout(() => {
//   job.stop();
// }, 1000);
