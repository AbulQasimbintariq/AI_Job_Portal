const express = require("express");

const upload = require("../middleware/upload.middleware");
const {
    uploadResume,
} = require("../controllers/resume.controller");

const router = express.Router();

router.post(
    "/upload",
    upload.single("resume"),
    uploadResume
);

module.exports = router;