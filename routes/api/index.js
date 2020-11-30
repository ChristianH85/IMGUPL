const router = require("express").Router();
const picRoutes = require("./pics");

router.use("/pics", picRoutes);

module.exports = router;
