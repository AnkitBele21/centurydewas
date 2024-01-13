import { Request, Response } from "express";
import { LoginBodyType } from "./loginTypes";
import {playerCredentialsRange } from "../../constants/sheetConstants";
import { areKeysEmpty } from "../../helpers/utils";
const googleSheet = require('../../helpers/google-sheet');

/**
 * Handles the login route.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Promise<void>} - sends the login server response
 */
export const loginRoute = async (req: Request, res: Response) => {
    const data: LoginBodyType = req.body;
    if (areKeysEmpty(data, ["username", "password"])) {
        res.status(400).json('Username or password, cannot be empty');
    }

    const response = await googleSheet.read(playerCredentialsRange);

    const usernameList = response.map((row: any) => row[0]);
    const passwordList = response.map((row: any) => row[1]);

    const userIdx = usernameList.indexOf(data.username);
    if (userIdx === -1) {
        res.status(401).json('Invalid Credentials');
    }

    if (data.password !== passwordList[userIdx]) {
        res.status(401).json('Invalid Credentials');
    }

    res.send("Login Server");
}   