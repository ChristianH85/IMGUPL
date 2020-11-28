const router = require("express").Router();
const picRoutes = require("./pics");

// Book routes
router.use("/pics", picRoutes);

module.exports = router;
