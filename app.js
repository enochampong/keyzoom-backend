require("dotenv/config");
require("./db");
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");


const app = express();
require("./config")(app);


const allRoutes = require("./routes");
app.use("/api", allRoutes);

const storeRouter = require("./routes/store.routes");
app.use("/api", isAuthenticated, storeRouter);

const requestRouter = require("./routes/request.routes");
app.use("/api", isAuthenticated, requestRouter);



const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);



require("./error-handling")(app);

module.exports = app;
