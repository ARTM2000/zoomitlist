const mongoose = require("mongoose");

const constants = require("./utils/constants");
const dataFetch = require("./controllers/dataFetch");

mongoose.connect(
  constants.db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // reconnectTries: 3000,
  },
  () => {
    //getting information from https://zoomit.ir/ from page 1-1000
    const time = 10800000; // for 3 hours
    setInterval(dataFetch.loopThroughSite, time);
    dataFetch.loopThroughSite();
    // dataFetch.updateBUPost();
    //gathering information finished
  }
);
