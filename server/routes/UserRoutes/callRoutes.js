const express = require("express");
const router = express.Router();
const callController = require("../../controller/User/callController");

// Create and creaet chat

router.route("/create-call").post(callController.createCall);

router.route("/update-call").post(callController.updateCall);

router.route("/get-calls").get(callController.getCalls);

router.route("/accept-call").get(callController.acceptCall);

router.route("/decline-call").get(callController.declineCall);

router.route("/clear-call-history").post(callController.clearCallHistory )

module.exports = router;
