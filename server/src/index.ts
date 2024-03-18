import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { loginRoute } from "./api/Login/login";
import { getPaymentOptions, recordPayment } from "./api/Payment/payment";

// Import function for updating frame data
import { updateFrameData } from "./api/Frame/updateFrameData";

dotenv.config();

const app: Express = express();

// Middleware for parsing request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
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

// New route for updating frame data
app.post("/update_frame", async (req: Request, res: Response) => {
  try {
    // Call the function to update frame data
    await updateFrameData(req, res);
  } catch (error) {
    console.error("Error updating frame:", error);
    res.status(500).json({ success: false, error: "Failed to update frame" });
  }
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
