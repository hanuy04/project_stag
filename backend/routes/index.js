// const formsRouter = require("./forms.route");
// const customersRouter = require("./customers.route");
// const standsRouter = require("./stands.route");
// const transactionsRouter = require("./transactions.route");
const reservationsRouter = require("./reservations.route");
const express = require("express");

const router = express();

// router.use("/forms", formsRouter);
router.use("/reservations", reservationsRouter);
// router.use("/customers", customersRouter);
// router.use("/stands", standsRouter);
// router.use("/transactions", transactionsRouter);

module.exports = router;
