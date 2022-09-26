import express from "express";
import router from "./config/router";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

export default app;