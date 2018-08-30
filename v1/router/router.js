const express = require("express");
const controller = require("../controller/controller.js");
const router = express.Router();

router.get("/:id", controller.getStudent);
router.post("/create", controller.createStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;
