const express = require("express");

const busRouter = require("./src/routes/busRoutes");
const userRouter = require("./src/routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

app.use("/", userRouter);
app.use("/", busRouter);

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

module.exports = app;