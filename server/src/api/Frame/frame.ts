import { Request, Response } from "express";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { tableNoColIndex, startTimeColIndex, playerNamesStartColIndex, sheetName } from "../../constants/framesheetconstant";
const googleSheet = require("../../helpers/google-sheet");
//const API_KEY = 'AIzaSyCfxg14LyZ1hrs18WHUuGOnSaJ_IJEtDQc';
//const SHEET_ID = '1Bcl1EVN-7mXUP7M1FL9TBB5v4O4AFxGTVB6PwqOn9ss';
//const SHEET_NAME = 'Frames';

async function updateFrameData(req: Request, res: Response) {
  try {
    // Parse the request body for JSON data
    const payload = req.body;

    // Authenticate and load the Google Sheets document by ID
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useApiKey(API_KEY);
    await doc.loadInfo();

    // Get the desired worksheet (Frames)
    const sheet = doc.sheetsByTitle[SHEET_NAME];

    // Extract data from the payload
    const frameId = payload.frameId;
    const tableNo = payload.tableNo;
    const startTime = payload.startTime;
    const players = payload.players.split(',').map((player: string) => player.trim()); // Trim player names
    
    // Calculate the row number from the frameId
    // Assuming frameId format is "SPS<number>"
    const rowNumber = parseInt(frameId.replace('SPS', '')) + 1; // Adding 1 because Google Sheets rows start from 1

    // Update the sheet with the provided data
    await sheet.loadCells(`H${rowNumber}:R${rowNumber}`); // Load the relevant cells
    sheet.getCell(rowNumber - 1, 7).value = tableNo; // Column H for tableNo
    sheet.getCell(rowNumber - 1, 10).value = startTime; // Column K for startTime

    // Update player names in columns M to R
    for (let i = 0; i < players.length; i++) {
      sheet.getCell(rowNumber - 1, 11 + i).value = players[i];
    }

    // Save the changes to the Google Sheets document
    await sheet.saveUpdatedCells();

    // Return a success response
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating frame:", error);
    res.status(500).json({ success: false, error: "Failed to update frame" });
  }
}

export { updateFrameData };
