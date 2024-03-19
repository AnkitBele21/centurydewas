// Constants for the Frames sheet
export const sheetName = "frames";

export const tableNoColIndex = 7; // Column H
export const startTimeColIndex = 10; // Column K
export const playerNamesStartColIndex = 13; // Column M

// Function to calculate the row number from the frameId
export function calculateRowNumber(frameId: string): number {
    // Assuming frameId format is "SPS<number>"
    return parseInt(frameId.replace('SPS', '')) + 1; // Adding 1 because Google Sheets rows start from 1
}
