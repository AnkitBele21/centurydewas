import { Request, Response } from "express";

const RAZOR_PAY_KEY = process.env.RAZOR_PAY_KEY ?? 'rzp_test_CyDcbMd3pugIFR';

export const getPaymentOptions = async (req: Request, res: Response) => {
    // Trying not to expose payment api key
    const amount = parseInt(req.body.amount);

    res.json({
        "key": RAZOR_PAY_KEY,
        "amount": amount * 100, // Convert to smallest currency unit
        "currency": "INR",
        "name": "Snooker Plus",
        "description": "Clear Player Dues",
    })
}