import dotenv from "dotenv";
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
import express, { Express, Request, Response } from "express";

const target = 'http://35.207.223.133';


const proxyMiddleware = createProxyMiddleware({
  target,
  changeOrigin: true, // changes the origin of the host header to the target URL
  secure: false,      // if the target server doesn't support HTTPS
});


/**
 * Routes related imports
 */
import { loginRoute } from "./api/Login/login";
import { getPaymentOptions, recordPayment } from "./api/Payment/payment";

dotenv.config();

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Disable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Use the proxy middleware for all routes
app.use('/login', proxyMiddleware);
app.use('/payment/options', proxyMiddleware);
app.use('/record_payment', proxyMiddleware);


const port = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Simple Server");
});

app.post("/login", (req: Request, res: Response) => {
  loginRoute(req, res)
});

app.post("/record_payment/", (req: Request, res: Response) => {
  recordPayment(req, res)
})

app.post("/payment/options/", (req: Request, res: Response) => {
  getPaymentOptions(req, res)
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});