import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "../config/connectDB"
require('dotenv').config();
import cors from 'cors'

let app = express();
app.use(cors({
  origin: true
}));

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app);
initWebRoutes(app);
//ket noi database voi sequelize
connectDB();

let port = process.env.PORT;
app.listen(port, () => {
  console.log("Backend nodejs is running on the port " + port);
})