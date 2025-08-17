const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Middlewares

app.use(cors());
app.use(express.json());

//Routes
const routerSearch = require("./routes/searchRoutes");
const routerGeneral = require("./routes/generalRoutes");
app.use("/search", routerSearch);
app.use("/", routerGeneral );

// app.get("/", (req, res) => {
//   res.send("StreamMap is working");
// });

module.exports = app;
