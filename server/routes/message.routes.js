const controller = require("../controllers").message;

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/message/all-user-messages", controller.getAllUserMessages);

  app.post("/api/message/start-conversation", controller.startConversation);

  app.post("/api/message/send-message", controller.sendMessage);

  app.get("/api/message/user-new-messages", controller.getUserNewMessages);

  app.put("/api/message/set-messages-seen", controller.setMessagesSeen);
};
