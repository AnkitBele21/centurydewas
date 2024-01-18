import dotenv from "dotenv";
const bodyParser = require('body-parser');
import express, { Express, Request, Response } from "express";

/**
 * Routes related imports
 */
import { loginRoute } from "./api/Login/login";
import { getPaymentOptions, recordPayment } from "./api/Payment/payment";

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Simple Server");
});

app.post("/login", (req: Request, res: Response) => {
  loginRoute(req, res)
});

app.post("/payment/options/", (req: Request, res: Response) => {
  getPaymentOptions(req, res)
})

app.post("/payment/update/record/", (req: Request, res: Response) => {
  recordPayment(req, res)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});