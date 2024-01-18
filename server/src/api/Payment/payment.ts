import { Request, Response } from "express";
import { getUserIndex } from "../../helpers/user";
import { razorPayPaidColIndex, razorPayPaidColName, sheetName } from "../../constants/sheetConstants";
const googleSheet = require("../../helpers/google-sheet");

const RAZOR_PAY_KEY = process.env.RAZOR_PAY_KEY ?? 'rzp_test_CyDcbMd3pugIFR';

export const getPaymentOptions = async (req: Request, res: Response) => {
    // Trying not to expose payment api key
    const amount = parseFloat(req.body.amount);

    res.json({
        "key": RAZOR_PAY_KEY,
        "amount": Math.round(amount), // Convert to smallest currency unit
        "currency": "INR",
        "name": "Snooker Plus",
        "description": "Clear Player Dues",
    })
}

export const recordPayment = async (req: Request, res: Response) => {
    const { user_id, amount_paid } = req.body;
    const userData = await getUserIndex({username: user_id})
    const razorPayAlreadyPaid = parseInt(userData.user[razorPayPaidColIndex - 1]) || 0;
    const amountPaid = razorPayAlreadyPaid + amount_paid;
    try {
        const resp = await googleSheet.update(
            `${sheetName}!${razorPayPaidColName}${userData.idx}`,
            [[amountPaid]]
        )
    
        console.log(amountPaid,resp)

    } catch (err) {
        console.log(err)
    }
    res.json({result: "Good"})
}